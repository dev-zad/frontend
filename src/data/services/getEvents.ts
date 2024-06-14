// services/getEvents.ts
import { Event } from '@/types/event';
import { parseISO, format } from 'date-fns';

export const getEvents = async (): Promise<Event[]> => {
    try {
        const response = await fetch('https://backend-49sv.onrender.com/api/events');
        const data = await response.json();

        return data.data.map((event: any) => ({
            id: event.id,
            name: event.attributes.name,
            date: format(parseISO(event.attributes.date), 'yyyy-MM-dd'), // Parse and format date to ensure consistency
            time: event.attributes.time ?? 'N/A',
            location: event.attributes.location ?? 'N/A',
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
