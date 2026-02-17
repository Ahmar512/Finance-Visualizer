import { useEffect } from 'react';
import Rhinontech from '@rhinon/botsdk-test';

export default function Chatbot() {
    useEffect(() => {
        Rhinontech({
            app_id: '6NHE0R'
        });
    }, []);

    return null;
}