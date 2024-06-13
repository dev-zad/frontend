import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths, isBefore, parseISO } from 'date-fns';

import { Event } from '@/types/event';
import EventForm from '../forms/EventForm';
import { Button } from '@/components/ui/button';

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'Close' | 'Active' | 'Upcoming'>('Close');
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="flex justify-between items-center p-4 w-full">
        <div className="flex items-center">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            &lt;
          </button>
          <span className="mx-4 text-lg">{format(currentMonth, dateFormat)}</span>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            &gt;
          </button>
          <div className='px-2'>
            <Button variant="default" onClick={() => setIsEventFormOpen(true)}>
              Add
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    let day = startDate;
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isPast = isBefore(day, new Date()); // Check if day is before today
        days.push(
          <div
            key={day.toString()}
            className={`p-2 border rounded ${isSameMonth(day, currentMonth) ? '' : 'text-gray-400'} hover:bg-gray-100 cursor-pointer`} // Removed h-[100px], added hover:bg-gray-100 and cursor-pointer
          >
            {format(day, 'd')}
            {renderEvents(day)}
          </div>
        );
        day = addDays(day, 1);
      }
    }
    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  const renderEvents = (day: Date) => {
    let filteredEvents: Event[] = [];

    switch (activeTab) {
      case 'Close':
        filteredEvents = events.filter((event) => isSameDay(parseISO(event.date), day));
        break;
      case 'Active':
        filteredEvents = events.filter((event) => isSameDay(parseISO(event.date), day) && !isBefore(parseISO(event.date), new Date()));
        break;
      case 'Upcoming':
        filteredEvents = events.filter((event) => !isSameDay(parseISO(event.date), day) && isBefore(parseISO(event.date), new Date()));
        break;
      default:
        filteredEvents = [];
    }

    return (
      <div className="mt-2 space-y-2">
        {filteredEvents.map((event) => {
          const eventDate = parseISO(event.date);
          const isEventPast = isBefore(eventDate, new Date()); // Check if event date is before today
          const isExpanded = expandedEventId === event.id.toString();

          return (
            <div
              key={event.id}
              className={`bg-green-100 p-1 rounded-md ${isEventPast ? 'border border-red-500' : ''} hover:bg-green-200 cursor-pointer`} // Added hover:bg-green-200 and cursor-pointer
              onClick={() => handleEventClick(event.id.toString())}
            >
              <p className="text-xs font-bold">{event.name}</p>
              {event.time && <p className="text-xs">Time: {event.time}</p>}
              {event.location && <p className="text-xs">Location: {event.location}</p>}
              {isExpanded && (
                <p className="text-xs">{event.description}</p>
              )}
              {!isExpanded && (
                <p className="text-xs">{truncateText(event.description)}</p>
              )}
              {!isExpanded && (
                <p className="text-xs text-blue-500 cursor-pointer hover:underline"
                  onClick={(e) => handleExpandClick(e, event.id.toString())}>
                  Read more
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEvent(events.find((event) => event.id.toString() === eventId) || null);
  };

  const handleExpandClick = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, eventId: string) => {
    e.stopPropagation(); // Prevent event from bubbling to container (handleEventClick)
    setExpandedEventId(eventId);
  };



  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const truncateText = (text: string, maxLength = 50) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="calendar-container">
      {renderHeader()}
      <div className="days-header grid grid-cols-7">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
      </div>
      {renderDays()}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full ">
            <h2 className="text-lg font-semibold mb-2 ">{selectedEvent.name}</h2>
            {selectedEvent.time && <p>Time: {selectedEvent.time}</p>}
            {selectedEvent.location && <p>Location: {selectedEvent.location}</p>}
            <p>{selectedEvent.description}</p>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleCloseModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
      {/* Render EventForm as a modal */}
      {isEventFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <EventForm open={isEventFormOpen} setOpen={setIsEventFormOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
