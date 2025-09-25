import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect, useMemo } from 'react';
import {
  useHMSActions,
  useHMSStore,
  HMSRoomState,
  selectRoomState,
  selectLocalPeer,
  selectPeers,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  HMSPeer
} from '@100mslive/react-sdk';
import { jwtDecode } from 'jwt-decode';

interface VCState {
  isConnected: boolean;
  roomId: string | null;
  token: string | null;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  participants: VCParticipant[];
  localStream: MediaStream | null;
  roomState: HMSRoomState;
  isJoining: boolean;
  error: string | null;
}

interface VCParticipant {
  id: string;
  name: string;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  peer?: HMSPeer;
}

interface VCContextType {
  state: VCState;
  setState: React.Dispatch<React.SetStateAction<VCState>>;
  joinRoom: (roomId: string, token: string, userName?: string) => Promise<void>;
  leaveRoom: () => void;
  toggleVideo: () => Promise<void>;
  toggleAudio: () => Promise<void>;
  setParticipants: (participants: VCParticipant[]) => void;
  setToken: (token: string) => void;
}

const initialState: VCState = {
  isConnected: false,
  roomId: null,
  token: null,
  isVideoEnabled: true,
  isAudioEnabled: true,
  participants: [],
  localStream: null,
  roomState: HMSRoomState.Disconnected,
  isJoining: false,
  error: null,
};

const VCContext = createContext<VCContextType | undefined>(undefined);

export const useVC = () => {
  const context = useContext(VCContext);
  if (!context) {
    throw new Error('useVC must be used within a VCProvider');
  }
  return context;
};

interface VCProviderProps {
  children: ReactNode;
}

export const VCProvider: React.FC<VCProviderProps> = ({ children }) => {
  const hmsActions = useHMSActions();

  // Move loadFromStorage inside the component but before useState
  const loadFromStorage = (): Partial<VCState> | null => {
    const saved = localStorage.getItem('vcData');
    if (!saved) return null;

    try {
      const parsed = JSON.parse(saved);
      if (parsed.expiresAt && parsed.expiresAt <= Date.now()) {
        localStorage.removeItem('vcData');
        return null;
      }

      // Extract roomId from token if available
      if (parsed.token) {
        try {
          const decoded: any = jwtDecode(parsed.token);
          return {
            ...parsed,
            roomId: decoded.room_id || parsed.roomId || null
          };
        } catch (e) {
          console.error('Failed to decode token', e);
          return parsed;
        }
      }

      return parsed;
    } catch (e) {
      console.error('Failed to parse saved data', e);
      return null;
    }
  };

  // Initialize state with saved values first
  const [state, setState] = useState<VCState>(() => {
    const saved = loadFromStorage();
    return {
      ...initialState,
      ...saved,
      // Ensure these are always reset to defaults
      isJoining: false,
      error: null,
      // Special handling for roomId
      roomId: saved?.roomId || initialState.roomId
    };
  });

  useEffect(() => {
    if (state.token) {
      try {
        const decoded: any = jwtDecode(state.token);
        setState(prev => ({
          ...prev,
          roomId: decoded.room_id || prev.roomId
        }));
      } catch (e) {
        console.error('Failed to decode token', e);
      }
    }
  }, [state.token]);

  // 100ms selectors
  const roomState = useHMSStore(selectRoomState);
  const localPeer = useHMSStore(selectLocalPeer);
  const peers = useHMSStore(selectPeers);
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);

  // Fixed 100ms update effect - preserves roomId and token
  useEffect(() => {
    setState(prevState => ({
      ...prevState, // Keep existing state
      roomState,
      isConnected: roomState === HMSRoomState.Connected,
      isVideoEnabled: isLocalVideoEnabled ?? prevState.isVideoEnabled,
      isAudioEnabled: isLocalAudioEnabled ?? prevState.isAudioEnabled,
      participants: peers.filter(peer => peer.id !== localPeer?.id).map(peer => ({
        id: peer.id,
        name: peer.name,
        isVideoEnabled: peer.videoTrack?.enabled || false,
        isAudioEnabled: peer.audioTrack?.enabled || false,
        peer,
      })),
    }));
  }, [roomState, localPeer, peers, isLocalAudioEnabled, isLocalVideoEnabled]);

  // Stable setToken that won't recreate on rerenders
  const setToken = useCallback((token: string) => {
    setState(prev => ({
      ...prev,
      token,
      // Clear error when token updates
      error: null
    }));
  }, []);

  const joinRoom = useCallback(async (roomId: string, token: string, userName?: string) => {
    if (!hmsActions) throw new Error('HMS Actions not initialized');
  
    setState(prev => ({
      ...prev,
      isJoining: true,
      error: null,
      roomId,
      token
    }));

    try {
      const config = {
        authToken: token,
        userName: userName || 'Anonymous',
        settings: {
          isAudioMuted: false,
          isVideoMuted: false,
        },
      };

      await hmsActions.join(config);
      console.log('Successfully joined room:', roomId);
    } catch (error) {
      console.error('Failed to join room:', error);
      setState(prevState => ({
        ...prevState,
        error: error instanceof Error ? error.message : 'Failed to join room',
        isJoining: false,
      }));
      throw error;
    } finally {
      setState(prevState => ({
        ...prevState,
        isJoining: false,
      }));
    }
  }, [hmsActions]);

  const leaveRoom = useCallback(async () => {
    if (!hmsActions) return;

    try {
      await hmsActions.leave();
      setState(initialState);
      console.log('Left room successfully');
    } catch (error) {
      console.error('Failed to leave room:', error);
      // Reset state anyway
      setState(initialState);
    }
  }, [hmsActions]);

  const toggleVideo = useCallback(async () => {
    if (!hmsActions) return;

    try {
      await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
    } catch (error) {
      console.error('Failed to toggle video:', error);
      throw error;
    }
  }, [hmsActions, isLocalVideoEnabled]);

  const toggleAudio = useCallback(async () => {
    if (!hmsActions) return;

    try {
      await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
    } catch (error) {
      console.error('Failed to toggle audio:', error);
      throw error;
    }
  }, [hmsActions, isLocalAudioEnabled]);

  const setParticipants = useCallback((participants: VCParticipant[]) => {
    setState(prevState => ({
      ...prevState,
      participants,
    }));
  }, []);

  const contextValue = useMemo(() => ({
    state,
    setState,
    joinRoom,
    leaveRoom,
    toggleVideo,
    toggleAudio,
    setParticipants,
    setToken,
  }), [state, joinRoom, leaveRoom, toggleVideo, toggleAudio, setParticipants, setToken]);

  return (
    <VCContext.Provider value={contextValue}>
      {children}
    </VCContext.Provider>
  );
};