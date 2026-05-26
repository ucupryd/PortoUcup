import { motion } from 'motion/react';
import { C } from '../constants';
import { VideoRtc } from './VideoRtc';

export interface CctvCamera {
  id: number;
  label: string;
  subSrc: string;
  mainSrc: string;
}

interface VideoGridProps {
  cameras: CctvCamera[];
  onSelect: (camera: CctvCamera) => void;
  isReady: boolean;
}

export function VideoGrid({ cameras, onSelect, isReady }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {cameras.map((camera, index) => (
        <motion.button
          key={camera.id}
          type="button"
          onClick={() => onSelect(camera)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group relative rounded-2xl overflow-hidden border border-[rgba(246,247,237,0.08)] bg-[rgba(0,31,63,0.35)] hover:border-[rgba(219,230,76,0.35)] transition-all"
          style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.25)', backdropFilter: 'blur(10px)' }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at 20% 20%, ${C.lime}1f 0%, transparent 55%)` }} />
          <div className="relative aspect-video">
            {isReady ? (
              <VideoRtc className="h-full w-full object-cover" src={camera.subSrc} />
            ) : (
              <div className="h-full w-full bg-[rgba(0,0,0,0.55)] flex items-center justify-center text-xs text-[rgba(246,247,237,0.6)]">
                Memuat stream...
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.35)] to-transparent text-left">
            <p className="text-sm font-semibold text-white tracking-wide">{camera.label}</p>
            <p className="text-xs text-[rgba(246,247,237,0.6)]">Klik untuk mode detail</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
