"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { EnterDoor } from "@/icons/EnterDoor"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Back } from "@/icons/Back";
import GoogleBtn from "@/components/ui/GoogleAuthBtn";
import GithubBtn from "@/components/ui/GithubAuthBtn";

export default function Signin() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Show notification and auto-hide after delay
    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleSignin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/user/signin`, formData, {
                withCredentials: true // Important for cookie-based auth
            });

            showNotification(response.data.message || 'Login successful! Redirecting...', 'success');

            // Redirect to dashboard after 1 second
            setTimeout(() => router.push('/dashboard'), 1000);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showNotification(error.response?.data?.message || 'Login failed. Please try again.', 'error');
            } else {
                showNotification('An unexpected error occurred.', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="relative min-h-screen bg-mainBgColor overflow-hidden">
            {/* Notification Popup */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${notification.type === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                        }`}
                >
                    {notification.message}
                </motion.div>
            )}

            {/* Fixed glow effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1 }}
                    className="absolute animate-pulse bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-white/30 blur-[80px] md:blur-[150px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1.2 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute animate-pulse top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-purple-500/20 blur-[60px] md:blur-[120px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 2.4 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute animate-pulse top-1/2 left-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-orange-500/20 blur-[50px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <div className="relative z-10 text-white container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Logo Section */}
                <div className="flex justify-center items-center">
                    <div className="w-290 cursor-pointer h-40 border-2 mt-2 border-blue-300 rounded-2xl flex flex-col md:justify-center items-center shadow-sm shadow-blue-200 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-500">
                        <div onClick={() => router.push("/")}>
                            <Image src="/swsLogo.png" alt="SWS logo" width={192} height={192} className="w-32 md:w-48" />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <Button text="Back" variant="general_1" startIcon={<Back />} onClick={() => router.push("/")} />
                </div>
                <div className="mt-5">
                    <div className="mb-5">
                        <h1 className="cursor-pointer tracking-tighter text-xl md:text-3xl text-center font-bold my-1 sm:my-2">
                            <span className="font-bold bg-gradient-to-b from-blue-300 to-cyan-400 bg-clip-text text-transparent">
                                LogIn To Your Account
                            </span>
                        </h1>
                    </div>

                    <div className="flex cursor-pointer flex-col md:flex-row justify-center items-center">
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="m-3 font-bold"
                            type="email"
                            placeholder="Email"
                        />
                        <Input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="m-3 font-bold"
                            type="password"
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button
                            text={loading ? 'Logging In...' : 'LogIn'}
                            variant="general_1"
                            endIcon={loading ? null : <EnterDoor />}
                            onClick={handleSignin}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex justify-center mt-5 items-center">
                        <div className="flex justify-center items-center w-full cursor-pointer max-w-sm">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                            <span className="px-4 text-sm font-medium text-white">OR CONTINUE WITH</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        </div>
                    </div>

                    <div className="mt-5 flex justify-center flex-col items-center gap-5">
                        <GoogleBtn text="Sign in with Google" />
                        <GithubBtn text="Sign in with Github" />
                    </div>

                    <p className="text-white text-center mt-6">
                        Don&apos;t have an account?
                        {" "}
                        <span
                            onClick={() => router.push("/signup")}
                            className="text-blue-400 font-bold cursor-pointer hover:underline"
                        >
                            SignUp
                        </span>
                    </p>
                    <div className="flex justify-center transition-all duration-500 hover:text-blue-400 font-bold">
                        <div className="cursor-pointer" onClick={() => router.push("/forgot-password")}>
                            Forgot Password?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}