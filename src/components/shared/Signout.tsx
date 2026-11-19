// 'use client'
// import { authClient } from '@/lib/auth-client';
// import { redirect } from 'next/navigation';
// import React from 'react';

// const Signout = () => {

    
//     async function signOut() {
    
    
//       await authClient.signOut();
    
//       redirect("/");
//     }

"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "../ui/toast";
import { cn } from "cn";

type SignoutProps = {
  className?: string;
  labelClassName?: string;
  showIcon?: boolean;
};

const Signout = ({
  className,
  labelClassName,
  showIcon = false,
}: SignoutProps) => {
  const router = useRouter();

  const handleSignout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Logout failed:", error);
      return;
    }

    toast.add({
            title: `Logged Out!`,
            description: "You have logout successfully.",
          });

    router.replace("/signin");
    router.refresh();
  };

  return (
    <button
      type="button"
      aria-label="Logout"
      title="Logout"
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-[#dce9df] px-4 py-2 text-sm font-semibold text-[#102a24] transition-colors hover:border-[#166534] hover:text-[#166534]",
        className,
      )}
      onClick={handleSignout}
    >
      {showIcon && <LogOut aria-hidden="true" size={16} />}
      <span className={labelClassName}>Logout</span>
    </button>
  );
};

export default Signout;