import { useEffect, useState } from 'react';
import { Activity, Cpu, HardDrive, Wifi } from 'lucide-react';

const SystemStats = () => {
  const [stats, setStats] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    disk: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      setStats({
        cpu: Math.floor(Math.random() * 40 + 40),
        memory: Math.floor(Math.random() * 30 + 60),
        network: Math.floor(Math.random() * 50 + 20),
        disk: Math.floor(Math.random() * 20 + 70),
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="p-3 bg-card/50 border border-primary/20 rounded">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
        <span className={`text-sm font-bold ${color}`}>{value}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${color.replace('text', 'bg')} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-primary/30 rounded neon-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary animate-pulse-glow" />
        <h3 className="text-sm font-bold text-primary">SYSTEM STATS</h3>
      </div>
      <div className="space-y-3">
        <StatCard icon={Cpu} label="CPU USAGE" value={stats.cpu} color="text-primary" />
        <StatCard icon={HardDrive} label="MEMORY" value={stats.memory} color="text-accent" />
        <StatCard icon={Wifi} label="NETWORK" value={stats.network} color="text-secondary" />
        <StatCard icon={HardDrive} label="DISK I/O" value={stats.disk} color="text-primary" />
      </div>
    </div>
  );
};

export default SystemStats;
