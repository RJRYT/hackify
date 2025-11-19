interface TerminalLine {
  type: 'output' | 'error';
  content: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const randomIP = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
const randomPort = () => Math.floor(Math.random() * 65535);
const randomLatency = () => Math.floor(Math.random() * 100);

const commands: { [key: string]: () => Promise<string | TerminalLine[]> } = {
  help: async () => {
    return `Available commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  nmap <target>      - Scan network ports
  sqlmap <url>       - SQL injection test
  hydra <service>    - Brute force attack
  decrypt <file>     - Decrypt encrypted file
  connect <port>     - Establish connection
  bypass             - Firewall bypass attempt
  whois <domain>     - Domain information
  sniff              - Network packet sniffer
  sysinfo            - System information
  logs               - View system logs
  trace <target>     - Trace route to target
  exploit <target>   - Upload exploit
  clear              - Clear terminal
  help               - Show this message`;
  },

  clear: async () => {
    return '';
  },

  nmap: async () => {
    const target = randomIP();
    const lines: TerminalLine[] = [
      { type: 'output', content: `Starting Nmap scan on ${target}...` },
      { type: 'output', content: 'Initiating SYN Stealth Scan' },
    ];

    const ports = [21, 22, 80, 443, 3306, 8080, 3389];
    for (const port of ports) {
      const status = Math.random() > 0.5 ? 'open' : 'filtered';
      const service = { 21: 'ftp', 22: 'ssh', 80: 'http', 443: 'https', 3306: 'mysql', 8080: 'http-proxy', 3389: 'rdp' }[port];
      lines.push({
        type: 'output',
        content: `PORT ${port}/tcp ${status.padEnd(10)} ${service}`,
      });
    }

    lines.push({ type: 'output', content: `\nScan complete. ${Math.floor(Math.random() * 3 + 2)} vulnerabilities detected.` });
    return lines;
  },

  sqlmap: async () => {
    const url = `http://target-${Math.random().toString(36).substring(7)}.com/admin`;
    return [
      { type: 'output', content: `Testing ${url} for SQL injection...` },
      { type: 'output', content: '[INFO] Testing MySQL injection' },
      { type: 'output', content: '[INFO] Testing PostgreSQL injection' },
      { type: 'output', content: '[CRITICAL] SQL injection vulnerability detected!' },
      { type: 'output', content: 'Parameter: id (GET)' },
      { type: 'output', content: 'Type: boolean-based blind' },
      { type: 'output', content: 'Payload: id=1\' AND 1=1--' },
    ];
  },

  hydra: async () => {
    const service = 'SSH';
    const lines: TerminalLine[] = [
      { type: 'output', content: `Hydra v9.4 starting brute force on ${service}...` },
      { type: 'output', content: 'Target: ' + randomIP() },
      { type: 'output', content: 'Attempting combinations...' },
    ];

    const usernames = ['admin', 'root', 'user', 'administrator'];
    for (let i = 0; i < 5; i++) {
      lines.push({
        type: 'output',
        content: `[${randomPort()}] Trying ${usernames[Math.floor(Math.random() * usernames.length)]}:${Math.random().toString(36).substring(7)}`,
      });
    }

    lines.push({ type: 'output', content: `\n✓ Password found: ${Math.random().toString(36).substring(2, 10)}` });
    return lines;
  },

  decrypt: async () => {
    const filename = `classified_${Math.random().toString(36).substring(7)}.enc`;
    return [
      { type: 'output', content: `Decrypting ${filename}...` },
      { type: 'output', content: 'Algorithm: AES-256' },
      { type: 'output', content: 'Attempting dictionary attack...' },
      { type: 'output', content: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%' },
      { type: 'output', content: '✓ Decryption successful!' },
      { type: 'output', content: `Output saved to: ${filename.replace('.enc', '.txt')}` },
    ];
  },

  connect: async () => {
    const port = randomPort();
    const ip = randomIP();
    return [
      { type: 'output', content: `Establishing connection to ${ip}:${port}...` },
      { type: 'output', content: 'Initiating TCP handshake...' },
      { type: 'output', content: 'SYN sent...' },
      { type: 'output', content: 'SYN-ACK received...' },
      { type: 'output', content: 'ACK sent...' },
      { type: 'output', content: '✓ Connection established' },
      { type: 'output', content: `Latency: ${randomLatency()}ms` },
    ];
  },

  bypass: async () => {
    return [
      { type: 'output', content: 'Initiating firewall bypass...' },
      { type: 'output', content: 'Scanning for vulnerabilities...' },
      { type: 'output', content: 'CVE-2024-' + Math.floor(Math.random() * 10000) + ' detected' },
      { type: 'output', content: 'Exploiting buffer overflow...' },
      { type: 'output', content: '▓▓▓▓▓▓▓▓░░░░░░░░░░░░ 40%' },
      { type: 'output', content: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%' },
      { type: 'output', content: '✓ Firewall bypassed successfully' },
    ];
  },

  whois: async () => {
    const domain = `target${Math.floor(Math.random() * 1000)}.com`;
    return [
      { type: 'output', content: `Domain: ${domain}` },
      { type: 'output', content: `Registrar: ${['GoDaddy', 'Namecheap', 'CloudFlare'][Math.floor(Math.random() * 3)]}` },
      { type: 'output', content: `Created: 20${Math.floor(Math.random() * 24)}-0${Math.floor(Math.random() * 9 + 1)}-${Math.floor(Math.random() * 28 + 1)}` },
      { type: 'output', content: `Name Server: ns1.${domain}` },
      { type: 'output', content: `IP: ${randomIP()}` },
      { type: 'output', content: `Status: active` },
    ];
  },

  sniff: async () => {
    const lines: TerminalLine[] = [
      { type: 'output', content: 'Starting packet sniffer...' },
      { type: 'output', content: 'Interface: eth0' },
      { type: 'output', content: '━'.repeat(60) },
    ];

    const protocols = ['TCP', 'UDP', 'HTTPS', 'DNS', 'SSH'];
    for (let i = 0; i < 8; i++) {
      const proto = protocols[Math.floor(Math.random() * protocols.length)];
      lines.push({
        type: 'output',
        content: `${randomIP()}:${randomPort()} → ${randomIP()}:${randomPort()} | ${proto} | ${Math.floor(Math.random() * 1500)}B`,
      });
    }
    return lines;
  },

  sysinfo: async () => {
    return [
      { type: 'output', content: 'System Information' },
      { type: 'output', content: '━'.repeat(40) },
      { type: 'output', content: 'OS: HackerOS 2.8.4 (Phantom Edition)' },
      { type: 'output', content: `Kernel: Linux ${Math.floor(Math.random() * 6)}.${Math.floor(Math.random() * 20)}.${Math.floor(Math.random() * 100)}` },
      { type: 'output', content: `CPU: Intel Core i${Math.floor(Math.random() * 2) + 7}-${Math.floor(Math.random() * 10000) + 10000}K` },
      { type: 'output', content: `RAM: ${Math.floor(Math.random() * 32 + 16)}GB` },
      { type: 'output', content: `Uptime: ${Math.floor(Math.random() * 30)} days` },
      { type: 'output', content: `Active Connections: ${Math.floor(Math.random() * 50)}` },
    ];
  },

  logs: async () => {
    const lines: TerminalLine[] = [{ type: 'output', content: 'System Logs (live feed):' }];
    
    const events = [
      'Packet received from',
      'Unauthorized TLS handshake from',
      'Suspicious POST request detected',
      'Port scan attempt blocked',
      'Authentication failure',
      'New connection established',
    ];

    for (let i = 0; i < 6; i++) {
      const time = new Date().toLocaleTimeString();
      const event = events[Math.floor(Math.random() * events.length)];
      const level = ['INFO', 'WARN', 'ALERT', 'ERROR'][Math.floor(Math.random() * 4)];
      lines.push({
        type: 'output',
        content: `[${time}] [${level}] ${event} ${randomIP()}`,
      });
    }
    return lines;
  },

  trace: async () => {
    const target = randomIP();
    const lines: TerminalLine[] = [
      { type: 'output', content: `Tracing route to ${target}...` },
    ];

    for (let i = 1; i <= 8; i++) {
      lines.push({
        type: 'output',
        content: `${i}  ${randomIP()}  ${randomLatency()}ms  ${randomLatency()}ms  ${randomLatency()}ms`,
      });
    }
    return lines;
  },

  exploit: async () => {
    const target = randomIP();
    return [
      { type: 'output', content: `Uploading exploit to ${target}...` },
      { type: 'output', content: 'Exploit: CVE-2024-' + Math.floor(Math.random() * 10000) },
      { type: 'output', content: 'Payload size: ' + Math.floor(Math.random() * 500 + 100) + 'KB' },
      { type: 'output', content: 'Establishing backdoor...' },
      { type: 'output', content: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%' },
      { type: 'output', content: '✓ Exploit uploaded successfully' },
      { type: 'output', content: '✓ Remote access granted' },
    ];
  },
};

export const executeCommand = async (input: string): Promise<string | TerminalLine[]> => {
  const [cmd] = input.trim().toLowerCase().split(' ');

  if (cmd === 'clear') {
    // Return empty to signal terminal to clear
    return '';
  }

  if (commands[cmd]) {
    return commands[cmd]();
  }

  return [{ type: 'error', content: `Command not found: ${cmd}. Type 'help' for available commands.` }];
};
