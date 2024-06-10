"use client";
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import ProfileFormDesktop from "./ProfileFormDesktop";
import ProfileFormMobile from "./ProfileFormMobile";

export function ProfileForm() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <ProfileFormDesktop open={open} setOpen={setOpen} />
  ) : (
    <ProfileFormMobile open={open} setOpen={setOpen} />
  );
}
