'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const InfiniteMovingCards = ({
    items,
    // direction = 'left',
    // speed = 'normal',
    pauseOnHover = true,
    className,
}: {
    items: {
        imageUrl: string;
    }[];
    direction?: 'left' | 'right';
    speed?: 'fast' | 'normal' | 'slow';
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        function addAnimation() {
            if (containerRef.current && scrollerRef.current) {
                const scrollerContent = Array.from(scrollerRef.current.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    if (scrollerRef.current) {
                        scrollerRef.current.appendChild(duplicatedItem);
                    }
                });

                // getDirection();
                // getSpeed();
                setStart(true);
            }
        }
        addAnimation();
    }, []);

    // const getDirection = () => {
    //     if (containerRef.current) {
    //         containerRef.current.style.setProperty(
    //             '--animation-direction',
    //             direction === 'left' ? 'forwards' : 'reverse'
    //         );
    //     }
    // };

    // const getSpeed = () => {
    //     if (containerRef.current) {
    //         let duration;
    //         switch (speed) {
    //             case 'fast':
    //                 duration = '20s'; // Faster on mobile
    //                 break;
    //             case 'normal':
    //                 duration = '60s'; // Slower on mobile
    //                 break;
    //             case 'slow':
    //                 duration = '120s';
    //                 break;
    //             default:
    //                 duration = '60s';
    //         }
    //         containerRef.current.style.setProperty('--animation-duration', duration);
    //     }
    // };

    return (
        <div
            ref={containerRef}
            className={cn(
                'scroller relative z-20 w-full overflow-hidden',
                'max-w-full md:max-w-6xl lg:max-w-7xl mx-auto',
                '[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    'flex shrink-0 flex-nowrap gap-3 md:gap-4 py-4',
                    'w-max flex-nowrap',
                    start && 'animate-scroll',
                    pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
            >
                {items.map((item, idx) => (
                    <li
                        onClick={() => redirect(`/courses`)}
                        key={idx}
                        className="relative cursor-pointer w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[320px] flex-shrink-0 rounded-lg md:rounded-xl"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={`Card ${idx + 1}`}
                            width={320}
                            height={180}
                            className="w-full h-auto aspect-video rounded-lg md:rounded-xl border border-primary/10 md:border-2 object-cover transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 hover:border-primary/20"
                            sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 240px, (max-width: 1280px) 280px, 320px"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};