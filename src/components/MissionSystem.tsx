import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Target, Trophy, AlertTriangle } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  reward: number;
  status: 'locked' | 'active' | 'completed';
  progress: number;
  objectives: string[];
}

const MissionSystem = () => {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'm1',
      title: 'Corporate Network Breach',
      description: 'Infiltrate TechCorp network and extract sensitive data',
      difficulty: 'medium',
      reward: 5000,
      status: 'active',
      progress: 45,
      objectives: ['Scan network ports', 'Crack admin password', 'Download database', 'Cover tracks']
    },
    {
      id: 'm2',
      title: 'Ransomware Decryption',
      description: 'Decrypt files locked by sophisticated ransomware',
      difficulty: 'hard',
      reward: 8500,
      status: 'active',
      progress: 20,
      objectives: ['Analyze encryption', 'Find key pattern', 'Develop decryptor', 'Restore files']
    },
    {
      id: 'm3',
      title: 'Dark Web Investigation',
      description: 'Track and identify anonymous threat actor',
      difficulty: 'extreme',
      reward: 15000,
      status: 'locked',
      progress: 0,
      objectives: ['Access dark web', 'Trace connections', 'Identify suspect', 'Report findings']
    },
    {
      id: 'm4',
      title: 'IoT Botnet Takedown',
      description: 'Dismantle network of compromised IoT devices',
      difficulty: 'hard',
      reward: 10000,
      status: 'locked',
      progress: 0,
      objectives: ['Locate C&C server', 'Reverse malware', 'Patch vulnerabilities', 'Neutralize botnet']
    }
  ]);

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    extreme: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary matrix-glow">ACTIVE MISSIONS</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="text-accent font-bold">28,500 XP</span>
          </div>
        </div>
      </div>

      {missions.map((mission) => (
        <Card key={mission.id} className="bg-card/50 border-primary/30 neon-border p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-primary">{mission.title}</h3>
                <Badge className={`${difficultyColors[mission.difficulty]} border`}>
                  {mission.difficulty.toUpperCase()}
                </Badge>
                {mission.status === 'locked' && (
                  <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                    LOCKED
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{mission.description}</p>
            </div>
            <div className="text-right">
              <div className="text-accent font-bold text-lg">{mission.reward} CR</div>
            </div>
          </div>

          {mission.status === 'active' && (
            <>
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-terminal-text">Progress</span>
                  <span className="text-primary font-bold">{mission.progress}%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${mission.progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground mb-1">OBJECTIVES:</div>
                {mission.objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    {idx < Math.floor(mission.objectives.length * mission.progress / 100) ? (
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className={idx < Math.floor(mission.objectives.length * mission.progress / 100) ? 'text-accent' : 'text-terminal-text'}>
                      {obj}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      ))}
    </div>
  );
};

export default MissionSystem;
