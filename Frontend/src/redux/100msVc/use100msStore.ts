import { useState, useEffect, useCallback } from 'react';

interface Peer {
  id: string;
  name: string;
  role: string;
}

interface RoomInfo {
  id: string;
  name: string;
  peers: Peer[];
}

interface Use100msStoreReturn {
  roomInfo: RoomInfo | null;
  localUser: Peer | null;
  setRoomInfo: (room: RoomInfo) => void;
  setLocalUser: (user: Peer) => void;
  addPeer: (peer: Peer) => void;
  removePeer: (peerId: string) => void;
  resetStore: () => void;
}

export const use100msStore = (): Use100msStoreReturn => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [localUser, setLocalUser] = useState<Peer | null>(null);

  // Add peer if not already added
  const addPeer = useCallback((peer: Peer) => {
    setRoomInfo((prev) => {
      if (!prev) return prev;
      if (prev.peers.find((p) => p.id === peer.id)) return prev; // already present
      return {
        ...prev,
        peers: [...prev.peers, peer],
      };
    });
  }, []);

  // Remove peer by ID
  const removePeer = useCallback((peerId: string) => {
    setRoomInfo((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        peers: prev.peers.filter((p) => p.id !== peerId),
      };
    });
  }, []);

  // Reset all store (on leave or logout)
  const resetStore = useCallback(() => {
    setRoomInfo(null);
    setLocalUser(null);
  }, []);

  return {
    roomInfo,
    localUser,
    setRoomInfo,
    setLocalUser,
    addPeer,
    removePeer,
    resetStore,
  };
};
