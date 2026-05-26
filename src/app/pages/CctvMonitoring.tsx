import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';
import { C, pageVariants } from '../components/constants';
import { VideoGrid, type CctvCamera } from '../components/cctv/VideoGrid';
import { VideoModal } from '../components/cctv/VideoModal';

export default function CctvMonitoring() {
  const [activeCamera, setActiveCamera] = useState<CctvCamera | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (customElements.get('video-rtc')) {
      setScriptReady(true);
      return;
    }

    import('../vendor/video-rtc.js')
      .then(({ VideoRTC }) => {
        if (!customElements.get('video-rtc')) {
          customElements.define('video-rtc', VideoRTC);
        }
        setScriptReady(true);
      })
      .catch((error) => {
        console.error('Failed to load video-rtc module:', error);
      });
  }, []);

  const cameras = useMemo<CctvCamera[]>(
    () =>
      Array.from({ length: 6 }, (_, index) => {
        const id = index + 1;
        return {
          id,
          label: `Kamera Area ${id}`,
          subSrc: `/go2rtc/api/ws?src=kamera_${id}_sub`,
          mainSrc: `/go2rtc/api/ws?src=kamera_${id}`,
        };
      }),
    [],
  );

  return (
    <motion.div className="p-4 md:p-8 min-h-full" variants={pageVariants}>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Activity color={C.lime} />
              Monitoring CCTV Industri
            </h1>
            <p className="text-sm mt-2" style={{ color: 'rgba(246,247,237,0.6)' }}>
              Pantau area produksi secara real-time dengan kualitas adaptif.
            </p>
          </div>
          <div className="px-4 py-2 rounded-full border border-[rgba(246,247,237,0.15)] bg-[rgba(0,31,63,0.45)] text-xs uppercase tracking-[0.2em] text-[rgba(246,247,237,0.6)]">
            Go2RTC WebRTC Stream
          </div>
        </div>

        <div
          className="rounded-3xl border border-[rgba(246,247,237,0.08)] bg-[rgba(0,31,63,0.3)] p-5 md:p-6"
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <VideoGrid cameras={cameras} onSelect={setActiveCamera} isReady={scriptReady} />
        </div>
      </div>

      <VideoModal camera={activeCamera} onClose={() => setActiveCamera(null)} isReady={scriptReady} />
    </motion.div>
  );
}
