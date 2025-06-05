"use client";
import { Button } from "@/components/ui/button";
import NotFoundPage from "@/components/ui/NotFoundPage";
import { Redirect } from "@/icons/Redirect";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="h-screen flex justify-center items-center">
            
            <div className="flex flex-col justify-center">
                <div className="">
                    <NotFoundPage />
                </div>

                <div className="flex justify-center">
                    <Button text="HOME" variant="blue_variant" endIcon={<Redirect />} onClick={() => router.push("/")} />
                </div>
            </div>
        </div>
    )
}