'use client';
import { Redirecting } from '@/components/RedirectingExternalLink';
import { useEffect } from 'react';

const PythonRedirect = () => {
    useEffect(() => {
        // Delay a bit just so the message can render
        const timer = setTimeout(() => {
            window.location.href =
                'https://chivalrous-hydrofoil-427.notion.site/Build-Deploy-TypeScript-NodeJS-Backend-19c4a80d73c18007af45c277cec4f5a0';
        }, 100); // slight delay to ensure text renders

        return () => clearTimeout(timer);
    }, []);

    return <Redirecting />;
};

export default PythonRedirect;