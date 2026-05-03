import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InertiaProvider } from '@/lib/inertia-mock';

import AuthLayout from '@/layouts/auth-layout';
import PublicLayout from '@/layouts/public-layout';
import AppLayout from '@/layouts/app-layout';

import Welcome from '@/pages/welcome';
import Landing from '@/pages/landing';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
const Dashboard = lazy(() => import('@/pages/banking/dashboard'));

export function AppRouter() {
    return (
        <BrowserRouter>
            <InertiaProvider>
                <Suspense fallback={<div className="flex h-screen items-center justify-center bg-[#050505] text-amber-500 font-bold tracking-widest animate-pulse">APEX BANK...</div>}>
                    <Routes>
                        <Route path="/" element={<Welcome canRegister={true} stats={{ total_users: 1240, total_accounts: 3150, total_transactions: 48900, total_volume: '150000000' }} />} />
                        <Route path="/landing" element={<Landing />} />
                        
                        {/* Auth Routes wrapped in AuthLayout */}
                        <Route path="/login" element={
                            <AuthLayout title="Sign In" description="Log in to your account">
                                <Login canResetPassword={true} canRegister={true} />
                            </AuthLayout>
                        } />
                        <Route path="/register" element={
                            <AuthLayout title="Create Account" description="Open a premium banking account">
                                <Register />
                            </AuthLayout>
                        } />

                        {/* Dashboard wrapped in AppLayout */}
                        <Route path="/dashboard" element={
                            <AppLayout>
                                <Dashboard />
                            </AppLayout>
                        } />

                        {/* Catch all */}
                        <Route path="*" element={<Welcome canRegister={true} stats={{ total_users: 1240, total_accounts: 3150, total_transactions: 48900, total_volume: '150000000' }} />} />
                    </Routes>
                </Suspense>
            </InertiaProvider>
        </BrowserRouter>
    );
}
