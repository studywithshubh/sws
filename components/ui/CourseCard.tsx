import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./button";

interface CourseCardProps {
    id: number;
    title: string;
    imageUrl: string;
    notionUrl: string;
    price: number;
    discountedPrice?: number;
    couponCode?: string;
}

export const CourseCard = ({
    id,
    title,
    imageUrl,
    notionUrl,
    price,
    discountedPrice,
    couponCode
}: CourseCardProps) => {

    return (
        <motion.div
            className="relative w-100 h-96 rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.02 }}
        >
            {/* Glassmorphism background effect */}
            <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-md border border-gray-700/30 rounded-2xl" />

            {/* Full image with gradient overlay */}
            <div className="relative h-56 w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-all duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                {couponCode && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {couponCode}
                    </div>
                )}
            </div>

            {/* Content area */}
            <div className="relative p-5 h-40 flex flex-col justify-between">
                {/* Title */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{title}</h3>
                </div>

                {/* Price and buttons */}
                <div className="space-y-4">
                    {/* Price display */}
                    <div className="flex items-center">
                        {discountedPrice ? (
                            <>
                                <span className="text-xl font-bold text-green-400">
                                    ₹{discountedPrice}
                                </span>
                                <span className="text-sm text-gray-300 line-through ml-2">
                                    ₹{price}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-white">
                                ₹{price}
                            </span>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Button
                            text="View Details"
                            variant="blue_variant"
                            onClick={() => window.open(notionUrl)}
                        />
                        <Button
                            text="Buy Now"
                            variant="green_variant"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}