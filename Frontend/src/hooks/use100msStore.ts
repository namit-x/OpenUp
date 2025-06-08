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
  HMSTrack
} from '@100mslive/react-sdk';

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
  const localVideoTrack: any = useHMSStore(selectVideoTrackByID(localVideoTrackID));
  const localAudioTrack = useHMSStore(selectAudioTrackByID(localAudioTrackID));

  // Dominant speaker
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);

  // Screen share detection
  const getScreenShareByPeer = (peerId: string) =>
    useHMSStore(selectScreenShareByPeerID(peerId));

  // Helper functions
  const getVideoTrack = (peer: HMSPeer) => {
    const track = useHMSStore(selectVideoTrackByID(peer.videoTrack));
    return track && track.enabled ? track : null;
  };
  
  const getAudioTrack = (peer: HMSPeer) => {
    const track = useHMSStore(selectAudioTrackByID(peer.audioTrack));
    return track && track.enabled ? track : null;
  };

  const isTrackEnabled = (track: any) =>
    track && track.enabled;

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