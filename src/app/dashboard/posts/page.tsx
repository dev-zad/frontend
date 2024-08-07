
"use client";
import { useState, useEffect } from 'react';
import { ThreadForm } from "@/components/forms/ThreadForm";
import ThreadList, { Thread } from "@/components/ThreadList"; // Ensure you import the Thread interface if not already done
import { getThreadsLoader } from "@/data/services/get-threads-loader";

export default function PostsRoute() {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:1337/api/threads?populate=*');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setThreads(data.data.map((thread: any) => ({
          ...thread.attributes,
          id: thread.id, // Ensure you maintain the thread ID
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 px-20 py-10">
      <ThreadForm />
      <ThreadList threads={threads} />
    </div>
  );
}
