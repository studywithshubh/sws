"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { EnterDoor } from "@/icons/EnterDoor"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        contactNumber: '',
        password: ''
    });
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Show notification and auto-hide after delay
    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleSignup = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/api/v1/auth/user/signup', formData);
            showNotification(response.data.message || 'Signup successful! Please check your email for OTP.', 'success');
            setShowOtpInput(true);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showNotification(error.response?.data?.message || 'Signup failed. Please try again.', 'error');
            } else {
                showNotification('An unexpected error occurred.', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/api/v1/auth/user/verify-mail', {
                email: formData.email,
                otpEntered: otp
            });
            showNotification(response.data.message || 'Email verified successfully! Redirecting to login...', 'success');
            setTimeout(() => router.push('/signin'), 2000);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showNotification(error.response?.data?.message || 'OTP verification failed. Please try again.', 'error');
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

                <div className="mt-5">
                    <div className="mb-5">
                        <h1 className="cursor-pointer tracking-tighter text-xl md:text-3xl text-center font-bold my-1 sm:my-2">
                            <span className="font-bold bg-gradient-to-b from-blue-300 to-cyan-400 bg-clip-text text-transparent">
                                {showOtpInput ? 'Verify Your Email' : 'Create an Account on SWS'}
                            </span>
                        </h1>
                    </div>

                    {!showOtpInput ? (
                        /* Signup Form */
                        <div className="flex cursor-pointer flex-col justify-center items-center">
                            <Input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="m-3 font-bold"
                                type="text"
                                placeholder="Username"
                            />
                            <Input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="m-3 font-bold"
                                type="email"
                                placeholder="Email"
                            />
                            <Input
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="m-3 font-bold"
                                type="text"
                                placeholder="Contact Number"
                            />
                            <Input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="m-3 font-bold"
                                type="password"
                                placeholder="Password"
                            />

                            <div className="flex justify-center">
                                <Button
                                    text={loading ? 'Signing Up...' : 'SignUp'}
                                    variant="general_1"
                                    endIcon={loading ? null : <EnterDoor />}
                                    onClick={handleSignup}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    ) : (
                        /* OTP Verification Form */
                        <div className="flex flex-col justify-center items-center">
                            <p className="mb-4 text-center">
                                We&apos;ve sent an OTP to {formData.email}. Please enter it below:

                            </p>
                            <Input
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="m-3 font-bold"
                                type="text"
                                placeholder="Enter OTP"
                            />

                            <div className="flex justify-center">
                                <Button
                                    text={loading ? 'Verifying...' : 'Verify OTP'}
                                    variant="general_1"
                                    onClick={handleVerifyOtp}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    )}

                    {!showOtpInput && (
                        <p className="text-white text-center mt-6">
                            Already have an account?{" "}
                            <span
                                onClick={() => router.push("/signin")}
                                className="text-blue-400 font-bold cursor-pointer hover:underline"
                            >
                                Login
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}