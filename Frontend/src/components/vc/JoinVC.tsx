import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Video, Users, AlertCircle, Eye, EyeOff, Shield, Clock } from 'lucide-react';
import { useVC } from '../contexts/VCContext';
import { useToast } from '../../hooks/use-toast';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

interface JoinVCProps {
  onJoinSuccess: () => void;
}

const JoinVC: React.FC<JoinVCProps> = ({ onJoinSuccess }) => {
  const { state, joinRoom, setToken } = useVC();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    if (!state.token) {console.error("Token is not set"); return;};

    try {
      const decoded: any = jwtDecode(state.token);
      // console.log("Decoded: ", decoded);
      setRoomId(decoded.room_id || '');
      setUserName(decoded.user_id || 'Anonymous');
    } catch (err) {
      console.log('Invalid token:', err);
      toast({
        title: "Invalid token",
        description: "Could not decode the authentication token.",
        variant: "destructive",
        className:"bg-red-500 text-white"
      });
    }
  }, [state.token, toast]);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomId.trim() || !state.token?.trim()) {
      toast({
        title: "Missing Information",
        description: "Room ID or token is missing.",
        variant: "destructive",
        className:"bg-white",
      });
      return;
    }

    try {
      await joinRoom(roomId.trim(), state.token.trim(), userName.trim() || undefined);
      toast({
        title: "Successfully Joined",
        description: "You have joined the video session",
        className:"bg-white"
      });
      onJoinSuccess();
      navigate('/roomVC');
    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
      
      <Card className="relative w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
        <CardHeader className="text-center pb-6 pt-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-teal-400/20 to-sky-400/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Video className="h-10 w-10 text-teal-400" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
            Join Video Session
          </CardTitle>
          <p className="text-slate-400 text-base mt-3 leading-relaxed">
            Enter your session details to connect with others
          </p>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleJoinRoom} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="userName" className="text-slate-300 font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-teal-400" />
                Display Name
              </Label>
              <Input
                id="userName"
                type="text"
                placeholder="How should others see you?"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="h-12 bg-slate-800/80 border-slate-600/50 text-slate-100 placeholder-slate-500 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 rounded-xl"
                disabled={state.isJoining}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="roomId" className="text-slate-300 font-medium flex items-center gap-2">
                <Video className="h-4 w-4 text-teal-400" />
                Room ID
              </Label>
              <Input
                id="roomId"
                type="text"
                placeholder="Enter the meeting room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="h-12 bg-slate-800/80 border-slate-600/50 text-slate-100 placeholder-slate-500 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 rounded-xl"
                disabled={state.isJoining}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="token" className="text-slate-300 font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-teal-400" />
                Access Token
              </Label>
              <div className="relative">
                <Input
                  id="token"
                  type={showToken ? "text" : "password"}
                  placeholder="Enter your secure access token"
                  value={state.token || ''}
                  onChange={(e) => setToken(e.target.value)}
                  className="h-12 bg-slate-800/80 border-slate-600/50 text-slate-100 placeholder-slate-500 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/20 transition-all duration-200 rounded-xl pr-12"
                  disabled={state.isJoining}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  disabled={state.isJoining}
                >
                  {showToken ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {state.error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium text-sm">Connection Error</p>
                  <p className="text-red-300/80 text-sm mt-1">{state.error}</p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold text-base mt-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              disabled={state.isJoining}
            >
              {state.isJoining ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  <span>Join Video Session</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 p-5 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-teal-400" />
              <h4 className="text-sm font-semibold text-teal-400">Before You Join</h4>
            </div>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Ensure your camera and microphone permissions are enabled</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Use the exact room ID shared by your meeting host</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Keep your access token private and secure at all times</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Your display name will be visible to all participants</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinVC;
