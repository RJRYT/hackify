import { useState, useRef, useEffect } from 'react';
import { executeCommand } from '@/utils/terminalCommands';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'HackerOS Terminal v2.8.4' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '━'.repeat(60) },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setLines(prev => [...prev, { type: 'input', content: `root@hackeros:~# ${trimmedCmd}` }]);
    setCommandHistory(prev => [...prev, trimmedCmd]);

    const result = await executeCommand(trimmedCmd);
    
    if (typeof result === 'string') {
      setLines(prev => [...prev, { type: 'output', content: result }]);
    } else {
      result.forEach(line => {
        setLines(prev => [...prev, line]);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-terminal-bg border border-primary/30 rounded neon-border">
      <div className="px-4 py-2 bg-card border-b border-primary/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive animate-pulse-glow"></div>
          <span className="text-xs text-primary font-bold">TERMINAL</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-primary/50"></div>
          <div className="w-2 h-2 rounded-full bg-accent/50"></div>
          <div className="w-2 h-2 rounded-full bg-destructive/50"></div>
        </div>
      </div>
      
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1 custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`${
              line.type === 'input'
                ? 'text-primary matrix-glow'
                : line.type === 'error'
                ? 'text-destructive'
                : 'text-terminal-text terminal-glow'
            }`}
          >
            {line.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-2 border-t border-primary/30 bg-card/50">
        <div className="flex items-center gap-2">
          <span className="text-primary matrix-glow font-bold">root@hackeros:~#</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-terminal-text terminal-glow"
            autoFocus
            spellCheck={false}
          />
        </div>
      </form>
    </div>
  );
};

export default Terminal;
