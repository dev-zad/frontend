import { Button } from "@/components/ui/button";
import React from "react";

type ButtonProps = {
    label: string;
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LifeButton: React.FC<ButtonProps> = ({ label, variant, open, setOpen }) => {
    // Determine class based on variant
    // const buttonClass =
    //     variant === "outline"
    //         ? "border border-gray-500 text-gray-500 hover:bg-gray-100"
    //         : variant === "solid"
    //             ? "bg-blue-500 text-white hover:bg-blue-600"
    //             : "text-blue-500 hover:bg-blue-100";

    const handleClick = () => {
        setOpen(true); // Open the dialog
    };

    return (

        <Button variant={variant} onClick={handleClick}>{label}</Button>
    );
};

export default LifeButton;
