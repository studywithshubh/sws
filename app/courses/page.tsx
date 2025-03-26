"use client";
import { useEffect, useState } from "react"
import axios from 'axios';
import { motion } from "framer-motion";
import { CourseCard } from "@/components/ui/CourseCard";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCourses() {
            try {
                const response = await axios.get("http://localhost:3001/api/v1/courses/all");
                setCourses(response.data.COURSES);
            } catch (error) {
                console.error("Error fetching courses:", error);
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
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
                    Explore Our Courses
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course: any) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                imageUrl={course.imageUrl}
                                description={course.description}
                                price={course.price}
                                discountedPrice={course.discountedPrice}
                                couponCode={course.couponCode}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}