// services/getEvents.ts
import { Event } from '@/types/event';
import { parseISO, format } from 'date-fns';

export const getEvents = async (): Promise<Event[]> => {
    try {
        const response = await fetch('http://127.0.0.1:1337/api/events');
        const data = await response.json();

        return data.data.map((event: any) => ({
            id: event.id,
            name: event.attributes.name,
            date: format(parseISO(event.attributes.date), 'yyyy-MM-dd'),
            time: event.attributes.time,
            location: event.attributes.location,
            description: event.attributes.description,
            createdAt: event.attributes.createdAt,
            updatedAt: event.attributes.updatedAt,
            publishedAt: event.attributes.publishedAt,
        }));
    } catch (error) {
        console.error('Failed to fetch events:', error);

        return [];
    }
};
