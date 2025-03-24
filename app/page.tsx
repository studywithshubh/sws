"use client";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Home() {

    return (
        <div className="relative min-h-screen bg-mainBgColor overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ duration: 1 }}
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-cyan-500/30 blur-[150px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/30 blur-[120px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1.6 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <div className="relative z-10 text-white">
                <Navbar/> 

                <div className="text-center font-bold mt-30 md:text-5xl text-2xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent decoration-purple-200 cursor-pointer hover:underline">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent decoration-TextCap2 cursor-pointer hover:underline">
                        LAUNCHING SOON !
                    </span>        
                </div>
            </div>
            
        </div>
    );
}