'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import Loader from "@/components/ui/Loader";
import { BACKEND_URL } from "../config";

export default function Dashboard() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [authChecked, setAuthChecked] = useState(false);

    // First check authentication
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // First verify session
                await axios.get(`${BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setAuthChecked(true);
            } catch (error) {
                console.error("Auth error:", error);
                router.push('/signin');
            }
        };
        checkAuth();
    }, [router]);

    // Then fetch data if authenticated
    useEffect(() => {
        if (!authChecked) return;

        const fetchData = async () => {
            try {
                // Make parallel requests
                const [coursesRes, userRes] = await Promise.all([
                    axios.get(`${BACKEND_URL}/api/v1/auth/user/my-courses`, {
                        withCredentials: true
                    }),
                    axios.get(`${BACKEND_URL}/api/v1/auth/user/me`, {
                        withCredentials: true
                    })
                ]);

                setCourses(coursesRes.data.userCourses);
                setUsername(userRes.data.finalUserData.username);
            } catch (error) {
                console.error("Data fetch error:", error);
                // If unauthorized, redirect to login
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    router.push('/signin');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [authChecked, router]);

    return (
        <div className="h-screen bg-dashboardBgColor text-white">
            <div>
                <DashboardNavbar/>
            </div>

            <div className="flex justify-start mt-10 text-xl ml-5 md:text-4xl">
                {loading ? <Loader/> : <div>welcome {username}!</div>}
            </div>

            <div>
                {JSON.stringify(courses)}
            </div>
        </div>
    );
}