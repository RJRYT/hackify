import { useState } from 'react';
import Terminal from '@/components/Terminal';
import Dashboard from '@/components/Dashboard';
import MatrixRain from '@/components/MatrixRain';
import { Terminal as TerminalIcon, LayoutDashboard } from 'lucide-react';

const Index = () => {
  const [activeView, setActiveView] = useState<'terminal' | 'dashboard'>('dashboard');

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <MatrixRain />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Navigation */}
        <nav className="bg-card/80 backdrop-blur-sm border-b border-primary/30 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-primary text-primary-foreground neon-border'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="font-mono text-sm">DASHBOARD</span>
              </button>
              <button
                onClick={() => setActiveView('terminal')}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                  activeView === 'terminal'
                    ? 'bg-primary text-primary-foreground neon-border'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <TerminalIcon className="w-4 h-4" />
                <span className="font-mono text-sm">TERMINAL</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs text-muted-foreground font-mono">SYSTEM ONLINE</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden p-6">
          {activeView === 'dashboard' ? <Dashboard /> : <Terminal />}
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary-glow));
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Index;
