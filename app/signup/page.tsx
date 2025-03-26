"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { EnterDoor } from "@/icons/EnterDoor"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Input } from "@/components/ui/Input";

export default function Signup() {
    return (
        <div className="relative min-h-screen bg-mainBgColor overflow-hidden">
            {/* Fixed glow effects - made smaller on mobile */}
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
                {/* navbar for signup page */}

                <div className="flex justify-center items-center">
                    <div className="w-290 cursor-pointer h-40 border-2 mt-2 border-blue-300 rounded-2xl flex flex-col md:justify-center items-center shadow-sm shadow-blue-200 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-500">
                        <div onClick={() => { redirect("/") }}>
                            <Image src="/swsLogo.png" alt="SWS logo" width={192} height={192} className="w-32 md:w-48" />
                        </div>

                        {/* <div>
                            <Button variant="general_1" text="Login" endIcon={<EnterDoor />} onClick={() => { redirect("/signin") }} />
                        </div> */}

                    </div>
                </div>

                <div className="mt-5">
                    <div className="mb-5">
                        <h1 className="cursor-pointer tracking-tighter text-xl md:text-3xl text-center font-bold my-1 sm:my-2">
                            <span className="font-bold bg-gradient-to-b from-blue-300 to-cyan-400 bg-clip-text text-transparent">
                                Create an Account on SWS
                            </span>
                        </h1>
                    </div>

                    <div className="flex cursor-pointer flex-col justify-center items-center">
                        <Input className="m-3 font-bold" type="text" placeholder="Username" />
                        <Input className="m-3 font-bold" type="email" placeholder="Email" />
                        <Input className="m-3 font-bold" type="text" placeholder="Contact Number" />
                        <Input className="m-3 font-bold" type="password" placeholder="Password" />
                    </div>
                    
                    <div className="flex justify-center">
                        <Button text="SignUp" variant="general_1" endIcon={<EnterDoor/>}/> 
                    </div>

                    <p className="text-white text-center mt-6">
                        Already have an account?{" "}
                        <span
                            onClick={() => redirect("/signin")}
                            className="text-blue-400 font-bold cursor-pointer hover:underline"
                        >
                            Login
                        </span>
                    </p>
                </div>

            </div>
        </div>
    )
}