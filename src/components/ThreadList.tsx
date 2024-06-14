// components/ThreadList.tsx
import React, { useEffect, useState } from 'react';
import { Typography } from './Typography';

export interface Thread {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author: any; // Adjust this type as per your actual data structure
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
            <Typography variant='paragraph' className='py-2'>{thread.title}</Typography>
            <Typography variant='paragraph_md' className='py-2'>{thread.content}</Typography>
            <Typography variant='paragraph' className='py-2'>Created At: {new Date(thread.createdAt).toLocaleString()}</Typography>
            <Typography variant='paragraph' className='py-2'>Updated At: {new Date(thread.updatedAt).toLocaleString()}</Typography>
            <Typography variant='paragraph' className='py-2'>Published At: {new Date(thread.publishedAt).toLocaleString()}</Typography>
            {/* Example: Display author */}
            {thread.author && (
              <Typography variant='paragraph' className='py-2'>Author: {thread.author.name}</Typography>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
