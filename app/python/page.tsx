'use client';
import { Redirecting } from '@/components/RedirectingExternalLink';
import { useEffect } from 'react';

const PythonRedirect = () => {
    useEffect(() => {
        // Delay a bit just so the message can render
        const timer = setTimeout(() => {
            window.location.href =
                'https://shadowed-iris-240.notion.site/Python_Handbook_-_Roadmap-1d290d201bbb80e5bed8e312d9ed5707';
        }, 100); // slight delay to ensure text renders

        return () => clearTimeout(timer);
    }, []);

    return <Redirecting />;
};

export default PythonRedirect;