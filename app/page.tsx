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
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1 }}
                    className="absolute animate-pulse bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-300/30 blur-[150px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute animate-pulse top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/30 blur-[120px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1.6 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute animate-pulse top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <div className="relative z-10 text-white">
                <Navbar />

                <div className="flex mt-5 flex-col items-center justify-center">
                    <span className="tracking-tighter text-2xl md:text-3xl text-center font-medium text-primary/80 ">
                        Welcome to
                    </span>
                    <h1 className="tracking-tighter text-6xl md:text-7xl xl:text-8xl text-center font-bold my-2">
                        <span className="font-bold bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
                            Study
                        </span>{" "}
                        with {" "}
                        <span className="font-bold bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
                            Shubh
                        </span>
                    </h1>
                </div>
                <p className="mt-1 text-primary/80 text-center tracking-tight md:text-lg">
                    Master Coding & Tech with Us – Learn, Grow, Succeed!
                </p>

                <div className="flex justify-center mt-10 space-x-4">
                    <Button text="Explore Courses" variant="blue_variant" endIcon={<GraduationCap />} />
                    <Button text="Demo Lectures" variant="general_1" endIcon={<Camera />} onClick={() => { window.open("https://studywithshubh.tech/demo") }} />
                </div>

                <div className="flex justify-center mt-10">
                    <LandingComponents />
                </div>


                <div>
                    <div className="text-center text-white mt-20 px-4 flex flex-col">
                        <h2 className="text-xl md:text-4xl font-bold text-white mb-10">
                            What Youll Learn With Us
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {courses.map((course, index) => (
                                <div key={index} className="bg-white/10 p-6 flex items-center gap-4 rounded-2xl shadow-lg hover:bg-white/20 transition">
                                    <div className="text-4xl text-blue-400">{course.icon}</div>
                                    <div className="text-lg font-semibold text-white">
                                        {course.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-10">
                        <Button text="View Courses" variant="purple_variant" />
                    </div>
                </div>

                <div className="flex space-x-40 justify-center mt-10 items-center">

                    <div className="">
                        <ThanksForVisit />
                    </div>

                    <div onClick={() => {window.open("https://shubhhere.vercel.app")}}>
                        <Image src="/shubhImg.png" alt="SWS logo" width={100} height={100} className="cursor-pointer w-32 md:w-80" />
                    </div>

                    <div className="">
                        <ThanksForVisit />
                    </div>
                </div>

                <div className="flex items-center justify-center flex-col">
                    <span className="tracking-tighter md:text-xl text-center font-medium text-primary/80 ">
                        Founder & Developer
                    </span>

                    <h1 className="cursor-pointer tracking-tighter md:text-4xl text-center font-bold my-2">
                        <span className="font-bold bg-gradient-to-b from-blue-300 to-cyan-400 bg-clip-text text-transparent">
                            Shubhashish Chakraborty
                        </span>
                    </h1>
                </div>
                            
                <div>
                    <Footer/>
                </div>
                        
            </div>
                            

        </div>
    );
}