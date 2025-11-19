import { useEffect, useState } from 'react';
import SystemStats from './dashboard/SystemStats';
import PacketFeed from './dashboard/PacketFeed';
import ThreatAlerts from './dashboard/ThreatAlerts';
import NetworkMap from './dashboard/NetworkMap';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col bg-background/50 backdrop-blur-sm">
      {/* Header */}
      <div className="px-6 py-3 border-b border-primary/30 bg-card/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary matrix-glow glitch">
              HACKEROS
            </h1>
            <p className="text-xs text-muted-foreground">CYBER OPERATIONS CONTROL CENTER</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-mono text-primary matrix-glow">
              {time.toLocaleTimeString()}
            </div>
            <div className="text-xs text-muted-foreground">
              {time.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SystemStats />
          <ThreatAlerts />
          <PacketFeed />
        </div>
        <NetworkMap />
      </div>
    </div>
  );
};

export default Dashboard;
