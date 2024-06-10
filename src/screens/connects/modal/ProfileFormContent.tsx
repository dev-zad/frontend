import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  name: z.string().min(1, {
    message: "Name cannot be empty.",
  }),
  number: z.string().min(1, {
    message: "Number cannot be empty.",
  }),
  gender: z.string().min(1, {
    message: "Gender cannot be empty.",
  }),
  leader: z.string().min(1, {
    message: "Leader cannot be empty.",
  }),
  tribe: z.string().min(1, {
    message: "Tribe cannot be empty.",
  }),
  message: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

type ProfileFormDesktopProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ProfileFormContent: React.FC<ProfileFormDesktopProps> = ({ open, setOpen }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      number: "",
      gender: "",
      leader: "",
      tribe: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Message sent successfully:', responseData);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Join A Lifegroup</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="Enter your email" {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Enter your name" {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <Input placeholder="Enter your number" {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Controller
                    name="gender"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>

                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leader"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leader</FormLabel>
                  <Input placeholder="Enter leader's name" {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tribe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tribe</FormLabel>
                  <Controller
                    name="tribe"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tribe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WildFire">WildFire (Youth)</SelectItem>
                          <SelectItem value="Catalyst">Catalyst (Young Pro)</SelectItem>
                          <SelectItem value="Couples">Couples</SelectItem>
                          <SelectItem value="Leading Ladies">Leading Ladies</SelectItem>
                          <SelectItem value="Mentors">Mentors</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <Textarea placeholder="Enter your message" {...field} />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileFormContent;