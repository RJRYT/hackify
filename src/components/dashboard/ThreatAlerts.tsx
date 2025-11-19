import { useEffect, useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  message: string;
}

const ThreatAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const alertMessages = [
    { type: 'critical', message: 'SQL injection attempt detected' },
    { type: 'warning', message: 'Unusual traffic pattern from 192.168.1.1' },
    { type: 'critical', message: 'Brute force attack in progress' },
    { type: 'info', message: 'Port scan detected on 443' },
    { type: 'warning', message: 'Firewall bypass attempt' },
    { type: 'critical', message: 'Unauthorized access attempt' },
  ];

  useEffect(() => {
    const addAlert = () => {
      const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)];
      const newAlert: Alert = {
        id: Date.now(),
        type: randomAlert.type as 'critical' | 'warning' | 'info',
        message: randomAlert.message,
      };

      setAlerts(prev => [newAlert, ...prev].slice(0, 8));
    };

    const interval = setInterval(addAlert, 4000);
    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-destructive border-destructive/50';
      case 'warning': return 'text-accent border-accent/50';
      default: return 'text-primary border-primary/50';
    }
  };

  return (
    <div className="bg-card border border-primary/30 rounded neon-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-destructive animate-pulse-glow" />
        <h3 className="text-sm font-bold text-destructive">THREAT ALERTS</h3>
      </div>
      <div className="space-y-2">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`p-2 bg-muted/50 border rounded flex items-start gap-2 animate-fade-in ${getAlertColor(alert.type)}`}
          >
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 animate-pulse" />
            <span className="text-xs font-mono">{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatAlerts;
