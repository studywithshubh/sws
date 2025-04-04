"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Back } from "@/icons/Back";
import { DemoLectureBox } from "@/components/ui/DemoLectureBox";


export default function Courses() {
    const router = useRouter();

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
                <Navbar />

                <div className="mt-10">
                    <Button text="Back" variant="general_1" startIcon={<Back />} onClick={() => router.push("/")} />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
                    Demo Lectures
                </h1>

                <div className="flex justify-center flex-wrap gap-4">
                    <DemoLectureBox
                        notesPdfUrl="https://drive.google.com/file/d/1XVlMoz-BfXrB_xoTRAE_aOjSEK3-GBKr/view?usp=drive_link"
                        title="Computer Science || python basics, conditional statements, Loops in Python, ForLoop, question practice"
                        videoDriveUrl="https://drive.google.com/file/d/1q6lRU48zNtMYA05deWeiynG4XnP7LSP_/preview"
                    />
                    <DemoLectureBox
                        title="All you Need Know to Get Started with Git & Github:"
                        videoDriveUrl="https://drive.google.com/file/d/15k11srcAQMlIlBvyqbEA2GViX8PwZ69W/preview"
                    />
                    <DemoLectureBox
                        title="Informatics Practices || Class-11th || Lecture-1: (1st September 2024)"
                        videoDriveUrl="https://drive.google.com/file/d/1dTLRRLJu2QH_xy5XIWmg_iX_JZqkwbSn/preview"
                    />
                    <DemoLectureBox
                        title="Informatics Practices || Class-11th || Lecture-2: (7th September 2024)"
                        videoDriveUrl="https://drive.google.com/file/d/1vGHhAwnKZ60TOlDlq3NIiDIs9xsdKdgd/preview"
                    />
                    <DemoLectureBox
                        title="Decimal Division Cases: || Class-11th || Computer Science:"
                        videoDriveUrl="https://drive.google.com/file/d/1HOeMjVsZ79-9TMLXxQA_TLZ_sqJZSZjq/preview"
                    />
                    <DemoLectureBox
                        title="Python-Math Expressions: || Class-11th || Computer Science:"
                        videoDriveUrl="https://drive.google.com/file/d/1NCD1jC_ofXvmeIZyidYvXNXpK1PTN7xB/preview"
                    />
                    <DemoLectureBox
                        title="Basics of Loops-For,While & Some Questions: || Class-11th || Computer Science:"
                        videoDriveUrl="https://drive.google.com/file/d/12IBSOybGCFy56g_-_fu2mxOU_KirQECh/preview"
                    />
                    <DemoLectureBox
                        title="Short Demo for Computer Science Students"
                        videoDriveUrl="https://drive.google.com/file/d/1KC0Mijq9LKxgsgXhnY7BXnLcwaVMb2Ko/preview"
                    />
                    <DemoLectureBox
                        title="Download & Install MySQL on Windows"
                        videoDriveUrl="https://drive.google.com/file/d/19Xh04gThc_ZEdKy_Up8SLc43QxOpxc7w/preview"
                    />
                </div>
            </div>
        </div>
    )
}
