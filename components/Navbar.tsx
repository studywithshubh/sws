"use client";

import { EnterDoor } from "@/icons/EnterDoor";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { DesktopScreen } from "@/icons/DesktopScreen";
import Loader from "./ui/Loader";
import { BACKEND_URL } from "@/app/config";
import GithubStar from "./ui/GithubStar";

export const Navbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/session`, { 
                    withCredentials: true
                });
                if (isMounted) setIsLoggedIn(response.status === 200);
            } catch (error) {
                if (isMounted) setIsLoggedIn(false);
                console.error("Auth Check Error:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        checkAuthStatus();
        return () => { isMounted = false }; // Cleanup function to prevent memory leaks
    }, []);

    const handleAuthAction = () => {
        router.push(isLoggedIn ? "/dashboard" : "/signin");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-20">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center p-2">
            <div className="w-full max-w-screen-lg cursor-pointer h-36 border-2 mt-2 border-blue-300 rounded-2xl flex flex-col md:flex-row md:justify-between items-center shadow-sm shadow-blue-200 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-500 p-4">
                {/* Logo */}
                <div onClick={() => router.push("/")} className="flex justify-center">
                    <Image 
                        src="/swsLogo.png" 
                        alt="SWS logo" 
                        width={192} 
                        height={192} 
                        className="w-32 md:w-48"
                        priority
                    />
                </div>

                {/* Right Section (GitHub + Auth Button) */}
                <div className="flex items-center space-x-6">
                    <div className="md:block hidden">
                        <GithubStar/>
                    </div>

                    {/* Login/Dashboard Button */}
                    <Button 
                        variant={isLoggedIn ? "purple_variant" : "blue_variant"} 
                        text={isLoggedIn ? "Dashboard" : "Login"} 
                        endIcon={isLoggedIn ? <DesktopScreen /> : <EnterDoor />} 
                        onClick={handleAuthAction}
                    />
                </div>
            </div>
        </div>
    );
};
