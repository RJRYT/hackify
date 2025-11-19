import { useState } from 'react';
import { Folder, File, Lock, Eye, Download, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  encrypted?: boolean;
  suspicious?: boolean;
  children?: FileNode[];
}

const FileBrowser = () => {
  const [currentPath, setCurrentPath] = useState('/root');
  const [fileSystem] = useState<FileNode[]>([
    {
      name: 'etc',
      type: 'folder',
      children: [
        { name: 'passwd', type: 'file', size: '2.4 KB', suspicious: true },
        { name: 'shadow', type: 'file', size: '1.8 KB', encrypted: true },
        { name: 'ssh', type: 'folder', children: [
          { name: 'id_rsa', type: 'file', size: '3.2 KB', encrypted: true },
          { name: 'authorized_keys', type: 'file', size: '892 B' }
        ]}
      ]
    },
    {
      name: 'home',
      type: 'folder',
      children: [
        { name: 'admin', type: 'folder', children: [
          { name: 'documents', type: 'folder', children: [
            { name: 'classified.pdf', type: 'file', size: '4.5 MB', suspicious: true, encrypted: true }
          ]},
          { name: '.ssh', type: 'folder', children: [
            { name: 'id_rsa', type: 'file', size: '3.1 KB', encrypted: true }
          ]}
        ]}
      ]
    },
    {
      name: 'var',
      type: 'folder',
      children: [
        { name: 'log', type: 'folder', children: [
          { name: 'auth.log', type: 'file', size: '12.3 MB', suspicious: true },
          { name: 'secure', type: 'file', size: '8.7 MB' }
        ]},
        { name: 'www', type: 'folder', children: [
          { name: 'database.sql', type: 'file', size: '156 MB', suspicious: true }
        ]}
      ]
    },
    {
      name: 'tmp',
      type: 'folder',
      children: [
        { name: 'payload.bin', type: 'file', size: '256 KB', suspicious: true, encrypted: true },
        { name: 'exploit.sh', type: 'file', size: '4.2 KB', suspicious: true }
      ]
    }
  ]);

  const renderFileTree = (nodes: FileNode[], depth: number = 0) => {
    return nodes.map((node, idx) => (
      <div key={idx} style={{ paddingLeft: `${depth * 20}px` }}>
        <div className={`flex items-center gap-2 p-2 hover:bg-primary/10 rounded cursor-pointer group ${
          node.suspicious ? 'text-destructive' : 'text-terminal-text'
        }`}>
          {node.type === 'folder' ? (
            <Folder className="w-4 h-4 text-accent" />
          ) : (
            <File className="w-4 h-4 text-primary" />
          )}
          <span className="flex-1 font-mono text-sm">{node.name}</span>
          {node.encrypted && <Lock className="w-3 h-3 text-yellow-500" />}
          {node.size && <span className="text-xs text-muted-foreground">{node.size}</span>}
          <div className="hidden group-hover:flex gap-1">
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Eye className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Download className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-destructive">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
        {node.children && renderFileTree(node.children, depth + 1)}
      </div>
    ));
  };

  return (
    <Card className="h-full bg-card/50 border-primary/30 neon-border overflow-hidden flex flex-col">
      <div className="p-4 border-b border-primary/30 bg-card">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-accent" />
          <span className="font-mono text-sm text-primary matrix-glow">{currentPath}</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {renderFileTree(fileSystem)}
      </div>
      <div className="p-3 border-t border-primary/30 bg-card/50 text-xs text-muted-foreground font-mono">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-yellow-500" /> Encrypted
          </span>
          <span className="flex items-center gap-1 text-destructive">
            ⚠ Suspicious
          </span>
        </div>
      </div>
    </Card>
  );
};

export default FileBrowser;
