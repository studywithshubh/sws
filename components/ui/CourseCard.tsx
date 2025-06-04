"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/app/config";

interface CourseCardProps {
    id: number;
    userId: string;
    title: string;
    imageUrl: string;
    notionUrl: string;
    price: number;
    discountedPrice?: number;
    couponCode?: string;
}

interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

declare global {
    interface Window {
        Razorpay: new (options: unknown) => { open: () => void };
    }
}

export const CourseCard = ({
    id,
    userId,
    title,
    imageUrl,
    notionUrl,
    price,
    discountedPrice,
    couponCode
}: CourseCardProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");

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
        if (isLoggedIn) {
            async function getUserData() {
                try {
                    setLoading(true);
                    const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/me`, {
                        withCredentials: true,
                    });
                    setEmail(response.data.finalUserData.email);
                    setUsername(response.data.finalUserData.username);
                    setContact(response.data.finalUserData.contactNumber);
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

    const handlePayment = async () => {
        setLoading(true);
        setError("");

        if (!isLoggedIn) {
            setError("Please login to purchase the course");
            setLoading(false);
            return;
        }

        try {
            // 1. Initiate payment with backend
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/sws/payment/initiate`,
                {
                    courseId: id,
                    userId: userId,
                    couponCode: couponCode || undefined
                },
                { withCredentials: true }
            );

            const { order, paymentId } = response.data;
            const finalAmount = discountedPrice || price;

            // 2. Load Razorpay script dynamically
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;

            script.onload = () => {
                // 3. Configure Razorpay options with user data
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
                    amount: finalAmount * 100, // Razorpay expects amount in paise
                    currency: 'INR',
                    name: 'Study With Shubh',
                    description: `Purchase: ${title}`,
                    order_id: order.id,
                    handler: async function (response: RazorpayPaymentResponse) {
                        try {
                            // 4. Verify payment with backend
                            await axios.post(
                                `${BACKEND_URL}/api/v1/sws/payment/verify/${paymentId}`,
                                {
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature
                                },
                                { withCredentials: true }
                            );

                            // 5. Redirect to dashboard on success
                            router.push('/dashboard');
                        } catch (err) {
                            setError('Payment verification failed. Please contact support.');
                            console.error(err);
                        }
                    },
                    prefill: {
                        name: username || 'Customer Name',
                        email: email || 'customer@example.com',
                        contact: contact || '9999999999'
                    },
                    theme: {
                        color: '#3399cc'
                    },
                    modal: {
                        ondismiss: function () {
                            setError('Payment was cancelled');
                        }
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            };

            script.onerror = () => {
                setError('Failed to load payment gateway. Please try again.');
                setLoading(false);
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Payment initiation failed');
            } else {
                setError('An unexpected error occurred.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="relative w-100 h-110 rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.02 }}
        >
            {/* Glassmorphism background effect */}
            <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-md border border-gray-700/30 rounded-2xl" />

            {/* Full image with gradient overlay */}
            <div className="relative h-56 w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-all duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                {couponCode && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {couponCode}
                    </div>
                )}
            </div>

            {/* Content area */}
            <div className="relative p-5 h-40 flex flex-col justify-between">
                {/* Title */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{title}</h3>
                </div>

                {/* Price and buttons */}
                <div className="space-y-4">
                    {/* Price display */}
                    <div className="flex items-center">
                        {discountedPrice ? (
                            <>
                                <span className="text-xl font-bold text-green-400">
                                    ₹{discountedPrice}
                                </span>
                                <span className="text-sm text-gray-300 line-through ml-2">
                                    ₹{price}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-white">
                                ₹{price}
                            </span>
                        )}
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="text-red-400 text-sm">{error}</div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Button
                            text="View Details"
                            variant="blue_variant"
                            onClick={() => window.open(notionUrl)}
                        />
                        <Button
                            text={loading ? "Processing..." : "Buy Now"}
                            variant="green_variant"
                            onClick={handlePayment}
                            disabled={loading || !isLoggedIn}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}