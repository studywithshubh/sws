"use client";
import { useEffect, useState } from "react"
import axios from 'axios';
import { motion } from "framer-motion";
import { CourseCard } from "@/components/ui/CourseCard";
import { Navbar } from "@/components/Navbar";
import { BACKEND_URL } from "../config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function getUserId() {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/v1/auth/user/session`,
                    { withCredentials: true }
                );
                setUserId(response.data.message.user.id);
            } catch (error) {
                console.error("Error fetching userId:", error);
            } finally {
                setLoading(false);
            }
        }
        getUserId();
    }, []);

    useEffect(() => {
        async function getCourses() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/courses/all`); 
                setCourses(response.data.COURSES || []);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        }
        getCourses();
    }, []);

    return (
        <div className="relative min-h-screen bg-mainBgColor overflow-hidden">
            {/* Fixed glow effects - made smaller on mobile */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1 }}
                    className="absolute animate-pulse bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-amber-300/30 blur-[80px] md:blur-[150px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1.2 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute animate-pulse top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-blue-500/20 blur-[60px] md:blur-[120px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 2.4 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute animate-pulse top-1/2 left-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-emerald-500/20 blur-[50px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <div className="relative z-10 text-white container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Navbar/>
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
                    Explore Our Courses
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                    </div>
                ) : courses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course: CourseCardProps) => (
                            <CourseCard
                                key={course.id}
                                userId={userId}
                                id={course.id}
                                title={course.title}
                                imageUrl={course.imageUrl}
                                notionUrl={course.notionUrl} 
                                price={course.price}
                                discountedPrice={course.discountedPrice}
                                couponCode={course.couponCode}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-300">
                            Courses Coming Soon!
                        </h2>
                        <p className="text-gray-400 text-center max-w-md">
                            We're working hard to bring you amazing learning content. 
                            Do join and Check back later.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <Button 
                                variant="red_variant" 
                                onClick={() => router.push('/signup')}
                                text="Join Now"
                            >
                            </Button>
                            <Button 
                                variant="general_1"
                                onClick={() => router.push('/')}
                                text="Return Home"
                            >
                                
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}