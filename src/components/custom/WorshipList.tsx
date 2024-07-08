import React from 'react';
import { Typography } from '../Typography';
import { Worship } from './AudioPlayer';

interface WorshipListProps {
  worships: Worship[];
  onSelect: (worship: Worship) => void;
}

const WorshipList: React.FC<WorshipListProps> = ({ worships, onSelect }) => {
  return (
    <ul className="flex flex-col">
      {worships.map((worship) => (
        <li
          key={worship.id}
          className="flex flex-col cursor-pointer px-4 py-4 border-b border-gray-200 hover:bg-gray-100"
          onClick={() => onSelect(worship)}
        >
          <Typography variant='paragraph_md' className="text-lg font-semibold">
            {worship.title}
          </Typography>
          <Typography variant='paragraph_md' className="text-sm">
            {worship.date}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export default WorshipList;
