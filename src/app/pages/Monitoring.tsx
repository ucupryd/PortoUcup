import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Cpu, Zap, Activity } from 'lucide-react';
import { C, pageVariants } from '../components/constants';

// Dummy data for charts
const generateData = () => {
  return Array.from({ length: 15 }).map((_, i) => ({
    time: `10:${i.toString().padStart(2, '0')}`,
    suhu: 20 + Math.random() * 15,
    beban: 40 + Math.random() * 50,
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
  const [data, setData] = useState(generateData());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = prev[prev.length - 1].time;
        const [h, m] = lastTime.split(':').map(Number);
        const nextM = (m + 1) % 60;
        newData.push({
          time: `${h}:${nextM.toString().padStart(2, '0')}`,
          suhu: 20 + Math.random() * 15,
          beban: 40 + Math.random() * 50,
        });
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-400">ONLINE</span>
          </div>
        </div>

        {/* Top Indicators - Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Suhu Inti', value: '34°C', icon: Thermometer, color: '#f87171' },
            { label: 'Kelembapan', value: '62%', icon: Droplets, color: '#60a5fa' },
            { label: 'Beban CPU', value: '45%', icon: Cpu, color: C.lime },
            { label: 'Tegangan', value: '220V', icon: Zap, color: '#fbbf24' },
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
                <LineChart data={data}>
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
              <Gauge value={data[data.length-1].beban} label="Load" color={C.lime} unit="%" />
              <Gauge value={78} label="Memory" color="#60a5fa" unit="%" />
              <Gauge value={data[data.length-1].suhu} label="Temp" color="#f87171" unit="°C" />
              <Gauge value={92} label="Network" color="#fbbf24" unit="%" />
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
