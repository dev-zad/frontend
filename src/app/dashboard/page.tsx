"use client";
import React, { useEffect, useState } from 'react';
import { fetchTithesData, fetchOfferingsData } from '@/lib/api';
import TithesAndOfferingsChart from '@/components/TithesAndOffering';
import { Typography } from '@/components/Typography';
import { ConnectsCard } from '@/components/custom/ConnectsCard';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';
import { getEvents } from '@/data/services/getEvents';
import { Event } from '@/types/event';
import { Card } from 'antd';
import ThreadList from '@/components/ThreadList'; // Ensure correct import path
import { Thread } from '@/components/ThreadList'; // Ensure correct import path

export default function DashboardRoute() {
  const [tithesData, setTithesData] = useState<{ label: string, date: string, value: number }[]>([]);
  const [offeringsData, setOfferingsData] = useState<{ label: string, date: string, value: number }[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [latestThreads, setLatestThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tithes = await fetchTithesData();
        const offerings = await fetchOfferingsData();
        const eventsData = await getEvents();
        setTithesData(tithes);
        setOfferingsData(offerings);
        setEvents(eventsData);

        const currentDate = new Date();
        const upcoming = eventsData.filter(event => new Date(event.date) > currentDate);
        setUpcomingEvents(upcoming.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLatestThreads = async () => {
      try {
        const response = await fetch('/api/threads');
        if (!response.ok) {
          throw new Error('Failed to fetch threads');
        }
        const data = await response.json();
        setLatestThreads(data.data); // Assuming API returns { data: threadList }
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchLatestThreads();
  }, []);

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
        className="relative flex lg:flex-row flex-col "
      >
        <div className="px-20 py-40">
          <Typography variant="h2">Dashboard</Typography>
          <div className='flex flex-row gap-4'>
            <TithesAndOfferingsChart tithesData={tithesData} offeringsData={offeringsData} />
            <ConnectsCard />
          </div>
          <div className='py-4 flex flex-row'>
            <Card className="px-4 py-4 bg-green-100 rounded-2xl">
              <Typography variant="paragraph" className='font-bold'>Upcoming Events</Typography>
              <ul className="divide-y">
                {upcomingEvents.map(event => (
                  <li key={event.id} className="py-2">
                    <div className="flex space-x-3">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-gray-900">{event.name}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                        {event.time && <p className="text-sm text-gray-500">Time: {event.time}</p>}
                        {event.location && <p className="text-sm text-gray-500">Location: {event.location}</p>}
                        <p className="text-sm text-gray-500">{event.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
            <div className='px-4'>
              <Card className="px-4 py-4 rounded-2xl">
                <Typography variant="paragraph" className='font-bold'>Latest Threads</Typography>
                <ThreadList threads={latestThreads} /> {/* Pass latestThreads to ThreadList */}
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
