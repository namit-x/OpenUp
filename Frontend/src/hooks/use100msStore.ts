import {
  useHMSStore,
  selectIsConnectedToRoom,
  selectLocalPeer,
  selectPeers,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectLocalMediaSettings,
  selectRoomState,
  selectPermissions,
  selectDominantSpeaker,
  selectScreenShareByPeerID,
  selectVideoTrackByID,
  selectAudioTrackByID,
  selectLocalVideoTrackID,
  selectLocalAudioTrackID,
  HMSPeer,
  selectTrackByID,
  HMSTrack,
} from '@100mslive/react-sdk';
import { useMemo } from 'react';

export const use100msStore = () => {
  // Connection state
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const roomState = useHMSStore(selectRoomState);

  // Local peer and permissions
  const localPeer = useHMSStore(selectLocalPeer);
  const permissions = useHMSStore(selectPermissions);

  // All peers in the room
  const peers = useHMSStore(selectPeers);

  // Local media state
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const localMediaSettings = useHMSStore(selectLocalMediaSettings);

  // Local track IDs
  const localVideoTrackID = useHMSStore(selectLocalVideoTrackID);
  const localAudioTrackID = useHMSStore(selectLocalAudioTrackID);

  // Local tracks
  const localVideoTrack: any = useHMSStore(selectTrackByID(localVideoTrackID));
  const localAudioTrack = useHMSStore(selectAudioTrackByID(localAudioTrackID));

  // Dominant speaker
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);

  // Memoized utility functions
  const getScreenShareByPeer = useMemo(() => 
    (peerId: string) => useHMSStore(selectScreenShareByPeerID(peerId)),
    []
  );

  const getVideoTrack = (peer: HMSPeer) => {
    const videoTrack = peer.videoTrack ? useHMSStore(selectVideoTrackByID(peer.videoTrack)) : null;
    return videoTrack?.enabled ? videoTrack : null;
  };
  
  const getAudioTrack = (peer: HMSPeer) => {
    const audioTrack = peer.audioTrack ? useHMSStore(selectAudioTrackByID(peer.audioTrack)) : null;
    return audioTrack?.enabled ? audioTrack : null;
  };

  const isTrackEnabled = (track?: HMSTrack) => 
    track?.enabled ?? false;

  return {
    // Connection
    isConnected,
    roomState,

    // Peers
    localPeer,
    peers,
    permissions,

    // Media state
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    localMediaSettings,

    // Tracks
    localVideoTrack,
    localAudioTrack,
    localVideoTrackID,
    localAudioTrackID,

    // Speaker
    dominantSpeaker,

    // Utilities
    getScreenShareByPeer,
    getVideoTrack,
    getAudioTrack,
    isTrackEnabled,
  };
};

export default use100msStore;