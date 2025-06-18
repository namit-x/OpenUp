import {
  HMSActions,
  selectLocalPeer,
  useHMSStore
} from '@100mslive/react-sdk';

export class VCService {
  private hmsActions: HMSActions;

  constructor(hmsActions: HMSActions) {
    this.hmsActions = hmsActions;
  }

  // Join room with token
  async joinRoom(token: string, settings?: {
    userName?: string;
    audioMuted?: boolean;
    videoMuted?: boolean;
  }) {
    try {
      console.log('Joining room with token:', token);

      const config = {
        authToken: token,
        userName: settings?.userName || 'Anonymous',
        settings: {
          isAudioMuted: settings?.audioMuted || false,
          isVideoMuted: settings?.videoMuted || false,
        },
      };

      await this.hmsActions.join(config);
      console.log('Join request sent');
    } catch (error) {
      console.error('Failed to join room:', error);
      throw error;
    }
  }

  // Leave room
  async leaveRoom() {
    try {
      console.log('Leaving room...');
      await this.hmsActions.leave();
    } catch (error) {
      console.error('Failed to leave room:', error);
      throw error;
    }
  }

  // Toggle local audio
  async toggleAudio(enabled?: boolean) {
    try {
      if (enabled !== undefined) {
        await this.hmsActions.setLocalAudioEnabled(enabled);
      } else {
        // Getting current state from store
        const localPeer = useHMSStore(selectLocalPeer);
        const currentState = localPeer?.audioTrack?.enabled ?? false;
        await this.hmsActions.setLocalAudioEnabled(!currentState);
      }
      console.log('Audio toggled');
    } catch (error) {
      console.error('Failed to toggle audio:', error);
      throw error;
    }
  }

  // Toggle local video
  async toggleVideo(enabled?: boolean) {
    try {
      if (enabled !== undefined) {
        await this.hmsActions.setLocalVideoEnabled(enabled);
      } else {
        // Getting current state from store
        const localPeer = useHMSStore(selectLocalPeer);
        const currentState = localPeer?.videoTrack?.enabled ?? false;
        await this.hmsActions.setLocalVideoEnabled(!currentState);
      }
      console.log('Video toggled');
    } catch (error) {
      console.error('Failed to toggle video:', error);
      throw error;
    }
  }

  // Start screen share
  async startScreenShare() {
    try {
      await this.hmsActions.setScreenShareEnabled(true);
      console.log('Screen share started');
    } catch (error) {
      console.error('Failed to start screen share:', error);
      throw error;
    }
  }

  // Stop screen share
  async stopScreenShare() {
    try {
      await this.hmsActions.setScreenShareEnabled(false);
      console.log('Screen share stopped');
    } catch (error) {
      console.error('Failed to stop screen share:', error);
      throw error;
    }
  }

  // Send chat message
  async sendMessage(message: string) {
    try {
      await this.hmsActions.sendBroadcastMessage(message);
      console.log('Message sent:', message);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  // Change user name
  async changeName(name: string) {
    try {
      await this.hmsActions.changeName(name);
      console.log('Name changed to:', name);
    } catch (error) {
      console.error('Failed to change name:', error);
      throw error;
    }
  }
}

export default VCService;