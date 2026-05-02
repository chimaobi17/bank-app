import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InertiaProvider } from '@/lib/inertia-mock';

// Lazy load pages to keep things fast
const Welcome = lazy(() => import('@/pages/welcome'));
const Landing = lazy(() => import('@/pages/landing'));
const Login = lazy(() => import('@/pages/auth/login'));
const Register = lazy(() => import('@/pages/auth/register'));
const Dashboard = lazy(() => import('@/pages/banking/dashboard'));

export function AppRouter() {
    return (
        <BrowserRouter>
            <InertiaProvider>
                <Suspense fallback={<div className="flex h-screen items-center justify-center bg-[#050505] text-amber-500">Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Welcome canRegister={true} stats={{ total_users: 0, total_accounts: 0, total_transactions: 0, total_volume: '0' }} />} />
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* Catch all */}
                        <Route path="*" element={<Welcome canRegister={true} stats={{ total_users: 0, total_accounts: 0, total_transactions: 0, total_volume: '0' }} />} />
                    </Routes>
                </Suspense>
            </InertiaProvider>
        </BrowserRouter>
    );
}
