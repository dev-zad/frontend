import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createThreadAction } from "@/data/actions/thread-actions";
import { cn } from "@/lib/utils";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ThreadFormData = {
  title: string;
  content: string;
};

export const ThreadForm: React.FC<{ className?: string }> = ({ className }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ThreadFormData>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const onSubmit = async (data: ThreadFormData) => {
    try {
      const { message } = await createThreadAction(data);
      // Optionally handle success message or redirect
    } catch (error: unknown) {
      console.error('Failed to submit form:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Failed to create thread');
      } else {
        setErrorMessage('Failed to create thread');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <Input id="title" name="title" placeholder="Title" required />
      {errors.title && <p>{errors.title.message}</p>}
      <Textarea
        id="content"
        name="content"
        placeholder="Write your thread content here..."
        className="resize-none border rounded-md w-full h-[224px] p-2"
        required
      />
      {errors.content && <p>{errors.content.message}</p>}
      <div className="flex justify-end">
        <SubmitButton text="Post Thread" loadingText="Posting..." />
      </div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </form>
  );
};

export default ThreadForm;
