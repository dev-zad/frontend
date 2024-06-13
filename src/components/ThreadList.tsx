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
}

interface ThreadListProps {
  threads: Thread[];
}

const ThreadList: React.FC<ThreadListProps> = ({ threads: propThreads }) => {
  const [localThreads, setLocalThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch('/api/threads');
        if (!response.ok) {
          throw new Error('Failed to fetch threads');
        }
        const data = await response.json();
        setLocalThreads(data.data); // Assuming your API returns { data: threadList }
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="rounded-lg bg-white w-full">
      <ul>
        {propThreads.map(thread => (
          <li key={thread.id} className="border-b border-gray-200 flex flex-col">
            <Typography variant='paragraph' className='py-2'>{thread.title}</Typography>
            <Typography variant='paragraph_md' className='py-2'>{thread.content}</Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
