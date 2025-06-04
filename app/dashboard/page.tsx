'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import { BACKEND_URL } from "../config";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Course {
    id: number;
    title: string;
    imageUrl?: string;
    notionUrl: string;
    price: number;
}

interface Content {
    id: number;
    type: 'folder' | 'file';
    title: string;
    description?: string;
    videoUrl?: string;
    notesUrl?: string;
    parentId?: number;
    children?: Content[];
}

interface UserCourse {
    course: Course;
    paymentStatus: string;
    assignedAt: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [courseContent, setCourseContent] = useState<Content[]>([]);
    const [currentPath, setCurrentPath] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);



    // Fetch user's courses
    useEffect(() => {
        const fetchUserCourses = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/my-courses`, {
                    withCredentials: true
                });
                setUserCourses(response.data.userCourses);
            } catch (error) {
                console.error("Failed to fetch user courses:", error);
                setError("Failed to load courses. Please Login!");
            } finally {
                setLoading(false);
            }
        };
        fetchUserCourses();
    }, []);

    // Fetch course content
    const fetchCourseContent = async (courseId: number) => {
        setLoading(true);
        try {
            // Get course details
            const courseRes = await axios.get(`${BACKEND_URL}/api/v1/courses/${courseId}`);
            setSelectedCourse(courseRes.data.COURSE);

            // Get course content structure
            const contentRes = await axios.get(`${BACKEND_URL}/api/v1/courses/${courseId}/content`);
            setCourseContent(contentRes.data.content || []);
            setCurrentPath([]);
        } catch (error) {
            console.error("Failed to fetch course content:", error);
            setError("Failed to load course content. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch folder content
    const fetchFolderContent = async (folderId: number) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/content/${folderId}/children`);

            // Update the course content structure with the new children
            setCourseContent(prev => {
                const updateContent = (contents: Content[]): Content[] => {
                    return contents.map(content => {
                        if (content.id === folderId) {
                            return { ...content, children: response.data.children };
                        }
                        if (content.children) {
                            return { ...content, children: updateContent(content.children) };
                        }
                        return content;
                    });
                };
                return updateContent(prev);
            });

            setCurrentPath([...currentPath, folderId]);
        } catch (error) {
            console.error("Failed to fetch folder content:", error);
            setError("Failed to load folder content. Please try again.");
        }
    };

    // Navigate back
    const navigateBack = () => {
        if (currentPath.length > 0) {
            setCurrentPath(currentPath.slice(0, -1));
        } else {
            setSelectedCourse(null);
        }
    };

    // Get current content based on path
    const getCurrentContent = () => {
        let content = courseContent;
        for (const id of currentPath) {
            const folder = content.find(c => c.id === id);
            if (folder?.children) {
                content = folder.children;
            } else {
                return [];
            }
        }
        return content;
    };

    // Render content item
    const renderContentItem = (item: Content) => {
        if (item.type === 'folder') {
            return (
                <div
                    key={item.id}
                    className="p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => fetchFolderContent(item.id)}
                >
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        {item.title}
                    </h3>
                    {item.description && <p className="text-gray-400 mt-1">{item.description}</p>}
                    {/* <div className="text-xs text-gray-500 mt-2">
            {item.children?.length || 0} items inside
          </div> */}
                    <div className="flex justify-center">
                        <Image src="/folderLogoImg.png" alt="folderImg" width="250" height="250" />
                    </div>
                </div>
            );
        } else {
            return (
                <div key={item.id} className="p-4 cursor-pointer hover:scale-105 transition-all duration-300 bg-slate-800 rounded-lg">
                    <h3 className="text-lg justify-center font-semibold flex items-center gap-2">
                        {item.videoUrl ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )}
                        {item.title}

                    </h3>
                    {item.description && <p className="text-gray-400 text-center mt-1">{item.description}</p>}

                    {item.videoUrl && (
                        <div className="mt-4 aspect-video bg-black rounded-lg overflow-hidden">
                            <iframe src={item.videoUrl} allowFullScreen className="w-full h-full border-none" sandbox="allow-same-origin allow-scripts" />
                        </div>
                    )}

                    {item.notesUrl && (
                        <div className="flex justify-center mt-4">
                            <Button variant="general_1" onClick={() => window.open(item.notesUrl)} text="Notes" />
                        </div>
                        // <div className="mt-4 h-64 bg-gray-900 rounded-lg overflow-hidden">
                        //   <iframe
                        //     src={item.notesUrl}
                        //     className="w-full h-full border-none"
                        //     title={item.title}
                        //   />
                        // </div>
                    )}
                </div>
            );
        }
    };

    if (loading && !selectedCourse) {
        return (
            <div className="h-screen bg-dashboardBgColor text-white flex items-center justify-center">
                <div>Loading your dashboard...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen bg-dashboardBgColor text-white flex flex-col items-center justify-center">
                <div className="text-red-500 mb-4">{error}</div>
                <Button variant="purple_variant" onClick={() => { router.push("/signin") }} text="Sign In" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dashboardBgColor text-white">
            <DashboardNavbar />

            <div className="p-8">
                {!selectedCourse ? (
                    <>
                        {userCourses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center mt-20 space-y-8">
                                <h1 className="text-center md:text-3xl font-bold text-amber-200">
                                    You haven&apos;t Purchased any courses yet!
                                </h1>
                                <Button
                                    variant="purple_variant"
                                    onClick={() => router.push('/courses')}
                                    text="Buy a Course"
                                >
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold">Start Learning!</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {userCourses.map(({ course }) => (
                                        <div
                                            key={course.id}
                                            className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                                        // onClick={() => fetchCourseContent(course.id)}
                                        >
                                            <div onClick={() => fetchCourseContent(course.id)} className="h-60 mb-4 overflow-hidden rounded-lg bg-gray-700 flex items-center justify-center">
                                                {course.imageUrl ? (
                                                    <Image
                                                        src={course.imageUrl}
                                                        alt={course.title}
                                                        width="400"
                                                        height="300"
                                                    />
                                                ) : (
                                                    <div className="text-gray-400">No image available</div>
                                                )}
                                            </div>
                                            <h2 className="text-xl text-center font-bold">{course.title}</h2>

                                            <div className="flex justify-center mt-2 space-x-5">
                                                <Button variant="blue_variant" text="Open" onClick={() => { fetchCourseContent(course.id) }} />
                                                <Button variant="general_2" text="View Details" onClick={() => { window.open(course.notionUrl) }} />
                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>
                        )}
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={navigateBack}
                                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {currentPath.length > 0 ? 'Back' : 'All Courses'}
                            </button>
                            <h1 className="text-2xl font-bold">{selectedCourse.title}</h1>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div>Loading content...</div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {getCurrentContent().length > 0 ? (
                                    getCurrentContent().map(renderContentItem)
                                ) : (
                                    <div className="col-span-full text-center py-10 text-gray-400">
                                        {currentPath.length > 0 ? 'This folder is empty' : 'Lectures Coming Soon!!'}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}