'use client';
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const router = useRouter();

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
            }
        };
        checkAuth();
    }, [router]);

    async function handleLogout() {
        try {
            const response = await axios.post(
                'http://localhost:3001/api/v1/auth/user/logout',
                {},
                { withCredentials: true }
            );
            
            // Redirect to signin page after successful logout
            router.push('/signin');
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally show error message to user
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <Button 
                text="Logout" 
                variant="red_variant" 
                onClick={handleLogout} 
            />
        </div>
    );
}