// src/components/custom/Waveform.tsx
import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveformProps {
  url: string;
}

const Waveform: React.FC<WaveformProps> = ({ url }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgb(200, 0, 200)',
        progressColor: 'rgb(100, 0, 100)',
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
      });

      wavesurfer.load(url);

      wavesurfer.once('interaction', () => {
        wavesurfer.play();
      });

      // Cleanup on unmount
      return () => wavesurfer.destroy();
    }
  }, [url]);

  return <div ref={waveformRef} className="waveform-container"></div>;
};

export default Waveform;
