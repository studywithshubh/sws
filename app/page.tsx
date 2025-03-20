"use client"
import { Github } from "@/icons/Github"

export default function Home() {


    return (
        <div className="bg-black flex flex-col justify-center items-center text-white h-screen">
            <div>
                <img className="hover:scale-110 cursor-pointer transition-all duration-300" src="SWS.png" width="250" alt="swsLogo" />
            </div>
            <div className="md:text-5xl text-xl animate-bounce font-bold cursor-pointer">
                Website Under Development
            </div>
            <div className="md:text-2xl text-sm text-blue-400 font-bold cursor-pointer text-center">
            Join Our Courses to Master in Coding, Computer Science, Web Development, and in Tech & Beyond!

            </div>
            <div>
                <div className="bg-blue-700 p-2 mt-8 font-bold flex justify-center space-x-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-110">
                    <div>
                        <Github />
                    </div>
                    <div onClick={() => { window.open("https://github.com/studywithshubh") }}>
                        OpenSource
                    </div>
                </div>
            </div>
        </div>
    )
}
