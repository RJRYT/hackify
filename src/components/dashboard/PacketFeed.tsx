import { useEffect, useState } from 'react';
import { Network } from 'lucide-react';

interface Packet {
  id: number;
  src: string;
  dst: string;
  protocol: string;
  size: number;
}

const PacketFeed = () => {
  const [packets, setPackets] = useState<Packet[]>([]);

  const randomIP = () => 
    `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

  const protocols = ['TCP', 'UDP', 'HTTPS', 'DNS', 'SSH', 'FTP'];

  useEffect(() => {
    const addPacket = () => {
      const newPacket: Packet = {
        id: Date.now(),
        src: randomIP(),
        dst: randomIP(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        size: Math.floor(Math.random() * 1500),
      };

      setPackets(prev => [newPacket, ...prev].slice(0, 10));
    };

    const interval = setInterval(addPacket, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-primary/30 rounded neon-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Network className="w-5 h-5 text-accent animate-pulse-glow" />
        <h3 className="text-sm font-bold text-accent">PACKET SNIFFER</h3>
      </div>
      <div className="space-y-2 font-mono text-xs">
        {packets.map(packet => (
          <div
            key={packet.id}
            className="p-2 bg-muted/50 border border-accent/20 rounded text-terminal-text terminal-glow animate-fade-in"
          >
            <div className="flex justify-between items-center">
              <span className="text-accent">{packet.protocol}</span>
              <span className="text-muted-foreground">{packet.size}B</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1 truncate">
              {packet.src} → {packet.dst}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PacketFeed;
