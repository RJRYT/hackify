import { useEffect, useState } from 'react';
import { Globe2 } from 'lucide-react';

interface AttackLine {
  id: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

const NetworkMap = () => {
  const [attacks, setAttacks] = useState<AttackLine[]>([]);

  useEffect(() => {
    const addAttack = () => {
      const newAttack: AttackLine = {
        id: Date.now(),
        from: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
        to: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
      };

      setAttacks(prev => [...prev, newAttack].slice(-20));
    };

    const interval = setInterval(addAttack, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-primary/30 rounded neon-border p-4 h-64">
      <div className="flex items-center gap-2 mb-4">
        <Globe2 className="w-5 h-5 text-primary animate-pulse-glow" />
        <h3 className="text-sm font-bold text-primary">GLOBAL ATTACK MAP</h3>
      </div>
      <div className="relative h-48 bg-muted/30 rounded border border-primary/20 overflow-hidden cyber-grid">
        {attacks.map(attack => (
          <svg
            key={attack.id}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.6 }}
          >
            <line
              x1={`${attack.from.x}%`}
              y1={`${attack.from.y}%`}
              x2={`${attack.to.x}%`}
              y2={`${attack.to.y}%`}
              stroke="hsl(var(--destructive))"
              strokeWidth="1"
              className="animate-pulse"
            />
            <circle
              cx={`${attack.from.x}%`}
              cy={`${attack.from.y}%`}
              r="2"
              fill="hsl(var(--primary))"
              className="animate-pulse-glow"
            />
            <circle
              cx={`${attack.to.x}%`}
              cy={`${attack.to.y}%`}
              r="2"
              fill="hsl(var(--destructive))"
              className="animate-pulse-glow"
            />
          </svg>
        ))}
        
        {/* Random nodes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NetworkMap;
