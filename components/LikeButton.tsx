"use client";

import { useRouter } from "next/navigation";
import {useSessionContext, supabaseClient} from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

interface LikeButtonProps{
    songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
    songId
}) => {
    const router = useRouter();
    const {supabaseClient} = useSessionContext();

    const authModal = useAuthModal();
    const {user} = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if(!user?.id){
            return;
        }

        const fetchData = async () => {
            const {data, error} = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single();

            if(!error && data){
                setIsLiked(true);
            }
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    return(
        <div>
            Bottone Like
        </div>
    );
}

export default LikeButton;