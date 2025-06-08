"use client";
import { Button } from "@/components/ui/button";
import { Back } from "@/icons/Back";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Image from "next/image";
import { Refresh } from "@/icons/Refresh";
import { Home } from "@/icons/Home";

interface User {
    username: string;
    email: string;
}

export default function Community() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<User[]>([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/data`, {
                    withCredentials: true
                });
                setUserData(response.data.finalUserArray);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllUsers();
    }, []);

    return (
        <div className="min-h-screen text-white bg-mainBgColor p-4">
            {/* Header */}
            <div className="flex justify-center items-center">
                <div className="w-full max-w-4xl cursor-pointer h-40 border-2 mt-2 border-blue-300 rounded-2xl flex flex-col md:flex-row md:justify-between items-center px-4 shadow-sm shadow-blue-200 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-500">
                    <div onClick={() => router.push("/")}>
                        <Image src="/swsLogo.png" alt="SWS logo" width={192} height={192} className="w-32 md:w-48" />
                    </div>

                    <div className="flex space-x-3">
                        <Button
                            text="Home"
                            variant="general_1"
                            startIcon={<Home />}
                            onClick={() => router.push("/")}
                        />
                        <Button
                            text="Refresh"
                            variant="blue_variant"
                            startIcon={<Refresh className="size-5" />}
                            onClick={() => window.location.reload()}
                        />
                    </div>
                </div>
            </div>

            {/* Back button */}
            <div className="mt-10 ml-10">
                <Button text="Back" variant="general_1" startIcon={<Back />} onClick={() => router.push("/")} />
            </div>

            {/* Users List */}
            <div className="mt-10 px-6 md:px-20">
                <h2 className="text-xl md:text-3xl cursor-pointer font-extrabold text-red-500 animate-pulse mb-4 text-center">WORKING ON IT, STAY TUNED!</h2>
                <h2 className="text-2xl cursor-pointer font-semibold mb-4 text-center">Community Members</h2>

                {loading ? (
                    <p className="text-center cursor-pointer text-2xl font-bold text-cyan-300">Loading...</p>
                ) : userData.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <div className="grid gap-4 cursor-pointer text-center">
                        {userData.map((user, index) => (
                            <div key={index} className="border border-gray-700 rounded-xl p-4 bg-gray-900 hover:bg-gray-800 transition">
                                <p><span className="font-bold">Username:</span> <span className="font-extrabold text-blue-100"> {user.username} </span></p>
                                <p><span className="font-bold">Email:</span> {user.email}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
