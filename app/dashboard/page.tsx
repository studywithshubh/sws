'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import Loader from "@/components/ui/Loader";

export default function Dashboard() {
    const router = useRouter();
    const [username , setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function getCourses() {
            try {
                const response = await axios.get("http://localhost:3001/api/v1/auth/user/my-courses" , {
                    withCredentials: true
                });
                setCourses(response.data.userCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        }
        getCourses();
    } , [])



    // Check authentication status on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:3001/api/v1/auth/user/session', {
                    withCredentials: true
                });
            } catch (error) {
                // If not authenticated, redirect to signin
                router.push('/signin');
                console.log(error);
            }
        };
        checkAuth();
    }, [router]);


    useEffect(() => {
        async function getUsername() {
            const response = await axios.get("http://localhost:3001/api/v1/auth/user/me" , {
                withCredentials: true
            });
            setUsername(response.data.finalUserData.username);
            setLoading(false);
        }
        getUsername();
    } , [])// get username on mounting itself!    

    return (
        <div className="h-screen bg-dashboardBgColor text-white">
            <div>
                <DashboardNavbar/>
            </div>

            <div className="flex justify-start mt-10 text-xl ml-5 md:text-4xl">
                {
                    loading ? (
                        <Loader/>
                    )
                    :
                    (   
                        <div>
                            welcome {username}!
                        </div>
                    )
                }
            </div>

            <div>
                {JSON.stringify(courses)}
            </div>
        </div>
    );
}