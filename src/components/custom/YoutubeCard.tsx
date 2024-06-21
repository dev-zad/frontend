import React from 'react';

interface YouTubeCardProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
}

const YouTubeCard: React.FC<YouTubeCardProps> = ({ videoUrl, thumbnailUrl, title }) => {
  return (
    <div className="max-w-md mx-auto my-4 p-4 bg-white rounded shadow-md">
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <img src={thumbnailUrl} alt={title} className="mb-2 rounded-md" />
        <h2 className="text-xl font-bold">{title}</h2>
      </a>
    </div>
  );
};

export default YouTubeCard;
