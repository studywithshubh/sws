import { Redirect } from "@/icons/Redirect";
import { Button } from "./button";

export const DemoLectureBox = ({ videoDriveUrl, title, notesPdfUrl }: {
    videoDriveUrl: string;
    title: string;
    notesPdfUrl?: string;
}) => {
    return (
        <div className="flex flex-col bg-slate-800 shadow-lg p-4 m-4 rounded-lg w-full max-w-xs sm:max-w-sm lg:max-w-md hover:-translate-y-2 transition-all duration-500 cursor-pointer">
            {/* Video Section */}
            <div className="mb-4 aspect-w-16 aspect-h-9">
                <iframe 
                    className="w-full h-full rounded-md" 
                    src={videoDriveUrl} 
                    frameBorder="0" 
                    allow="autoplay" 
                    allowFullScreen>
                </iframe>
            </div>
            {/* Title Section */}
            <div className="text-lg font-bold text-center text-cyan-400 mb-2">
                {title}
            </div>
            {/* Notes Button */}
            {notesPdfUrl && (
                <div className="flex justify-center">
                    <Button 
                        variant="general_1" 
                        text="Notes" 
                        endIcon={<Redirect />}
                        onClick={() => { window.open(notesPdfUrl) }}
                    />
                </div>
            )}
        </div>
    );
};