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
import { Home } from "@/icons/Home";
import { Close } from "@/icons/Close";
import { MenuBars } from "@/icons/MenuBars";
import GithubStar from "./ui/GithubStar";

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
    // const [contactNumber, setContactNumber] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const avatarMenuRef = useRef<HTMLDivElement>(null);

    console.log(error);

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

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/avatar/get-avatar`, {
                    withCredentials: true,
                });
                if (response.data && response.data.url) {
                    setAvatar(response.data.url);
                }
                // if (response.data && response.data.url) {
                //     console.log("SDASDD")
                //     setAvatar(response.data.url);
                // }
            } catch (err) {
                console.error("Failed to fetch avatar:", err);
            }
        };

        if (isLoggedIn) {
            fetchAvatar();
        }
    }, [isLoggedIn]);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
                setSettingsOpen(false);
            }
            if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target as Node)) {
                setAvatarMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                    // setContactNumber(response.data.finalUserData.contactNumber);
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
        <div className="relative w-full">
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-md cursor-pointer bg-blue-600 text-white"
                >
                    {mobileMenuOpen ? <Close /> : <MenuBars />}
                </button>
            </div>

            {/* Main Navbar */}
            <div className="w-full px-4 py-2 border-b border-blue-300 bg-slate-900 lg:flex lg:justify-between lg:items-center">
                {/* Logo */}
                <div
                    onClick={() => router.push("/")}
                    className="flex items-center justify-center lg:justify-start cursor-pointer"
                >
                    <Image
                        src="/swsLogo.png"
                        alt="SWS logo"
                        width={192}
                        height={192}
                        className="w-32 lg:w-40"
                    />
                </div>

                {/* Welcome Message - Hidden on mobile */}
                <div className="hidden lg:block text-xl text-center animate-bounce hover:underline">
                    Welcome {username}!
                </div>

                <div className="md:block hidden">
                    <GithubStar />
                </div>

                {/* Avatar and Desktop Menu */}
                <div className="hidden lg:flex lg:items-center lg:space-x-4">
                    {/* Avatar Image */}
                    <div className="relative" ref={avatarMenuRef}>
                        <button
                            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                            className="flex cursor-pointer items-center justify-center w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 hover:border-blue-300 transition-colors"
                        >
                            {avatar ? (
                                <Image
                                    src={avatar}
                                    alt="User Avatar"
                                    width={40}
                                    height={40}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                    <User />
                                </div>
                            )}
                        </button>

                        {/* Avatar Dropdown Menu */}
                        <AnimatePresence>
                            {avatarMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                                >
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                router.push("/upload-avatar");
                                                setAvatarMenuOpen(false);
                                            }}
                                            className="block cursor-pointer w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                                        >
                                            Change Profile Image
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Main Menu Button */}
                    <div className="relative" ref={menuRef}>
                        <Button
                            text="Menu"
                            variant="general_1"
                            endIcon={<Dropdown />}
                            onClick={() => setMenuOpen(!menuOpen)}
                        />

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-56 bg-slate-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
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
                                            {/* <div className="text-gray-400">
                                                {contactNumber}
                                            </div> */}
                                        </div>
                                        <div onClick={() => router.push("/")} className="p-2 text-white hover:bg-gray-700 rounded-md cursor-pointer flex transition-all duration-500">
                                            <div className="mr-2"> <Home /> </div>
                                            Home
                                        </div>
                                        <div className="p-2 text-white hover:bg-gray-700 rounded-md cursor-not-allowed flex transition-all duration-500">
                                            <div className="mr-2"> <Bookmark /> </div>
                                            Bookmarks
                                        </div>
                                        <div className="p-2 text-white hover:bg-gray-700 rounded-md cursor-not-allowed flex transition-all duration-500">
                                            <div className="mr-2"> <Download /> </div>
                                            Downloads
                                        </div>
                                        <div onClick={() => router.push("/courses")} className="p-2 text-white hover:bg-gray-700 rounded-md cursor-pointer transition-all duration-500 flex">
                                            <div className="mr-2">
                                                <GraduationCap />
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
                                            <Right />
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
                                    className="absolute right-0 top-full mt-2 w-56 bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
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
                                            <button
                                                className="w-full text-left p-2 transition-all duration-500 text-white hover:bg-gray-700 rounded-md cursor-pointer"
                                                onClick={() => router.push("/upload-avatar")}
                                            >
                                                Upload Profile Image
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-slate-900 z-40 pt-16 px-4 overflow-y-auto lg:hidden"
                    >
                        <div className="flex cursor-pointer flex-col items-center mb-8">
                            <div className="flex items-center space-x-2 mb-2">
                                <User />
                                <span className="text-lg font-medium">{role}</span>
                            </div>
                            <div className="text-blue-300">{email}</div>
                            {/* <div className="text-gray-400">{contactNumber}</div> */}
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    router.push("/");
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full p-3 text-white hover:bg-gray-800 rounded-md flex items-center"
                            >
                                <div className="mr-2">
                                    <Home />
                                </div>
                                Home
                            </button>

                            <button
                                onClick={() => {
                                    router.push("/courses");
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full p-3 text-white hover:bg-gray-800 rounded-md flex items-center"
                            >
                                <div className="mr-2">
                                    <GraduationCap />
                                </div>
                                Browse Courses
                            </button>

                            <button
                                onClick={() => {
                                    router.push("/forgot-password");
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full p-3 text-white hover:bg-gray-800 rounded-md flex items-center"
                            >
                                <div className="mr-2">
                                    <Settings />
                                </div>
                                Change Password
                            </button>

                            <button
                                onClick={() => {
                                    router.push("/upload-avatar");
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full p-3 text-white hover:bg-gray-800 rounded-md flex items-center"
                            >
                                <div className="mr-2">
                                    <User />
                                </div>
                                Change Profile Image
                            </button>

                            <button
                                onClick={handleLogout}
                                className="w-full p-3 hover:text-white font-bold text-red-500 hover:bg-red-900 rounded-md flex items-center"
                            >
                                Logout
                            </button>
                        </div>


                        <div className="mt-8 text-center text-gray-500">
                            Member since: {joined}
                        </div>

                        <div className="flex justify-center mt-10">
                            <GithubStar />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};