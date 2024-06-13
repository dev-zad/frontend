// components/forms/ThreadForm.tsx
"use client";
import React from "react";
import { useFormState } from "react-dom";
import { createThreadAction } from "@/data/actions/thread-actions"; // You need to create this action
import { cn } from "@/lib/utils";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StrapiErrors } from "@/components/custom/StrapiErrors";

const INITIAL_STATE = {
    data: null,
    strapiErrors: null,
    message: null,
};

export function ThreadForm({ className }: { className?: string }) {
    const [formState, formAction] = useFormState(createThreadAction, INITIAL_STATE);

    return (
        <form action={formAction} className={cn("space-y-4", className)}>
            <Input id="title" name="title" placeholder="Title" required />
            <Textarea
                id="content"
                name="content"
                placeholder="Write your thread content here..."
                className="resize-none border rounded-md w-full h-[224px] p-2"
                required
            />
            <div className="flex justify-end">
                <SubmitButton text="Post Thread" loadingText="Posting..." />
            </div>
            <StrapiErrors error={formState?.strapiErrors} />
        </form>
    );
}
