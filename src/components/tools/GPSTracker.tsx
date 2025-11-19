import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Crosshair } from 'lucide-react';

const GPSTracker = () => {
  const [targets, setTargets] = useState([
    { id: 1, name: 'TARGET-ALPHA', lat: 40.7128, lon: -74.0060, status: 'tracking' },
    { id: 2, name: 'TARGET-BRAVO', lat: 51.5074, lon: -0.1278, status: 'locked' },
    { id: 3, name: 'TARGET-CHARLIE', lat: 35.6762, lon: 139.6503, status: 'tracking' },
    { id: 4, name: 'TARGET-DELTA', lat: 48.8566, lon: 2.3522, status: 'lost' }
  ]);

  const [selectedTarget, setSelectedTarget] = useState(targets[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTargets(prev => prev.map(t => ({
        ...t,
        lat: t.lat + (Math.random() - 0.5) * 0.01,
        lon: t.lon + (Math.random() - 0.5) * 0.01
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const cities = [
    'New York, USA', 'London, UK', 'Tokyo, Japan', 'Paris, France',
    'Dubai, UAE', 'Moscow, Russia', 'Sydney, Australia', 'Berlin, Germany'
  ];

  return (
    <Card className="h-full bg-card/50 border-primary/30 neon-border overflow-hidden flex flex-col">
      <div className="p-4 border-b border-primary/30 bg-card">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-accent" />
          <span className="font-bold text-primary matrix-glow">GPS TRACKING SYSTEM</span>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-1/3 border-r border-primary/30 overflow-y-auto custom-scrollbar">
          {targets.map((target) => (
            <div
              key={target.id}
              onClick={() => setSelectedTarget(target)}
              className={`p-3 border-b border-primary/10 cursor-pointer hover:bg-primary/10 ${
                selectedTarget.id === target.id ? 'bg-primary/20' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-primary">{target.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  target.status === 'tracking' ? 'bg-green-500/20 text-green-400' :
                  target.status === 'locked' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {target.status.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-muted-foreground font-mono space-y-1">
                <div>LAT: {target.lat.toFixed(4)}°</div>
                <div>LON: {target.lon.toFixed(4)}°</div>
                <div>ALT: {Math.floor(Math.random() * 500)}m</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-background to-background/50 relative overflow-hidden">
            {/* Fake map grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}>
            </div>

            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Crosshair className="w-32 h-32 text-accent/30 animate-spin" style={{ animationDuration: '20s' }} />
            </div>

            {/* Target marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <MapPin className="w-8 h-8 text-destructive animate-pulse" />
                <div className="absolute top-0 left-0 w-8 h-8 bg-destructive/30 rounded-full animate-ping" />
              </div>
            </div>

            {/* Scanning line */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent animate-scan" />
            </div>
          </div>

          <div className="p-4 border-t border-primary/30 bg-card/50 space-y-2">
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <div className="text-muted-foreground mb-1">COORDINATES</div>
                <div className="text-primary">
                  {selectedTarget.lat.toFixed(6)}°, {selectedTarget.lon.toFixed(6)}°
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">LOCATION</div>
                <div className="text-accent">
                  {cities[Math.floor(Math.random() * cities.length)]}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">SPEED</div>
                <div className="text-terminal-text">
                  {Math.floor(Math.random() * 120)} km/h
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">ACCURACY</div>
                <div className="text-terminal-text">
                  ±{Math.floor(Math.random() * 10 + 1)}m
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GPSTracker;
