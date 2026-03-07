import { useState } from 'react';
import { siteConfig } from '@/lib/config';

export function useContactForm() {
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            setStatus('error');
            return;
        }

        setStatus('submitting');

        try {
            const mailtoLink = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                `[Partnership] ${type || 'Kerjasama'} — ${company}`
            )}&body=${encodeURIComponent(`Perusahaan/Organisasi: ${company}\nEmail: ${email}\nJenis Kerjasama: ${type}\n\n${message}`)}`;
            
            window.location.href = mailtoLink;
            setStatus('success');
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };

    return {
        formData: { company, email, type, message },
        setters: { setCompany, setEmail, setType, setMessage },
        status,
        handleSubmit,
        isValid: company && validateEmail(email) && message
    };
}
