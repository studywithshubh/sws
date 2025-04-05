"use client";
import { LandingComponents } from "@/components/LandingComponents";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ThanksForVisit } from "@/components/ui/Thanks-for-visit";
import { Camera } from "@/icons/Camera";
import { GraduationCap } from "@/icons/GraduationCap";
import { motion } from "framer-motion";
import { FaDatabase, FaCode, FaLaptopCode, FaServer, FaPython, FaSchool } from "react-icons/fa";
import Image from "next/image";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";

export default function Home() {
    const courses = [
        { name: "Computer Science", icon: <FaLaptopCode /> },
        { name: "Web Development", icon: <FaCode /> },
        { name: "Backend Development", icon: <FaServer /> },
        { name: "CBSE - CS, IP Courses", icon: <FaSchool /> },
        { name: "Python Programming", icon: <FaPython /> },
        { name: "MySQL & Databases", icon: <FaDatabase /> },
    ];

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

            <div className="relative z-10 text-white container mx-auto px-4 sm:px-6 lg:px-8">
                <Navbar />

                {/* Hero Section */}
                <section className="flex mt-5 md:mt-10 flex-col items-center justify-center">
                    <span className="tracking-tighter text-xl sm:text-2xl md:text-3xl text-center font-medium text-primary/80">
                        Welcome to
                    </span>
                    <h1 className="tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center font-bold my-2">
                        <span className="font-bold bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
                            Study
                        </span>{" "}
                        with{" "}
                        <span className="font-bold bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
                            Shubh
                        </span>
                    </h1>
                    <p className="mt-1 text-primary/80 text-center tracking-tight text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                        Master Coding & Tech with Us – Learn, Grow, Succeed!
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center mt-8 gap-3 sm:gap-4">
                        <Button text="Explore Courses" variant="blue_variant" endIcon={<GraduationCap />} onClick={() => {redirect("/courses")}} />
                        <Button text="Demo Lectures" variant="general_1" endIcon={<Camera />} onClick={() => { redirect("/demo") }}  />
                    </div>
                </section>

                <div className="flex justify-center mt-8 md:mt-10">
                    <LandingComponents />
                </div>

                {/* Courses Section */}
                <section className="text-center text-white mt-16 md:mt-20 px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 md:mb-10">
                        What You will Learn With Us
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
                        {courses.map((course, index) => (
                            <div key={index} className="bg-white/10 p-4 sm:p-6 flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl shadow-lg hover:bg-white/20 transition">
                                <div className="text-3xl sm:text-4xl text-blue-400">{course.icon}</div>
                                <div className="text-base sm:text-lg font-semibold text-white">
                                    {course.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-8 md:mt-10">
                        <Button text="Join Now" variant="red_variant" onClick={() => {redirect("/signup")} } />
                    </div>
                </section>

                {/* Founder Section */}
                <section className="flex flex-col md:flex-row justify-center mt-12 md:mt-16 items-center gap-6 md:gap-10 lg:gap-20 px-4">
                    <div className="hidden md:block">
                        <ThanksForVisit />
                    </div>

                    <div onClick={() => {window.open("https://imshubh.site")}} className="order-first md:order-none">
                        <Image 
                            src="/shubhImg.png" 
                            alt="SWS logo" 
                            width={100} 
                            height={100} 
                            className="cursor-pointer w-24 sm:w-32 md:w-64 lg:w-80"
                            priority
                        />
                    </div>

                    <div className="hidden md:block">
                        <ThanksForVisit />
                    </div>
                </section>

                <section className="flex items-center justify-center flex-col mt-6 md:mt-8">
                    <span className="tracking-tighter text-sm sm:text-base md:text-xl text-center font-medium text-primary/80">
                        Founder & Developer
                    </span>
                    <h1 className="cursor-pointer tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-bold my-1 sm:my-2">
                        <span className="font-bold bg-gradient-to-b from-blue-300 to-cyan-400 bg-clip-text text-transparent">
                            Shubhashish Chakraborty
                        </span>
                    </h1>
                </section>
                            
                <Footer/>
            </div>
        </div>
    );
}
