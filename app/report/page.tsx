'use client';
import { Redirecting } from '@/components/RedirectingExternalLink';
import { useEffect } from 'react';

const PythonRedirect = () => {
    useEffect(() => {
        // Delay a bit just so the message can render
        const timer = setTimeout(() => {
            window.location.href =
                'https://ethereal-screen-a66.notion.site/TechStudio-Rebuilding-Report-1dc282870ae380b5b0bfc4669b5ed7c2';
        }, 100); // slight delay to ensure text renders

        return () => clearTimeout(timer);
    }, []);

    return <Redirecting />;
};

export default PythonRedirect;