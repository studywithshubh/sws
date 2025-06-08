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
import { useEffect } from "react";
import { User } from "@/icons/User";

// Type augmentation for Navigator
declare global {
    interface Navigator {
        brave?: {
            isBrave?: unknown;
        };
    }
}


export default function Home() {
    const courses = [
        { name: "Computer Science", icon: <FaLaptopCode /> },
        { name: "Web Development", icon: <FaCode /> },
        { name: "Backend Development", icon: <FaServer /> },
        { name: "CBSE - CS, IP Courses", icon: <FaSchool /> },
        { name: "Python Programming", icon: <FaPython /> },
        { name: "MySQL & Databases", icon: <FaDatabase /> },
    ];
    // Brave detection and alert
    useEffect(() => {
        const isBrave = navigator.brave !== undefined ||
            navigator.userAgent.includes('Brave');

        if (isBrave) {
            const alertDiv = document.createElement('div');
            alertDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                padding: 20px;
                background: #f0f3ff;
                border-left: 5px solid #4C6EF5;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                color: #333;
                line-height: 1.5;
            `;

            alertDiv.innerHTML = `
                <button style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    color: #666;
                " onclick="this.parentNode.remove()">×</button>
                <strong style="display: block; margin-bottom: 10px; color: #4C6EF5">
                    <svg width="18" height="18" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 8px;">
                        <path fill="#4C6EF5" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
                    </svg>
                    Brave Browser Settings Required
                </strong>
                <p>For login to work properly:</p>
                <ol style="padding-left: 20px; margin: 10px 0;">
                    <li>Click the <strong>Brave Shields icon</strong> (🦁) in address bar</li>
                    <li>Select <strong>"Advanced Controls"</strong></li>
                    <li>Under <strong>"Cookies"</strong>, choose <strong>"Allow all cookies"</strong></li>
                    <li><strong>Refresh</strong> the page</li>
                </ol>
                <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
                    <em>Note: You can re-enable shields after logging in.</em><br>
                    This is required because Brave blocks authentication cookies by default.
                </p>
            `;

            document.body.appendChild(alertDiv);
            setTimeout(() => alertDiv.remove(), 20 * 1000);
        }
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
                        <Button text="Explore Courses" variant="blue_variant" endIcon={<GraduationCap />} onClick={() => { redirect("/courses") }} />
                        <Button text="Demo Lectures" variant="general_1" endIcon={<Camera />} onClick={() => { redirect("/demo") }} />
                    </div>
                    <div className="mt-3">
                        <Button text="Explore the SWS Community (BETA)" variant="red_variant" endIcon={<User />} onClick={() => { redirect("/community") }} />
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
                        <Button text="Join Now" variant="red_variant" onClick={() => { redirect("/signup") }} />
                    </div>
                </section>

                {/* Founder Section */}
                <section className="flex flex-col md:flex-row justify-center mt-12 md:mt-16 items-center gap-6 md:gap-10 lg:gap-20 px-4">
                    <div className="hidden md:block">
                        <ThanksForVisit />
                    </div>

                    <div onClick={() => { window.open("https://imshubh.site") }} className="order-first md:order-none">
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

                <Footer />
            </div>
        </div>
    );
}
