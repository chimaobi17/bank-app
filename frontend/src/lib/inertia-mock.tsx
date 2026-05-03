import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import api from './api';

// --- Types ---
interface InertiaPageProps {
    auth?: { user: any };
    errors?: Record<string, string>;
    [key: string]: any;
}

interface InertiaContextType {
    props: InertiaPageProps;
    setProps: (props: InertiaPageProps) => void;
}

// --- Context ---
const InertiaContext = createContext<InertiaContextType | undefined>(undefined);

export function usePage() {
    const context = useContext(InertiaContext);
    if (!context) throw new Error('usePage must be used within an InertiaProvider');
    return context;
}

// --- Components ---

export function Head({ title, children }: { title?: string; children?: React.ReactNode }) {
    useEffect(() => {
        if (title) document.title = title;
    }, [title]);
    return <>{children}</>;
}

export function Link({ href, children, ...props }: any) {
    if (href.startsWith('http') || href.startsWith('//')) {
        return <a href={href} {...props}>{children}</a>;
    }
    return <RouterLink to={href} {...props}>{children}</RouterLink>;
}

// --- Provider ---
export function InertiaProvider({ children }: { children: React.ReactNode }) {
    const [props, setProps] = useState<InertiaPageProps>({
        auth: { user: null },
        errors: {},
    });

    return (
        <InertiaContext.Provider value={{ props, setProps }}>
            {children}
        </InertiaContext.Provider>
    );
}

export function useForm(initialData: any = {}) {
    const [data, setData] = useState(initialData);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const post = async (url: string, options: any = {}) => {
        setProcessing(true);
        if (options.onStart) options.onStart();
        try {
            const response = await api.post(url, data);
            if (options.onSuccess) options.onSuccess(response);
        } catch (error: any) {
            const serverErrors = error.response?.data?.errors || { email: 'Failed to connect to the banking server.' };
            setErrors(serverErrors);
            if (options.onError) options.onError(serverErrors);
        } finally {
            setProcessing(false);
            if (options.onFinish) options.onFinish();
        }
    };

    return { 
        data, 
        setData, 
        post, 
        processing, 
        errors, 
        hasErrors: Object.keys(errors).length > 0,
        recentlySuccessful: false,
        wasSuccessful: false,
        reset: () => setData(initialData),
        clearErrors: () => setErrors({}),
        setError: (field: string, value: string) => setErrors(prev => ({ ...prev, [field]: value })),
    };
}

export function Form({ children, action, method = 'post', ...props }: any) {
    const form = useForm(props.data || {});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        form.setData(data);
        form.post(action);
    };

    return (
        <form onSubmit={handleSubmit} {...props}>
            {typeof children === 'function' ? children(form) : children}
        </form>
    );
}

// --- router-inertia helper ---
export const router = {
    visit: (url: string, options: any = {}) => {
        window.location.href = url; // Fallback
    },
    post: async (url: string, data: any, options: any = {}) => {
        try {
            const response = await api.post(url, data);
            if (options.onSuccess) options.onSuccess(response);
            return response;
        } catch (error: any) {
            if (options.onError) options.onError(error.response?.data?.errors);
            throw error;
        }
    },
};
