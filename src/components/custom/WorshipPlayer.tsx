import React, { useState, useRef, useEffect } from 'react';
import { Typography } from '../Typography';
import WaveSurfer from 'wavesurfer.js';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Worship } from './AudioPlayer';
import { Calendar } from '@/components/ui/calendar';

interface WorshipPlayerProps {
  worship: Worship;
}

const WorshipPlayer: React.FC<WorshipPlayerProps> = ({ worship }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (worship.audio && worship.audio.data.length > 0) {
      setAudioUrl(worship.audio.data[0].attributes.url);
    }
  }, [worship]);

  useEffect(() => {
    if (waveformRef.current && audioUrl) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgb(200, 0, 200)',
        progressColor: 'rgb(100, 0, 100)',
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        backend: 'MediaElement'
      });

      ws.load(audioUrl);
      setWavesurfer(ws);

      return () => {
        ws.destroy();
      };
    }
  }, [audioUrl]);

  const handlePlay = () => {
    if (wavesurfer) {
      wavesurfer.play();
    }
  };

  const handlePause = () => {
    if (wavesurfer) {
      wavesurfer.pause();
    }
  };

  const handleSeek = (e: any) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    if (wavesurfer && isFinite(currentTime) && isFinite(duration)) {
      wavesurfer.seekTo(currentTime / duration);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `${worship.title.replace(/\s+/g, '-')}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="worship-player border-gray-200 flex flex-col py-10 px-4 mb-6 bg-gray-50 rounded-lg">
      <Typography variant='paragraph' className="text-lg font-semibold mb-2 flex flex-col">
        <span>{worship.title}</span>
        <span className='text-sm'>{worship.date}</span>
      </Typography>
      {audioUrl ? (
        <div>
          <div ref={waveformRef} className="waveform-container mb-4"></div>
          <AudioPlayer
            src={audioUrl}
            className="w-full"
            layout="horizontal-reverse"
            customAdditionalControls={[]}
            customVolumeControls={[]}
            showJumpControls={false}
            onPlay={handlePlay}
            onPause={handlePause}
            onListen={handleSeek}
          />
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDownload}
            >
              Download Audio
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No audio available</p>
      )}
    </div>
  );
};

export default WorshipPlayer;
