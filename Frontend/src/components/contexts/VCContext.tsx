import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
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
  const [state, setState] = useState<VCState>(initialState);

  const hmsActions = useHMSActions();

  // 100ms selectors
  const roomState = useHMSStore(selectRoomState);
  const localPeer = useHMSStore(selectLocalPeer);
  const peers = useHMSStore(selectPeers);
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);

  // Update state based on 100ms store changes
  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      roomState,
      isConnected: roomState === HMSRoomState.Connected,
      isVideoEnabled: isLocalVideoEnabled,
      isAudioEnabled: isLocalAudioEnabled,
      participants: peers.filter(peer => peer.id !== localPeer?.id).map(peer => ({
        id: peer.id,
        name: peer.name,
        isVideoEnabled: peer.videoTrack?.enabled || false,
        isAudioEnabled: peer.audioTrack?.enabled || false,
        peer,
      })),
    }));
  }, [roomState, localPeer, peers, isLocalAudioEnabled, isLocalVideoEnabled]);

  const setToken = useCallback((token: string) => {
    setState(prev => ({ ...prev, token }));
    console.log("Token uploadded: ", token);
  }, []);

  const joinRoom = useCallback(async (roomId: string, token: string, userName?: string) => {
    if (!hmsActions) {
      throw new Error('HMS Actions not initialized');
    }

    setState(prevState => ({
      ...prevState,
      isJoining: true,
      error: null,
      roomId,
      token,
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

  const contextValue: VCContextType = {
    state,
    joinRoom,
    leaveRoom,
    toggleVideo,
    toggleAudio,
    setParticipants,
    setToken,
  };

  return (
    <VCContext.Provider value={contextValue}>
      {children}
    </VCContext.Provider>
  );
};