"use client";
import React, { useEffect, useState } from 'react';
import Calendar from '@/components/custom/Calendar';
import { getEvents } from '@/data/services/getEvents';
import { Event } from '@/types/event';


export default async function EventsRoute() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const fetchedEvents = await getEvents();
            setEvents(fetchedEvents);
        };

        fetchEvents();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
            <Calendar events={events} />
        </div>
    );
};