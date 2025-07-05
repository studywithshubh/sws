'use client';
import { Redirecting } from '@/components/RedirectingExternalLink';
import { useEffect } from 'react';

const PythonRedirect = () => {
    useEffect(() => {
        // Delay a bit just so the message can render
        const timer = setTimeout(() => {
            window.location.href =
                'https://chivalrous-hydrofoil-427.notion.site/Mission_Sem-1274a80d73c1809f886ae4565d969452';
        }, 100); // slight delay to ensure text renders

        return () => clearTimeout(timer);
    }, []);

    return <Redirecting />;
};

export default PythonRedirect;