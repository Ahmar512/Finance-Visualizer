import { useEffect } from 'react';
import Rhinontech from '@rhinon/botsdk';

export default function Chatbot() {
    useEffect(() => {
        Rhinontech({
            app_id: 'EY69F8'
        });
    }, []);

    return null;
}