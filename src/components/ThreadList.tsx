// components/ThreadList.tsx
import React from 'react';
import { Typography } from './Typography';

export interface ImageData {
  id: number;
  attributes: {
    name: string;
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
      small: {
        url: string;
      };
      medium: {
        url: string;
      };
      large: {
        url: string;
      };
    };
  };
}
export interface Thread {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author: string;
  photo?: {
    data: ImageData[];
  };
  avatar?: {
    data: ImageData;
  };
}

interface ThreadListProps {
  threads: Thread[];
}

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  return (
    <div className="rounded-lg bg-white w-full">
      <ul>
        {threads.map(thread => (
          <li key={thread.id} className="border-b border-gray-200 flex flex-col px-20 py-10">
            <Typography variant='paragraph'>Title: <span>{thread.title}</span></Typography>
            <Typography variant='paragraph_md'>{thread.content}</Typography>

            {thread.author && (
              <Typography variant='paragraph'>Author: {thread.author}</Typography>
            )}

            {/* Display the avatar if available */}
            {thread.avatar?.data && (
              <img
                src={`http://127.0.0.1:1337${thread.avatar.data.attributes.formats.thumbnail.url}`}
                alt={thread.avatar.data.attributes.name}
                className="w-16 h-16 rounded-full"
              />
            )}

            {/* Display the photos if available */}
            {thread.photo?.data.map(photo => (
              <img
                key={photo.id}
                src={`http://127.0.0.1:1337${photo.attributes.formats.medium.url}`}
                alt={photo.attributes.name}
                className="mt-4 w-[100px] h-[100px]"
              />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
