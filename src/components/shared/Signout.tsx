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
import { toast } from "../ui/toast";

const Signout = () => {
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
        // <form action={signOut}>
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-lg border border-[#dce9df] px-4 py-2 text-sm font-semibold text-[#102a24] transition-colors hover:border-[#166534] hover:text-[#166534]"
                  onClick={handleSignout}
                >
                  Logout
                </button>
            //   </form>
    );
};

export default Signout;