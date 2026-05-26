import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { C } from '../constants';
import type { CctvCamera } from './VideoGrid';
import { VideoRtc } from './VideoRtc';

interface VideoModalProps {
  camera: CctvCamera | null;
  onClose: () => void;
  isReady: boolean;
}

export function VideoModal({ camera, onClose, isReady }: VideoModalProps) {
  return (
    <AnimatePresence>
      {camera ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute inset-0 bg-[rgba(0,12,24,0.75)] backdrop-blur-sm"
            aria-label="Close CCTV modal"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={camera.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-[min(92vw,1100px)] rounded-3xl border border-[rgba(246,247,237,0.12)] bg-[rgba(0,31,63,0.65)] overflow-hidden"
            style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(246,247,237,0.08)]">
              <div>
                <p className="text-sm uppercase tracking-[0.2em]" style={{ color: 'rgba(246,247,237,0.6)' }}>Live View</p>
                <h2 className="text-lg font-semibold text-white">{camera.label}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full border border-[rgba(246,247,237,0.15)] text-white hover:text-[rgba(219,230,76,0.9)] hover:border-[rgba(219,230,76,0.5)] transition"
                aria-label="Close"
              >
                <X size={18} color={C.lime} />
              </button>
            </div>
            <div className="p-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-[rgba(246,247,237,0.08)] bg-black">
                {isReady ? (
                  <VideoRtc className="h-full w-full object-cover" src={camera.mainSrc} />
                ) : (
                  <div className="h-full w-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center text-xs text-[rgba(246,247,237,0.6)]">
                    Memuat stream utama...
                  </div>
                )}
              </div>
              <p className="mt-4 text-xs text-[rgba(246,247,237,0.6)]">Streaming kualitas utama. Klik di luar panel untuk keluar.</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
