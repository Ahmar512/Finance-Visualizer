import { useEffect } from 'react';
import Rhinontech from '@rhinon/botsdk';

export default function Chatbot() {
    useEffect(() => {
        Rhinontech({
            app_id: 'BT54ZG'
        });
    }, []);

    return null;
}