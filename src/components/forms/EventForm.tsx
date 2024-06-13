// EventForm.tsx
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast, Toaster } from 'sonner'; // Assuming 'sonner' is the library providing toast functionality

// Update the schema to include time and location
const FormSchema = z.object({
  name: z.string().nonempty('Event name is required'),
  date: z.date({ required_error: 'Event date is required' }),
  time: z.string().nonempty('Event time is required'),  // New time field
  location: z.string().nonempty('Event location is required'),  // New location field
  description: z.string().nonempty('Event description is required'),
});

interface EventFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventForm: React.FC<EventFormProps> = ({ open, setOpen }) => {
  const [eventCreated, setEventCreated] = useState(false); // State to track if event has been created
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          date: data.date.toISOString(),
          time: data.time,  // Include time in the request body
          location: data.location,  // Include location in the request body
          description: data.description
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      // Reset form and show success message
      form.reset();
      setEventCreated(true); // Set state to indicate event has been created
      toast.success("Message sent successfully!");

    } catch (error) {
      console.error('Error creating event:', error);
      toast.error("Message sent successfully!");

    }
  };

  // Close the form when the event is successfully created
  React.useEffect(() => {
    if (eventCreated) {
      setOpen(false);
    }
  }, [eventCreated, setOpen]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
          <CardDescription>Fill out the form below to create a new event</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col py-2">
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input {...field} id="name" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col py-2">
                <FormLabel>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()} // Disable dates before today
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* New time field */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col py-2">
                <FormLabel>Event Time</FormLabel>
                <FormControl>
                  <Input {...field} id="time" required type="time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* New location field */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col py-2">
                <FormLabel>Event Location</FormLabel>
                <FormControl>
                  <Input {...field} id="location" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col py-2">
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Textarea {...field} id="description" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default">
            Create Event
          </Button>
          <Toaster />
        </CardContent>
      </form>
    </Form>
  );
};

export default EventForm;
