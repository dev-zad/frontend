
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
                const threadsData = await getThreadsLoader();
                setThreads(threadsData);
            } catch (error) {
                console.error('Failed to fetch threads:', error);
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
