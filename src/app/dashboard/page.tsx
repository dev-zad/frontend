"use client";
import React, { useEffect, useState } from 'react';
import { fetchTithesData, fetchOfferingsData } from '@/lib/api';
import TithesAndOfferingsChart from '@/components/TithesAndOffering';
import { Typography } from '@/components/Typography';
import { ConnectsCard } from '@/components/custom/ConnectsCard';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { getEvents } from '@/data/services/getEvents';
import { Event } from '@/types/event'; // Import Event type
import { Card } from 'antd';
import ThreadList from '@/components/ThreadList';
import { Thread } from '@/components/ThreadList';
import { getThreadsLoader } from '@/data/services/get-threads-loader';

export default function DashboardRoute() {
  const [tithesData, setTithesData] = useState<{ label: string, date: string, value: number }[]>([]);
  const [offeringsData, setOfferingsData] = useState<{ label: string, date: string, value: number }[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]); // State for upcoming events
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const data = await getThreadsLoader();
        setThreads(data.data); // Assuming your API returns { data: threadList }
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tithes = await fetchTithesData();
        const offerings = await fetchOfferingsData();
        const eventsData = await getEvents();
        setTithesData(tithes);
        setOfferingsData(offerings);

        // Filter upcoming events (assuming upcoming means after the current date)
        const currentDate = new Date();
        const upcoming = eventsData.filter(event => new Date(event.date) > currentDate);
        setUpcomingEvents(upcoming.slice(0, 3)); // Take the first 3 upcoming events
      } catch (error) {
        console.error('Failed to fetch tithes, offerings, and events data:', error);
      }
    };

    fetchData();
  }, []);

  const truncate = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex lg:flex-row flex-col lg:py-0"
      >
        <div className="px-4 py-10">
          <Typography variant="h2">Dashboard</Typography>
          <div className='flex flex-row gap-4'>
            <TithesAndOfferingsChart tithesData={tithesData} offeringsData={offeringsData} />
            <ConnectsCard />
          </div>
          <div className='py-4 flex flex-row'>
            <Card className="px-4 py-4 bg-green-100 w-[542px] rounded-2xl">
              <Typography variant="paragraph" className='font-bold'>Upcoming Events</Typography>
              <ul className="divide-y">
                {upcomingEvents.map(event => (
                  <li key={event.id} className="py-2">
                    <div className="flex space-x-3">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-gray-900">{event.name}</p>
                        <p className="text-sm text-gray-500">{truncate(event.description, 100)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
            <div className='px-4'>
              <Card className="px-4 py-4 rounded-2xl">
                <Typography variant="paragraph" className='font-bold'>Latest Threads</Typography>
                <ThreadList threads={threads} />
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
