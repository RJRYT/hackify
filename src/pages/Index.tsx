import { useState } from 'react';
import EnhancedTerminal from '@/components/EnhancedTerminal';
import Dashboard from '@/components/Dashboard';
import MatrixRain from '@/components/MatrixRain';
import MissionSystem from '@/components/MissionSystem';
import AlertSystem from '@/components/AlertSystem';
import FileBrowser from '@/components/tools/FileBrowser';
import DatabaseQuery from '@/components/tools/DatabaseQuery';
import GPSTracker from '@/components/tools/GPSTracker';
import CameraMonitor from '@/components/tools/CameraMonitor';
import { Button } from '@/components/ui/button';
import { Monitor, Terminal as TerminalIcon, Target, FolderTree, Database, MapPin, Camera, Maximize, Minimize } from 'lucide-react';

const Index = () => {
  const [view, setView] = useState<'terminal' | 'dashboard' | 'missions' | 'tools'>('terminal');
  const [toolView, setToolView] = useState<'files' | 'database' | 'gps' | 'camera'>('files');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <MatrixRain />
     {/* <AlertSystem /> */}
      
      <div className="relative z-10 container mx-auto p-4 h-screen flex flex-col gap-4">
        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            onClick={() => setView('terminal')}
            variant={view === 'terminal' ? 'default' : 'outline'}
            className="neon-border"
          >
            <TerminalIcon className="w-4 h-4 mr-2" />
            Terminal
          </Button>
          <Button
            onClick={() => setView('dashboard')}
            variant={view === 'dashboard' ? 'default' : 'outline'}
            className="neon-border"
          >
            <Monitor className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button
            onClick={() => setView('missions')}
            variant={view === 'missions' ? 'default' : 'outline'}
            className="neon-border"
          >
            <Target className="w-4 h-4 mr-2" />
            Missions
          </Button>
          <Button
            onClick={() => setView('tools')}
            variant={view === 'tools' ? 'default' : 'outline'}
            className="neon-border"
          >
            <FolderTree className="w-4 h-4 mr-2" />
            Tools
          </Button>
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            className="neon-border ml-auto"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>

        {view === 'tools' && (
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => setToolView('files')}
              variant={toolView === 'files' ? 'default' : 'ghost'}
              size="sm"
            >
              <FolderTree className="w-4 h-4 mr-2" />
              Files
            </Button>
            <Button
              onClick={() => setToolView('database')}
              variant={toolView === 'database' ? 'default' : 'ghost'}
              size="sm"
            >
              <Database className="w-4 h-4 mr-2" />
              Database
            </Button>
            <Button
              onClick={() => setToolView('gps')}
              variant={toolView === 'gps' ? 'default' : 'ghost'}
              size="sm"
            >
              <MapPin className="w-4 h-4 mr-2" />
              GPS
            </Button>
            <Button
              onClick={() => setToolView('camera')}
              variant={toolView === 'camera' ? 'default' : 'ghost'}
              size="sm"
            >
              <Camera className="w-4 h-4 mr-2" />
              Camera
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          {view === 'terminal' && <EnhancedTerminal />}
          {view === 'dashboard' && <Dashboard />}
          {view === 'missions' && <MissionSystem />}
          {view === 'tools' && (
            <>
              {toolView === 'files' && <FileBrowser />}
              {toolView === 'database' && <DatabaseQuery />}
              {toolView === 'gps' && <GPSTracker />}
              {toolView === 'camera' && <CameraMonitor />}
            </>
          )}
        </div>
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
      `}</style>
    </div>
  );
};

export default Index;
