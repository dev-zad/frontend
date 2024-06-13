// import React from 'react';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { format } from 'date-fns';
// import { CalendarIcon } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar } from '@/components/ui/calendar';
// import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
// import toast from 'sonner';
// import { Input } from '@/components/ui/input';

// interface EventFormProps {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const FormSchema = z.object({
//   name: z.string().nonempty('Event name is required'),
//   date: z.date({ required_error: 'Event date is required' }),
//   description: z.string().nonempty('Event description is required'),
// });

// const EventForm: React.FC<EventFormProps> = ({ open, setOpen }) => {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   });
//   const onSubmit = async (data: z.infer<typeof FormSchema>) => {
//     try {
//       const response = await fetch('/api/events', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: data.name, date: data.date.toISOString(), description: data.description }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create event');
//       }

//       // Reset form and show success message
//       form.reset();
//       toast.success('Event created successfully');
//       setOpen(false); // Close the dialog on successful submission
//     } catch (error) {
//       console.error('Error creating event:', error);
//       toast.error({
//         title: 'Error',
//         description: 'Failed to create event. Please try again.',
//       });
//     }
//   };
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Join A Lifegroup</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <Input placeholder="Enter your email" {...field} />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <Input placeholder="Enter your name" {...field} />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="number"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Number</FormLabel>
//                   <Input placeholder="Enter your number" {...field} />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="gender"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Gender</FormLabel>
//                   <Controller
//                     name="gender"
//                     control={form.control}
//                     render={({ field }) => (
//                       <Select {...field} onValueChange={field.onChange}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a gender" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Male">Male</SelectItem>
//                           <SelectItem value="Female">Female</SelectItem>

//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="leader"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Leader</FormLabel>
//                   <Input placeholder="Enter leader's name" {...field} />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="tribe"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tribe</FormLabel>
//                   <Controller
//                     name="tribe"
//                     control={form.control}
//                     render={({ field }) => (
//                       <Select {...field} onValueChange={field.onChange}>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a tribe" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="WildFire">WildFire (Youth)</SelectItem>
//                           <SelectItem value="Catalyst">Catalyst (Young Pro)</SelectItem>
//                           <SelectItem value="Couples">Couples</SelectItem>
//                           <SelectItem value="Leading Ladies">Leading Ladies</SelectItem>
//                           <SelectItem value="Mentors">Mentors</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="message"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Message</FormLabel>
//                   <Textarea placeholder="Enter your message" {...field} />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">Submit</Button>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProfileFormContent;