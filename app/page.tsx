"use client";
import { LandingComponents } from "@/components/LandingComponents";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Home() {

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

                <div className="flex justify-center mt-10">
                    <LandingComponents/>                
                </div>
            </div>


        </div>
    );
}