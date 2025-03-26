import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";

interface CourseCardProps {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    discountedPrice?: number;
    couponCode?: string;
}

export const CourseCard = ({ 
    id,
    title, 
    imageUrl, 
    description, 
    price, 
    discountedPrice,
    couponCode 
}: CourseCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div 
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
            whileHover={{ y: -5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500"
                    style={{
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                />
                {couponCode && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {couponCode}
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>
                
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        {discountedPrice ? (
                            <>
                                <span className="text-lg font-bold text-green-400">
                                    ₹{discountedPrice}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    ₹{price}
                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-bold">
                                ₹{price}
                            </span>
                        )}
                    </div>

                    <Button text="Buy Now" variant="blue_variant" />
                </div>
            </div>
        </motion.div>
    )
}