import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/Button';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  Users,
  Settings,
  AlertCircle
} from 'lucide-react';
import { useVC } from '../contexts/VCContext';
import { useToast } from '../../hooks/use-toast';
import { use100msStore } from '../../hooks/use100msStore';
import { useHMSActions } from '@100mslive/react-sdk';

interface RoomVCProps {
  onLeaveRoom: () => void;
}

const RoomVC: React.FC<RoomVCProps> = ({ onLeaveRoom }) => {
  const { state, leaveRoom, toggleVideo, toggleAudio } = useVC();
  const { toast } = useToast();
  const hmsActions = useHMSActions();
  const {
    localPeer,
    peers,
    localVideoTrack,
    localVideoTrackID,
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    getVideoTrack,
    isTrackEnabled
  } = use100msStore();

  const handleLeaveRoom = async () => {
    try {
      await leaveRoom();
      toast({
        title: "Session Ended",
        description: "You have left the video session",
      });
      onLeaveRoom();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to leave session properly",
        variant: "destructive",
      });
      onLeaveRoom(); // Still navigate away
    }
  };

  const handleToggleVideo = async () => {
    try {
      await toggleVideo();
      toast({
        title: isLocalVideoEnabled ? "Camera Off" : "Camera On",
        description: isLocalVideoEnabled ? "Your camera has been turned off" : "Your camera has been turned on",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle camera",
        variant: "destructive",
      });
    }
  };

  const handleToggleAudio = async () => {
    try {
      await toggleAudio();
      toast({
        title: isLocalAudioEnabled ? "Microphone Off" : "Microphone On",
        description: isLocalAudioEnabled ? "Your microphone has been muted" : "Your microphone has been unmuted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle microphone",
        variant: "destructive",
      });
    }
  };

  if (!state.isConnected) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-100 mb-2">Connecting...</h2>
          <p className="text-gray-400">Please wait while we connect you to the session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827] p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-400/20 rounded-full flex items-center justify-center">
            <Video className="h-5 w-5 text-teal-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-100">
              Video Session
            </h1>
            <p className="text-sm text-gray-400">
              Room: {state.roomId || 'Connected'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#1e293b] px-3 py-2 rounded-lg border border-gray-700">
            <Users className="h-4 w-4 text-teal-400" />
            <span className="text-sm text-gray-300">
              {peers.length + 1} participants
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-[#283548]"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Local Video */}
        <Card className="bg-[#1e293b] border-gray-700 relative overflow-hidden">
          <CardContent className="p-0 aspect-video">
            {isLocalVideoEnabled && localVideoTrack ? (
              <video
                ref={(videoEl) => {
                  if (videoEl && localVideoTrack) {
                    hmsActions.attachVideo(localVideoTrack, videoEl);
                  }
                }}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#283548] flex items-center justify-center">
                <div className="text-center">
                  <VideoOff className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400">Camera Off</p>
                </div>
              </div>
            )}

            {/* Local Video Overlay */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
              <p className="text-white text-sm font-medium">
                {localPeer?.name || 'You'} (Local)
              </p>
            </div>

            {/* Audio Status */}
            <div className="absolute top-4 right-4">
              {!isLocalAudioEnabled && (
                <div className="bg-red-500 p-2 rounded-full">
                  <MicOff className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Remote Participants */}
        {peers.length > 0 ? (
          peers.slice(0, 3).map((peer) => {
            const videoTrack = getVideoTrack(peer) || undefined;
            const hasVideo = isTrackEnabled(videoTrack);

            return (
              <Card key={peer.id} className="bg-[#1e293b] border-gray-700 relative overflow-hidden">
                <CardContent className="p-0 aspect-video">
                  {hasVideo && videoTrack ? (
                    <video
                      ref={(videoEl) => {
                        if (videoEl && videoTrack) {
                          hmsActions.attachVideo(videoTrack, videoEl);
                        }
                      }}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#283548] flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-teal-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-teal-400 font-bold text-xl">
                            {peer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-300 font-medium">{peer.name}</p>
                      </div>
                    </div>
                  )}

                  {/* Participant Overlay */}
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <p className="text-white text-sm font-medium">{peer.name}</p>
                  </div>

                  {/* Audio/Video Status */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {!hasVideo && (
                      <div className="bg-gray-600 p-1 rounded">
                        <VideoOff className="h-3 w-3 text-white" />
                      </div>
                    )}
                    {!isTrackEnabled(peer.audioTrack) && (
                      <div className="bg-red-500 p-1 rounded">
                        <MicOff className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="bg-[#1e293b] border-gray-700">
            <CardContent className="p-0 aspect-video flex items-center justify-center">
              <div className="text-center">
                <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Waiting for other participants...</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Additional participants indicator */}
      {peers.length > 3 && (
        <div className="text-center mb-6">
          <p className="text-gray-400">
            +{peers.length - 3} more participant{peers.length - 3 !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <Card className="bg-[#1e293b] border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleToggleAudio}
                className={`w-12 h-12 rounded-full ${isLocalAudioEnabled
                    ? 'bg-[#283548] hover:bg-[#334155] text-gray-300'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
              >
                {isLocalAudioEnabled ? (
                  <Mic className="h-5 w-5" />
                ) : (
                  <MicOff className="h-5 w-5" />
                )}
              </Button>

              <Button
                onClick={handleToggleVideo}
                className={`w-12 h-12 rounded-full ${isLocalVideoEnabled
                    ? 'bg-[#283548] hover:bg-[#334155] text-gray-300'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
              >
                {isLocalVideoEnabled ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <VideoOff className="h-5 w-5" />
                )}
              </Button>

              <Button
                onClick={handleLeaveRoom}
                className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white"
              >
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoomVC;