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
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<mqtt.MqttClient | null>(null);

  useEffect(() => {
    // Connect to MQTT broker
    const client = mqtt.connect('wss://nee81eaa.ala.eu-central-1.emqxsl.com:8084/mqtt', {
      username: 'ucupryd',
      password: 'Ucup7($_$)',
    });

    clientRef.current = client;

    client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      setIsConnected(true);
      client.subscribe('mekatro/monitoring/sensor', (err) => {
        if (!err) {
          console.log('Subscribed to mekatro/monitoring/sensor');
        }
      });
    });

    client.on('message', (topic, message) => {
      if (topic === 'mekatro/monitoring/sensor') {
        try {
          const payload = JSON.parse(message.toString());
          setSensorData(payload);
          
          // Update chart data
          setChartData(prev => {
            const newData = [...prev.slice(1)];
            const now = new Date();
            newData.push({
              time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
              suhu: payload.suhu_inti,
              beban: payload.beban_cpu,
            });
            return newData;
          });
        } catch (error) {
          console.error('Failed to parse MQTT message:', error);
        }
      }
    });

    client.on('error', (err) => {
      console.error('MQTT connection error:', err);
      setIsConnected(false);
    });

    client.on('close', () => {
      setIsConnected(false);
    });

    return () => {
      if (clientRef.current) {
        clientRef.current.end();
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulating) {
      interval = setInterval(() => {
        const fakeData: SensorData = {
          suhu_inti: Math.floor(20 + Math.random() * 20),
          kelembapan: Math.floor(40 + Math.random() * 40),
          beban_cpu: Math.floor(10 + Math.random() * 80),
          tegangan: Math.floor(215 + Math.random() * 15),
          load: Math.floor(20 + Math.random() * 70),
          memory: Math.floor(50 + Math.random() * 40),
          temp: Math.floor(20 + Math.random() * 15),
          network: Math.floor(60 + Math.random() * 40),
        };
        
        if (clientRef.current && isConnected) {
          clientRef.current.publish('mekatro/monitoring/sensor', JSON.stringify(fakeData));
        }
      }, 2000);
    }
    
    return () => clearInterval(interval);
  }, [isSimulating, isConnected]);

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
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSimulation}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isSimulating 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' 
                  : 'bg-[rgba(246,247,237,0.05)] text-white border border-[rgba(246,247,237,0.1)] hover:bg-[rgba(246,247,237,0.1)]'
              }`}
            >
              {isSimulating ? <Square size={16} /> : <Play size={16} />}
              {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
            </button>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isConnected ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className={`text-xs font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>

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
