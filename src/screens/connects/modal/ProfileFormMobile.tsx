import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ProfileFormContent from "./ProfileFormContent";

type ProfileFormDesktopProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ProfileFormMobile: React.FC<ProfileFormDesktopProps> = ({ open, setOpen }) => {
  return (
    <div className="flex items-center justify-center ">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">Join A Lifegroup</Button>
        </DrawerTrigger>
        <DrawerContent>
          {/* <ProfileFormContent /> */}
        </DrawerContent>
      </Drawer>
    </div>

  );
};

export default ProfileFormMobile;
