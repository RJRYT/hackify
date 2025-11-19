import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Camera, Mic, Volume2, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CameraMonitor = () => {
  const [audioLevel, setAudioLevel] = useState(0);
  const [isRecording, setIsRecording] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full bg-card/50 border-primary/30 neon-border overflow-hidden flex flex-col">
      <div className="p-4 border-b border-primary/30 bg-card flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-destructive animate-pulse" />
          <span className="font-bold text-primary matrix-glow">SURVEILLANCE SYSTEM</span>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
            RECORDING
          </Badge>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Camera Feed */}
        <div className="border-2 border-primary/30 rounded overflow-hidden bg-background/50 h-64 relative">
          <div className="absolute top-2 left-2 flex gap-2 z-10">
            <Badge className="bg-red-500/90 text-white">
              <Video className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
            <Badge className="bg-background/90 text-primary font-mono text-xs">
              {new Date().toLocaleTimeString()}
            </Badge>
          </div>

          {/* Fake video feed with grid overlay */}
          <div className="w-full h-full bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
            {/* Scanline effect */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.03) 2px, hsl(var(--primary) / 0.03) 4px)'
            }} />
            
            {/* Tracking box */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-accent animate-pulse">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-accent" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-accent" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-accent" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-accent" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-accent font-mono whitespace-nowrap">
                TARGET ACQUIRED
              </div>
            </div>

            {/* Static noise overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
              animation: 'noise 0.2s infinite'
            }} />
          </div>

          {/* Corner markers */}
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
        </div>

        {/* Audio Monitor */}
        <div className="border border-primary/30 rounded p-4 bg-background/50">
          <div className="flex items-center gap-3 mb-3">
            <Mic className="w-5 h-5 text-accent" />
            <span className="text-sm font-bold text-primary">AUDIO CAPTURE</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
              ACTIVE
            </Badge>
          </div>

          {/* Audio visualizer */}
          <div className="flex items-center gap-1 h-16">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-accent transition-all duration-75"
                style={{
                  height: `${Math.max(10, audioLevel * Math.random())}%`,
                  opacity: 0.3 + Math.random() * 0.7
                }}
              />
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span>Level: {audioLevel.toFixed(0)}%</span>
            </div>
            <span>Sample Rate: 48kHz</span>
            <span>Bitrate: 320kbps</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-xs font-mono">
          <div className="border border-primary/30 rounded p-2 bg-background/30">
            <div className="text-muted-foreground mb-1">RESOLUTION</div>
            <div className="text-primary font-bold">1920x1080</div>
          </div>
          <div className="border border-primary/30 rounded p-2 bg-background/30">
            <div className="text-muted-foreground mb-1">FPS</div>
            <div className="text-accent font-bold">60</div>
          </div>
          <div className="border border-primary/30 rounded p-2 bg-background/30">
            <div className="text-muted-foreground mb-1">CODEC</div>
            <div className="text-terminal-text font-bold">H.264</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CameraMonitor;
