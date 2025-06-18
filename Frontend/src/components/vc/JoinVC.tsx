import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Video, Users, AlertCircle } from 'lucide-react';
import { useVC } from '../contexts/VCContext';
import { useToast } from '../../hooks/use-toast';

interface JoinVCProps {
  onJoinSuccess: () => void;
}

const JoinVC: React.FC<JoinVCProps> = ({ onJoinSuccess }) => {
  const [roomId, setRoomId] = useState('');
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const { state, joinRoom } = useVC();
  const { toast } = useToast();

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    let roomInfo = await fetch('https://localhost:5000/roomFormation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!roomId.trim() || !token.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both Room ID and Token",
        variant: "destructive",
      });
      return;
    }

    try {
      await joinRoom(roomId.trim(), token.trim(), userName.trim() || undefined);
      toast({
        title: "Successfully Joined",
        description: "You have joined the video session",
      });
      onJoinSuccess();
    } catch (error) {
      console.error('Failed to join room:', error);
      toast({
        title: "Failed to Join",
        description: state.error || "Unable to join the video session. Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1e293b] border-gray-700">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-teal-400/20 rounded-full flex items-center justify-center mb-4">
            <Video className="h-8 w-8 text-teal-400" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">
            Join Video Session
          </CardTitle>
          <p className="text-gray-400 text-sm mt-2">
            Enter your session details to join the video call
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleJoinRoom} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-gray-300">
                Your Name
              </Label>
              <Input
                id="userName"
                type="text"
                placeholder="Enter your name (optional)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-[#283548] border-gray-600 text-gray-100 placeholder-gray-400 focus:border-teal-400"
                disabled={state.isJoining}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomId" className="text-gray-300">
                Room ID
              </Label>
              <Input
                id="roomId"
                type="text"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="bg-[#283548] border-gray-600 text-gray-100 placeholder-gray-400 focus:border-teal-400"
                disabled={state.isJoining}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="token" className="text-gray-300">
                Access Token
              </Label>
              <Input
                id="token"
                type="password"
                placeholder="Enter access token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-[#283548] border-gray-600 text-gray-100 placeholder-gray-400 focus:border-teal-400"
                disabled={state.isJoining}
                required
              />
            </div>

            {state.error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{state.error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-teal-400 hover:bg-teal-500 text-gray-900 font-medium py-2 mt-6"
              disabled={state.isJoining}
            >
              {state.isJoining ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  Joining...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Join Session
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-[#283548] rounded-lg border border-gray-700">
            <h4 className="text-sm font-medium text-teal-400 mb-2">Session Information</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Make sure your camera and microphone are enabled</li>
              <li>• Use the room ID provided by your host</li>
              <li>• Keep your access token secure and private</li>
              <li>• Your name will be visible to other participants</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinVC;