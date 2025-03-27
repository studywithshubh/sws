"use client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from "./ui/Loader";
import { User } from "@/icons/User";
import { motion, AnimatePresence } from "framer-motion";

export const DashboardNavbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Check auth status
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/auth/user/session', {
                    withCredentials: true
                });
                setIsLoggedIn(response.status === 200);
            } catch (error) {
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuthStatus();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex justify-center items-center relative">
            <div className="w-290 cursor-pointer h-36 border-2 mt-2 border-blue-300 rounded-2xl flex flex-col md:flex-row md:justify-between items-center shadow-sm shadow-blue-200 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-500">
                <div onClick={() => router.push("/")}>
                    <Image
                        src="/swsLogo.png"
                        alt="SWS logo"
                        width={192}
                        height={192}
                        className="w-32 md:w-48"
                    />
                </div>

                <div className="mr-6 relative" ref={menuRef}>
                    <Button
                        text="Menu"
                        variant="general_1"
                        endIcon={<User />}
                        onClick={toggleMenu}
                    />

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-56 origin-top-right bg-slate-900 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                            >
                                <div className="px-1 py-1">
                                    {/* Space for menu items - Add your items here */}
                                    <div className="p-2 text-white hover:bg-gray-700 rounded-md cursor-pointer">
                                        Bookmarks
                                    </div>
                                    <div onClick={() => router.push("/courses")} className="p-2 text-white hover:bg-gray-700 rounded-md cursor-pointer">
                                        Buy a Course
                                    </div>
                                    <div className="p-2 text-white hover:bg-gray-700 rounded-md cursor-pointer">
                                        Settings
                                    </div>
                                    <div
                                        className="p-2 text-red-500 hover:bg-red-600 hover:text-black rounded-md cursor-pointer"
                                        onClick={async () => {
                                            await axios.post(
                                                'http://localhost:3001/api/v1/auth/user/logout',
                                                {},
                                                { withCredentials: true }
                                            );
                                            router.push('/signin');
                                        }}
                                    >
                                        Logout
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}