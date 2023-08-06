"use client";

import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi"
import React from "react";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import {toast} from "react-hot-toast";

interface HeaderProps{
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const {user} = useUser();

    const handleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut();
        //reset song
        router.refresh();

        if(error){
            toast.error(error.message);
        }else{
            toast.success('Logout eseguito correttamente');
        }
    }
    return(
        <div className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-cyan-700
            p-6
        `,
            className
        )}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button 
                    className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    onClick={() => router.back()}>
                        <RxCaretLeft size={35} className="text-white"/>
                    </button>
                    <button 
                    className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    onClick={() => router.forward()}>
                        <RxCaretRight size={35} className="text-white"/>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome className="text-black" size={20}/>
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch className="text-black" size={20}/>
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user? (
                        <div className="flex gap-x-4 items-center">
                            <Button
                            onClick={handleLogout}
                            className="bg-white px-6 py-2">
                                Logout
                            </Button>
                            
                        </div>
                    ): (
                        <>
                            <div>
                                <Button 
                                onClick={authModal.onOpen}
                                className="bg-transparent text-neutral-300 font-medium">
                                    Iscriviti
                                </Button>
                            </div>
                            <div>
                                <Button 
                                onClick={authModal.onOpen}
                                className="bg-white px-6 py-2">
                                    Login
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;