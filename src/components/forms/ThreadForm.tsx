// components/forms/ThreadForm.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Correct import for useForm
import { createThreadAction } from "@/data/actions/thread-actions";
import { cn } from "@/lib/utils";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StrapiErrors } from "@/components/custom/StrapiErrors";

type ThreadFormData = {
  title: string;
  content: string;
};

export const ThreadForm: React.FC<{ className?: string }> = ({ className }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ThreadFormData>();
  const [strapiErrors, setStrapiErrors] = useState<string | undefined>(undefined);

  const onSubmit = async (data: ThreadFormData) => {
    try {
      const { message, strapiErrors } = await createThreadAction(data);
      setStrapiErrors(strapiErrors);
    } catch (error) {
      console.error('Failed to submit form:', error);
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
    </form>
  );
};

export default ThreadForm;