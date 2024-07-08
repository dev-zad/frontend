import React, { useState } from 'react';
import { Typography } from '../Typography';
import WorshipList from './WorshipList';
import WorshipPlayer from './WorshipPlayer';

export interface Worship {
  id: number;
  title: string;
  date: string;
  audio: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    }[];
  };
}

interface WorshipListProps {
  worships: Worship[] | undefined;
}

const WorshipsPage: React.FC<WorshipListProps> = ({ worships }) => {
  const [selectedWorship, setSelectedWorship] = useState<Worship | null>(null);
  const safeWorships = worships || [];

  const handleSelectWorship = (worship: Worship) => {
    setSelectedWorship(worship);
  };

  return (
    <div className="rounded-lg bg-white w-full px-10 py-10">
      <div className="worship-container flex flex-col md:flex-row">
        <div className="worship-list-container md:w-1/3">
          <WorshipList worships={safeWorships} onSelect={handleSelectWorship} />
        </div>
        <div className="worship-player-container md:w-2/3 md:ml-6 mt-6 md:mt-0">
          {selectedWorship ? (
            <WorshipPlayer worship={selectedWorship} />
          ) : (
            <Typography variant='paragraph' className="text-center text-gray-500">
              Select a worship to play
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorshipsPage;
