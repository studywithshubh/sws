"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Navbar } from "@/components/Navbar";
import { Back } from "@/icons/Back";

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1: email input, 2: OTP and new password
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleSendOtp = async () => {
        if (!email) {
            showNotification('Please enter your email', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/user/send-otp-for-forgot-password`, { email });
            showNotification(response.data.message, 'success');
            setStep(2);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showNotification(error.response?.data?.message || 'Something went wrong. Please try again later.', 'error');
            } else {
                showNotification('An unexpected error occurred.', 'error');
            }
            // const errorMessage = error.response?.data?.message || "Something went wrong. Please try again later.";
            // showNotification(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!otp || !newPassword || !confirmPassword) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/user/reset-password`, {
                email,
                otpEntered: otp,
                newPassword
            });
            showNotification(response.data.message, 'success');
            setTimeout(() => router.push('/signin'), 2000);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showNotification(error.response?.data?.message || 'Something went wrong. Please try again later.', 'error');
            } else {
                showNotification('An unexpected error occurred.', 'error');
            }
            // const errorMessage = error.response?.data?.message || "Something went wrong. Please try again later.";
            // showNotification(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
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
                    className="absolute animate-pulse bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-pink-600/30 blur-[80px] md:blur-[150px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1.2 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute animate-pulse top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-cyan-500/20 blur-[60px] md:blur-[120px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 2.4 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute animate-pulse top-1/2 left-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-red-500/20 blur-[50px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <div className="relative z-10 text-white container mx-auto px-4 sm:px-6 lg:px-8">
                <Navbar />
                <div className="mt-10">
                    <Button text="Back" variant="general_1" startIcon={<Back />} onClick={() => router.push("/")} />
                </div>
                <div className="flex flex-col justify-center mt-10 space-y-10 items-center">


                    <div className="animate-pulse text-red-400 font-extrabold text-xl md:text-5xl">
                        Reset Your Password!
                    </div>

                    {step === 1 ? (
                        <div className="w-full flex justify-center items-center max-w-md space-y-4">
                            <div className="space-y-6">
                                <Input
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full font-bold"
                                    type="email"
                                    placeholder="Enter Your Email"
                                />
                                <div className="flex space-x-5">
                                    <Button
                                        onClick={handleSendOtp}
                                        disabled={loading}
                                        variant="blue_variant"
                                        text={loading ? 'Sending OTP...' : 'Send OTP'}
                                    >
                                    </Button>
                                    <Button
                                        text="Back to Login"
                                        variant="general_1"
                                        onClick={() => router.push('/signin')}
                                    >
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full max-w-md space-y-4">
                            <Input
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full font-bold"
                                placeholder="Enter OTP"
                            />
                            <Input
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full font-bold"
                                type="password"
                                placeholder="New Password"
                            />
                            <Input
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full font-bold"
                                type="password"
                                placeholder="Confirm New Password"
                            />
                            <Button
                                onClick={handleResetPassword}
                                disabled={loading}
                                variant="green_variant"
                                text={loading ? 'Resetting Password...' : 'Reset Password'}
                            >
                            </Button>
                            <Button
                                onClick={() => setStep(1)}
                                variant="general_1"
                                text="Back to Email"
                            >
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}