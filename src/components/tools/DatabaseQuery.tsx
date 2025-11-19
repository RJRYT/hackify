import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Play, Download } from 'lucide-react';

const DatabaseQuery = () => {
  const [query, setQuery] = useState('SELECT * FROM users WHERE admin = 1;');
  const [results, setResults] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const tables = ['users', 'transactions', 'credentials', 'sessions', 'logs'];
  
  const sampleQueries = [
    'SELECT * FROM users WHERE admin = 1;',
    'SELECT username, password FROM credentials;',
    'SELECT * FROM transactions WHERE amount > 10000;',
    'SHOW TABLES;',
    'SELECT * FROM logs WHERE timestamp > NOW() - INTERVAL 1 HOUR;'
  ];

  const generateResults = () => {
    const usernames = ['admin', 'root', 'jdoe', 'sysadmin', 'dbmanager', 'analyst'];
    const emails = ['admin@corp.com', 'root@system.local', 'john.doe@company.com', 'sys@admin.net'];
    const ips = Array.from({ length: 5 }, () => 
      `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
    );

    return Array.from({ length: 8 }, (_, i) => ({
      id: 1000 + i,
      username: usernames[Math.floor(Math.random() * usernames.length)],
      email: emails[Math.floor(Math.random() * emails.length)],
      password_hash: Math.random().toString(36).substring(2, 15) + '...',
      last_login: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      ip_address: ips[Math.floor(Math.random() * ips.length)],
      admin: Math.random() > 0.7 ? 1 : 0
    }));
  };

  const executeQuery = async () => {
    setIsExecuting(true);
    setResults([]);
    
    // Simulate query execution with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setResults(generateResults());
    setIsExecuting(false);
  };

  return (
    <Card className="h-full bg-card/50 border-primary/30 neon-border overflow-hidden flex flex-col">
      <div className="p-4 border-b border-primary/30 bg-card flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-accent" />
          <span className="font-bold text-primary matrix-glow">SQL QUERY TERMINAL</span>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={executeQuery}
            disabled={isExecuting}
            className="bg-accent hover:bg-accent/80"
          >
            <Play className="w-4 h-4 mr-1" />
            Execute
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="p-4 border-b border-primary/30 bg-background/50">
        <div className="mb-2 text-xs text-muted-foreground font-mono">Available tables: {tables.join(', ')}</div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-24 bg-terminal-bg text-terminal-text font-mono text-sm p-3 rounded border border-primary/30 outline-none focus:border-accent resize-none"
          placeholder="Enter SQL query..."
        />
        <div className="mt-2 flex gap-2 flex-wrap">
          {sampleQueries.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(sq)}
              className="text-xs px-2 py-1 bg-primary/20 hover:bg-primary/30 rounded text-primary border border-primary/30"
            >
              {sq.substring(0, 30)}...
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar p-4">
        {isExecuting ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-primary matrix-glow animate-pulse">
              Executing query<span className="animate-pulse">...</span>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead className="border-b border-primary/30 text-accent">
                <tr>
                  {Object.keys(results[0]).map((key) => (
                    <th key={key} className="text-left p-2 font-bold">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr key={idx} className="border-b border-primary/10 hover:bg-primary/5">
                    {Object.values(row).map((value: any, vidx) => (
                      <td key={vidx} className="p-2 text-terminal-text">
                        {typeof value === 'boolean' ? value.toString() : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-xs text-muted-foreground">
              {results.length} rows returned • Query executed in {(Math.random() * 500 + 100).toFixed(0)}ms
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Enter a query and click Execute
          </div>
        )}
      </div>
    </Card>
  );
};

export default DatabaseQuery;
