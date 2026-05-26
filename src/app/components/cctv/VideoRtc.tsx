import { useEffect, useRef } from 'react';

interface VideoRtcProps {
  src: string;
  className?: string;
}

export function VideoRtc({ src, className }: VideoRtcProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement & { src?: string } | null;
    if (!el) return;
    el.src = src;
  }, [src]);

  return <video-rtc ref={ref} className={className} />;
}
