import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, AlertTriangle, Shield, ShieldAlert, Camera, Mic, MapPin } from 'lucide-react';

export type AlertType = 
  | 'access-granted' 
  | 'access-denied' 
  | 'breach' 
  | 'firewall-breach' 
  | 'camera-access' 
  | 'mic-access' 
  | 'gps-tracking';

interface AlertMessage {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  timestamp: Date;
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  useEffect(() => {
    // Simulate random alerts
    const interval = setInterval(() => {
      const alertTypes: AlertType[] = [
        'access-granted',
        'access-denied',
        'breach',
        'firewall-breach',
        'camera-access',
        'mic-access',
        'gps-tracking'
      ];

      const messages = {
        'access-granted': [
          'Root access obtained',
          'Authentication bypassed',
          'Admin privileges granted',
          'System access authorized'
        ],
        'access-denied': [
          'Authentication failed',
          'Access blocked by firewall',
          'Insufficient privileges',
          'Connection refused'
        ],
        'breach': [
          'Security breach detected',
          'Unauthorized access attempt',
          'System intrusion alert',
          'Data exfiltration in progress'
        ],
        'firewall-breach': [
          'Firewall successfully bypassed',
          'Network barrier compromised',
          'Perimeter defense breached',
          'Packet filter evaded'
        ],
        'camera-access': [
          'Camera feed acquired',
          'Visual surveillance active',
          'Video stream intercepted',
          'Optical sensors online'
        ],
        'mic-access': [
          'Audio capture initiated',
          'Microphone access granted',
          'Sound monitoring active',
          'Voice recording enabled'
        ],
        'gps-tracking': [
          'GPS coordinates locked',
          'Location tracking active',
          'Geolocation acquired',
          'Target position identified'
        ]
      };

      const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const randomMessage = messages[randomType][Math.floor(Math.random() * messages[randomType].length)];

      const newAlert: AlertMessage = {
        id: Math.random().toString(36).substr(2, 9),
        type: randomType,
        title: randomType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        message: randomMessage,
        timestamp: new Date()
      };

      setAlerts(prev => [newAlert, ...prev].slice(0, 5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAlertConfig = (type: AlertType) => {
    const configs = {
      'access-granted': {
        icon: CheckCircle2,
        className: 'border-green-500/50 bg-green-500/10 text-green-400',
        iconColor: 'text-green-400'
      },
      'access-denied': {
        icon: XCircle,
        className: 'border-red-500/50 bg-red-500/10 text-red-400',
        iconColor: 'text-red-400'
      },
      'breach': {
        icon: ShieldAlert,
        className: 'border-red-500/50 bg-red-500/10 text-red-400 animate-pulse',
        iconColor: 'text-red-400'
      },
      'firewall-breach': {
        icon: Shield,
        className: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
        iconColor: 'text-orange-400'
      },
      'camera-access': {
        icon: Camera,
        className: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
        iconColor: 'text-blue-400'
      },
      'mic-access': {
        icon: Mic,
        className: 'border-purple-500/50 bg-purple-500/10 text-purple-400',
        iconColor: 'text-purple-400'
      },
      'gps-tracking': {
        icon: MapPin,
        className: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
        iconColor: 'text-yellow-400'
      }
    };
    return configs[type];
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => {
        const config = getAlertConfig(alert.type);
        const Icon = config.icon;
        
        return (
          <Alert key={alert.id} className={`${config.className} border-2 neon-border`}>
            <Icon className={`h-5 w-5 ${config.iconColor}`} />
            <AlertTitle className="font-bold">{alert.title}</AlertTitle>
            <AlertDescription className="text-xs">
              {alert.message}
              <span className="block text-xs opacity-70 mt-1">
                {alert.timestamp.toLocaleTimeString()}
              </span>
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
};

export default AlertSystem;
