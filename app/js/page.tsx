'use client';
import { Redirecting } from '@/components/RedirectingExternalLink';
import { useEffect } from 'react';

const PythonRedirect = () => {
    useEffect(() => {
        // Delay a bit just so the message can render
        const timer = setTimeout(() => {
            window.location.href =
                'https://shadowed-iris-240.notion.site/Javascript_Handbook_-_Roadmap-1d590d201bbb809aad2bdce1b88d2099';
        }, 100); // slight delay to ensure text renders

        return () => clearTimeout(timer);
    }, []);

    return <Redirecting />;
};

export default PythonRedirect;