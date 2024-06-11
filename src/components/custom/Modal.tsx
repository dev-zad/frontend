import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { StrapiErrors } from "./StrapiErrors";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_STATE = {
  strapiErrors: null,
};

export function Modal({ isOpen, onClose }: ModalProps) {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    tribe: "",
    leader: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/submitForm", formData);
      console.log("Form submitted successfully:", response.data);
      setFormState(INITIAL_STATE);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error.response.data);
      setFormState({ ...INITIAL_STATE, strapiErrors: error.response.data });
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Request Form</CardTitle>
              <CardDescription>
                Please fill in the details to make a request.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tribe">Tribe</Label>
                <Input
                  id="tribe"
                  name="tribe"
                  type="text"
                  placeholder="Enter your tribe"
                  value={formData.tribe}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leader">Leader</Label>
                <Input
                  id="leader"
                  name="leader"
                  type="text"
                  placeholder="Enter your leader's name"
                  value={formData.leader}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <SubmitButton
                className="w-full"
                text="Submit"
                loadingText="Submitting"
              />
              <StrapiErrors error={formState?.strapiErrors} />
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={onClose}
              className="underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
