import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Cpu, Zap, Activity, Play, Square } from 'lucide-react';
import { C, pageVariants } from '../components/constants';
import mqtt from 'mqtt';

interface SensorData {
  suhu_inti: number;
  kelembapan: number;
  beban_cpu: number;
  tegangan: number;
  load: number;
  memory: number;
  temp: number;
  network: number;
}

// Dummy data for charts initial state
const generateInitialData = () => {
  return Array.from({ length: 15 }).map((_, i) => ({
    time: `10:${i.toString().padStart(2, '0')}`,
    suhu: 0,
    beban: 0,
  }));
};

const Gauge = ({ value, label, color, unit }: { value: number, label: string, color: string, unit: string }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[rgba(246,247,237,0.03)] border border-[rgba(246,247,237,0.05)] rounded-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }} />

      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(246,247,237,0.1)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{Math.round(value)}</span>
          <span className="text-xs text-[rgba(246,247,237,0.5)]">{unit}</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium tracking-wide" style={{ color: 'rgba(246,247,237,0.7)' }}>{label}</p>
    </div>
  );
};

export default function Monitoring() {
  const [chartData, setChartData] = useState(generateInitialData());
  const [sensorData, setSensorData] = useState<SensorData>({
    suhu_inti: 0,
    kelembapan: 0,
    beban_cpu: 0,
    tegangan: 0,
    load: 0,
    memory: 0,
    temp: 0,
    network: 0
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'CONNECTING' | 'ONLINE' | 'OFFLINE' | 'ERROR'>('CONNECTING');
  const [connError, setConnError] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const clientRef = useRef<mqtt.MqttClient | null>(null);

  // Editable configuration state (loads from .env as defaults)
  const [mqttHost, setMqttHost] = useState<string>(
    import.meta.env.VITE_MQTT_HOST || 'wss://ra520107.ala.asia-southeast1.emqxsl.com:8084/mqtt'
  );
  const [mqttUsername, setMqttUsername] = useState<string>(
    import.meta.env.VITE_MQTT_USERNAME || 'ucupryd'
  );
  const [mqttPassword, setMqttPassword] = useState<string>(
    import.meta.env.VITE_MQTT_PASSWORD || 'Ucup1($_$)'
  );
  const [mqttTopic, setMqttTopic] = useState<string>(
    import.meta.env.VITE_MQTT_TOPIC || 'mekatro/monitoring'
  );

  const connectMQTT = () => {
    if (clientRef.current) {
      clientRef.current.end(true);
    }

    setConnectionStatus('CONNECTING');
    setConnError(null);

    const clientId = `emqx_web_${Math.random().toString(36).substring(2, 9)}`;

    console.log(`Connecting to MQTT Broker (${mqttHost}) as ${clientId}, username: ${mqttUsername}...`);

    const client = mqtt.connect(mqttHost, {
      clientId,
      username: mqttUsername,
      password: mqttPassword,
      clean: true,
      path: '/mqtt',
      keepalive: 60,
      reconnectPeriod: 5000,
      connectTimeout: 30 * 1000,
    });

    clientRef.current = client;

    client.on('connect', () => {
      console.log('Connected successfully to EMQX MQTT Broker!');
      setConnectionStatus('ONLINE');
      setConnError(null);

      client.subscribe(mqttTopic, { qos: 0 }, (err) => {
        if (err) {
          console.error(`Failed to subscribe to topic ${mqttTopic}:`, err);
        } else {
          console.log(`Successfully subscribed to topic: ${mqttTopic}`);
        }
      });
    });

    client.on('message', (receivedTopic, message) => {
      if (receivedTopic === mqttTopic) {
        try {
          const payload = JSON.parse(message.toString());
          setSensorData(prev => ({ ...prev, ...payload }));

          // Update chart data dynamically
          setChartData(prev => {
            const newData = [...prev.slice(1)];
            const now = new Date();
            const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
            newData.push({
              time: timeStr,
              suhu: payload.suhu_inti ?? payload.temp ?? 0,
              beban: payload.beban_cpu ?? payload.load ?? 0,
            });
            return newData;
          });
        } catch (error) {
          console.error('Failed to parse MQTT message JSON:', error);
        }
      }
    });

    client.on('error', (err: any) => {
      console.error('MQTT connection error:', err);
      setConnectionStatus('ERROR');
      const errMsg = err?.message || (typeof err === 'string' ? err : 'Gagal terhubung ke broker EMQX MQTT');
      setConnError(errMsg);
    });

    client.on('offline', () => {
      console.log('MQTT client is offline');
      setConnectionStatus('OFFLINE');
    });

    client.on('reconnect', () => {
      console.log('Attempting MQTT reconnect...');
      setConnectionStatus('CONNECTING');
    });

    client.on('close', () => {
      console.log('MQTT connection closed.');
      setConnectionStatus('OFFLINE');
    });
  };

  useEffect(() => {
    connectMQTT();

    return () => {
      if (clientRef.current) {
        clientRef.current.end(true);
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSimulating) {
      interval = setInterval(() => {
        const fakeData: SensorData = {
          suhu_inti: Math.floor(25 + Math.random() * 20),
          kelembapan: Math.floor(40 + Math.random() * 40),
          beban_cpu: Math.floor(10 + Math.random() * 80),
          tegangan: Math.floor(215 + Math.random() * 15),
          load: Math.floor(20 + Math.random() * 70),
          memory: Math.floor(50 + Math.random() * 40),
          temp: Math.floor(25 + Math.random() * 15),
          network: Math.floor(60 + Math.random() * 40),
        };

        if (clientRef.current && connectionStatus === 'ONLINE') {
          console.log('Injecting simulation data to EMQX MQTT Broker:', fakeData);
          clientRef.current.publish(mqttTopic, JSON.stringify(fakeData), { qos: 0 });
        }
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isSimulating, connectionStatus, mqttTopic]);

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  return (
    <motion.div
      className="p-4 md:p-8 min-h-full"
      variants={pageVariants}
    >
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Activity color={C.lime} />
              Sistem HMI
            </h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(246,247,237,0.5)' }}>Pemantauan Status Perangkat Real-time</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-[rgba(246,247,237,0.05)] text-white border border-[rgba(246,247,237,0.1)] hover:bg-[rgba(246,247,237,0.1)] cursor-pointer"
            >
              ⚙️ Pengaturan MQTT
            </button>

            <button
              onClick={toggleSimulation}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${isSimulating
                ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                : 'bg-[rgba(246,247,237,0.05)] text-white border border-[rgba(246,247,237,0.1)] hover:bg-[rgba(246,247,237,0.1)]'
                }`}
            >
              {isSimulating ? <Square size={16} /> : <Play size={16} />}
              {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
            </button>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
              connectionStatus === 'ONLINE'
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : connectionStatus === 'CONNECTING'
                ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                connectionStatus === 'ONLINE'
                  ? 'bg-green-500 animate-pulse'
                  : connectionStatus === 'CONNECTING'
                  ? 'bg-yellow-500 animate-ping'
                  : 'bg-red-500'
              }`} />
              <span className="text-xs font-medium">
                {connectionStatus}
              </span>
            </div>
          </div>
        </div>

        {/* MQTT Config Form Drawer / Modal */}
        {showConfig && (
          <div className="bg-[rgba(0,31,63,0.5)] border border-[rgba(246,247,237,0.15)] rounded-2xl p-5 backdrop-blur-md space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center justify-between">
              <span>Pengaturan Kredensial & Broker MQTT</span>
              <button onClick={() => setShowConfig(false)} className="text-xs text-neutral-400 hover:text-white">Tutup ✕</button>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Host WebSocket Broker</label>
                <input
                  type="text"
                  value={mqttHost}
                  onChange={(e) => setMqttHost(e.target.value)}
                  className="w-full bg-black/40 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Topik (Topic)</label>
                <input
                  type="text"
                  value={mqttTopic}
                  onChange={(e) => setMqttTopic(e.target.value)}
                  className="w-full bg-black/40 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Username EMQX</label>
                <input
                  type="text"
                  value={mqttUsername}
                  onChange={(e) => setMqttUsername(e.target.value)}
                  className="w-full bg-black/40 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Password EMQX</label>
                <input
                  type="password"
                  value={mqttPassword}
                  onChange={(e) => setMqttPassword(e.target.value)}
                  className="w-full bg-black/40 border border-neutral-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-400 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  connectMQTT();
                  setShowConfig(false);
                }}
                className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-black font-semibold rounded-xl text-xs transition-all cursor-pointer"
              >
                Simpan & Hubungkan Ulang
              </button>
            </div>
          </div>
        )}

        {/* MQTT Connection Diagnostic Banner */}
        {connectionStatus !== 'ONLINE' && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-200/90 space-y-2">
            <div className="flex items-center justify-between font-semibold text-amber-400">
              <span>Status Koneksi MQTT: {connectionStatus}</span>
              <span className="font-mono bg-amber-500/20 px-2 py-0.5 rounded text-[11px]">{mqttHost}</span>
            </div>
            {connError && (
              <p className="text-red-400 font-mono bg-red-950/40 p-2 rounded border border-red-500/20">
                Error Log: {connError}
              </p>
            )}
            <p className="text-[11px] text-amber-300/80">
              💡 <strong>Panduan Troubleshooting:</strong>
              <br />
              1. Pastikan Anda sudah menambahkan Username (<code>{mqttUsername}</code>) & Password di menu <strong>Authentication</strong> pada dashboard EMQX Cloud.
              <br />
              2. Di browser, koneksi MQTT membutuhkan WebSocket over TLS (Port <strong>8084</strong> dengan URL <code>{mqttHost}</code>).
            </p>
          </div>
        )}

        {/* Top Indicators - Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Suhu Inti', value: `${sensorData.suhu_inti}°C`, icon: Thermometer, color: '#f87171' },
            { label: 'Kelembapan', value: `${sensorData.kelembapan}%`, icon: Droplets, color: '#60a5fa' },
            { label: 'Beban CPU', value: `${sensorData.beban_cpu}%`, icon: Cpu, color: C.lime },
            { label: 'Tegangan', value: `${sensorData.tegangan}V`, icon: Zap, color: '#fbbf24' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[rgba(0,31,63,0.3)] border border-[rgba(246,247,237,0.08)] rounded-2xl p-5 flex items-center gap-4"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              <div className="p-3 rounded-xl bg-[rgba(246,247,237,0.05)]">
                <item.icon size={24} color={item.color} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider" style={{ color: 'rgba(246,247,237,0.4)' }}>{item.label}</p>
                <p className="text-xl font-bold text-white mt-0.5">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* Chart Section - Spans 2 columns */}
          <motion.div
            className="lg:col-span-2 bg-[rgba(0,31,63,0.3)] border border-[rgba(246,247,237,0.08)] rounded-2xl p-6"
            style={{ backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-white mb-6">Tren Parameter</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(246,247,237,0.1)" vertical={false} />
                  <XAxis dataKey="time" stroke="rgba(246,247,237,0.3)" fontSize={12} tickLine={false} />
                  <YAxis stroke="rgba(246,247,237,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,31,63,0.9)', borderColor: 'rgba(246,247,237,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="beban" stroke={C.lime} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="suhu" stroke="#f87171" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Gauges Section - 1 column */}
          <motion.div
            className="bg-[rgba(0,31,63,0.3)] border border-[rgba(246,247,237,0.08)] rounded-2xl p-6"
            style={{ backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-white mb-6">Kapasitas Sistem</h2>
            <div className="grid grid-cols-2 gap-4">
              <Gauge value={sensorData.load} label="Load" color={C.lime} unit="%" />
              <Gauge value={sensorData.memory} label="Memory" color="#60a5fa" unit="%" />
              <Gauge value={sensorData.temp} label="Temp" color="#f87171" unit="°C" />
              <Gauge value={sensorData.network} label="Network" color="#fbbf24" unit="%" />
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
