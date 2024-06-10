import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Typography } from "../Typography"
import { ProfilePicture } from "./ProfilePicture"
import Link from "next/link"



export interface SelectedRow {
  original: {
    id: string;
    profile_picture?: string;
    name: string;
    date_of_birth: string;
    gender: string;
    number: string;
    // socialMedia: string;
    // socmedUsername: string;
  };
}

interface ModalProps {
  selectedRow: SelectedRow | null;
  isOpen: boolean; // Pass isOpen as a prop
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DialogDetails({ selectedRow, isOpen, setOpen }: ModalProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={isOpen}> {/* Open the dialog directly */}
      <DialogContent className="sm:max-w-[425px]">
        <div>
          <Button onClick={handleClose} className="absolute top-2 right-2">Close</Button>

          {selectedRow && (
            <div className=" h-[712px] bg-white rounded-2xl overflow-y-auto">
              {selectedRow.original.profile_picture ? (
                <ProfilePicture />
              ) : (
                <div className="w-24 h-24 rounded-full mb-4 mx-auto bg-white flex items-center justify-center">
                  No Image
                </div>
              )}
              <Typography variant="h5" className="flex items-center justify-center">
                {selectedRow.original.name}
              </Typography>
              <div className="py-2">
                <div className="flex flex-row items-center">
                  <img
                    src="/assets/BirthIcon.png"
                    alt="Birth icon"
                    className="w-12 h-12 mr-4"
                  />
                  <div className="flex flex-col">
                    <Typography variant="paragraph_md" className="mb-1 text-gray-500">
                      Date of Birth
                    </Typography>
                    <Typography variant="paragraph_sm" className="font-bold text-[#072635]">
                      {selectedRow.original.date_of_birth}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <div className="flex flex-row items-center">
                  <img
                    src="/assets/FemaleIcon.png"
                    alt="Gender icon"
                    className="w-12 h-12 mr-4"
                  />
                  <div className="flex flex-col">
                    <Typography variant="paragraph_md" className="">
                      Gender
                    </Typography>
                    <Typography variant="paragraph_md" className="font-bold text-[#072635]">
                      {selectedRow.original.gender}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <div className="flex flex-row items-center">
                  <img
                    src="/assets/PhoneIcon.png"
                    alt="Contact icon"
                    className="w-12 h-12 mr-4"
                  />
                  <div className="flex flex-col">
                    <Typography variant="paragraph_md" className="">
                      Contact Info
                    </Typography>
                    <Typography variant="paragraph_sm" className="font-bold text-[#072635]">
                      {selectedRow.original.number}
                    </Typography>
                  </div>
                </div>
              </div>
              {/* <div className="py-2"> */}
              {/* <div className="flex flex-row items-center"> */}
              {/* <img
                    src="/assets/PhoneIcon.png"
                    alt="Contact icon"
                    className="w-12 h-12 mr-4"
                  /> */}
              {/* <div className="flex flex-col">
                    <Typography variant="paragraph_md" className="">
                      {selectedRow.original.socialMedia}
                    </Typography>
                    <Typography variant="paragraph_sm" className="font-bold text-[#072635]">
                      <Link href={selectedRow.original.socmedUsername} >
                        {selectedRow.original.socmedUsername}
                      </Link>
                    </Typography>
                  </div> */}
              {/* </div> */}
              {/* </div> */}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
