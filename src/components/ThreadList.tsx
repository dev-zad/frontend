// components/ThreadList.tsx
import React from 'react';
import { Typography } from './Typography';

export interface Thread {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author: string; // Assuming author is a string based on the provided data structure
}

interface ThreadListProps {
  threads: Thread[];
}

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  return (
    <div className="rounded-lg bg-white w-full">
      <ul>
        {threads.map(thread => (
          <li key={thread.id} className="border-b border-gray-200 flex flex-col">
            <Typography variant='paragraph' >{thread.title}</Typography>
            <Typography variant='paragraph_md' >{thread.content}</Typography>

            {/* Display author if available */}
            {thread.author && (
              <Typography variant='paragraph' >Author: {thread.author}</Typography>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
