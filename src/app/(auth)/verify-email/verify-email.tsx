import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const VerifyEmail = () => {
    const router = useRouter();
    const { token } = router.query;
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (token) {
            axios.get(`/verify-email?token=${token}`)
                .then(response => {
                    setMessage('Email verified successfully. You can now login.');
                })
                .catch(error => {
                    setMessage('Invalid or expired token.');
                });
        }
    }, [token]);

    return (
        <div>
            <h1>Email Verification</h1>
            <p>{message}</p>
        </div>
    );
};

export default VerifyEmail;
