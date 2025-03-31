"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from "./ui/Loader";
import { User } from "@/icons/User";
import { motion, AnimatePresence } from "framer-motion";
import { BACKEND_URL } from "@/app/config";
import { Dropdown } from "@/icons/Dropdown";
import { Right } from "@/icons/Right";
import { Settings } from "@/icons/Settings";
import { Bookmark } from "@/icons/Bookmark";
import { GraduationCap } from "@/icons/GraduationCap";
import { Download } from "@/icons/Download";

export const DashboardNavbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [joined, setJoined] = useState("");
    const [contactNumber, setContactNumber] = useState("");


    console.log(`is there any error: ${error}`); // this is did for preventing the build error during deployment

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true,
                });
                setIsLoggedIn(response.status === 200);
            } catch (error) {
                console.error("Auth check failed:", error);
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // fetching user data from /me

    useEffect(() => {
        if (isLoggedIn) {
            async function getUserData() {
                try {
                    setLoading(true);
                    const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/me`, {
                        withCredentials: true,
                    });
                    setRole(response.data.finalUserData.role);
                    setEmail(response.data.finalUserData.email);
                    setUsername(response.data.finalUserData.username);
                    setJoined(response.data.finalUserData.userAddedAt.split("T")[0].split("-").reverse().join("-"));
                    setContactNumber(response.data.finalUserData.contactNumber);
                } catch (err) {
                    console.error("Failed to fetch user data:", err);
                    setError("Failed to fetch user data.");

                } finally {
                    setLoading(false);
                }
            }
            getUserData();
        }
    }, [isLoggedIn]);

    // useEffect(() => {
    //     async function getUserData() {
    //         try {
    //             setLoading(true); // Start loading
    //             const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/me`, {
    //                 withCredentials: true,
    //             });
    //             setRole(response.data.finalUserData.role);
    //             setEmail(response.data.finalUserData.email);
    //             setUsername(response.data.finalUserData.username);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setLoading(false); // Stop loading after success or failure
    //         }
    //     }
    //     getUserData();
    // }, [])

    // Logout function
    const handleLogout = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            router.push("/signin");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="flex justify-center items-center relative">
            <div className="w-290 cursor-pointer h-36 border-2 mt-2 border-blue-300 rounded-2xl flex flex-col md:flex-row md:justify-between items-center shadow-sm shadow-blue-200 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-500">
                {/* Logo */}
                <div onClick={() => router.push("/")}>
                    <Image src="/swsLogo.png" alt="SWS logo" width={192} height={192} className="w-32 md:w-48" />
                </div>

                {!loading ? (
                    <div className="md:text-2xl animate-bounce hover:underline">
                        Welcome {username}!
                    </div>
                ) : (
                    <div className="text-red-500">Not logged in</div>
                )}

                {/* Menu */}
                <div className="mr-6 relative" ref={menuRef}>
                    <Button text="Menu" variant="general_1" endIcon={<Dropdown />} onClick={() => setMenuOpen(!menuOpen)} />

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
                                    <div className="flex m-8 flex-col justify-center items-center space-x-3">
                                        <div className="flex justify-center space-x-2">
                                            <div>
                                                <User />
                                            </div>
                                            <div>
                                                {role}
                                            </div>
                                        </div>
                                        <div>
                                            {email}
                                        </div>
                                        <div className="text-gray-400">
                                            {contactNumber}
                                        </div>
                                    </div>
                                    <div className="p-2 text-white hover:bg-gray-700 rounded-md cursor-not-allowed flex transition-all duration-500"> <div className="mr-2"> <Bookmark/> </div> Bookmarks</div>
                                    <div className="p-2 text-white hover:bg-gray-700 rounded-md cursor-not-allowed flex transition-all duration-500"> <div className="mr-2"> <Download/> </div> Downloads</div>
                                    <div onClick={() => router.push("/courses")} className="p-2 text-white hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-500 flex">
                                        <div className="mr-2">
                                            <GraduationCap/>
                                        </div>
                                        Browse Courses
                                    </div>
                                    <div
                                        className="p-2 transition-all duration-500 text-white hover:bg-gray-700 rounded-md cursor-pointer flex justify-between items-center"
                                        onClick={() => setSettingsOpen(!settingsOpen)}
                                    >
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                                <Settings />
                                            </div>
                                            <div>
                                                Settings
                                            </div>
                                        </div>
                                        <Right/>
                                    </div>
                                    <div className="p-2 text-red-500 font-bold hover:bg-red-600 transition-all duration-500 hover:text-white rounded-md cursor-pointer" onClick={handleLogout}>
                                        Logout
                                    </div>
                                    <div className="mt-4 flex justify-center items-center text-gray-400">
                                        Member Since: {joined}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Settings Dropdown */}
                    <AnimatePresence>
                        {settingsOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-full top-0 mt-0 w-56 origin-top-right bg-slate-800 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                            >
                                <div className="px-4 py-3">
                                    <h3 className="text-lg font-medium text-white">Account Settings</h3>
                                </div>
                                <div className="px-4 py-2">
                                    <div className="pt-2 border-t border-gray-700">
                                        <button
                                            className="w-full text-left p-2 transition-all duration-500 text-white hover:bg-gray-700 rounded-md cursor-pointer"
                                            onClick={() => router.push("/forgot-password")}
                                        >
                                            Change Password
                                        </button>
                                        {/* <button className="w-full text-left p-2 text-white hover:bg-gray-700 rounded-md cursor-not-allowed opacity-50">
                                            Email Settings
                                        </button>
                                        <button className="w-full text-left p-2 text-white hover:bg-gray-700 rounded-md cursor-not-allowed opacity-50">
                                            Notification Preferences
                                        </button> */}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
