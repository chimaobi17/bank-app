import { Link, usePage } from '@inertiajs/react';
import { Home, CreditCard, Send, User, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import TransactionSuccessModal from '@/components/transaction-success-modal';

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Home', icon: Home, href: '/banking/dashboard' },
        { name: 'Cards', icon: CreditCard, href: '/banking/cards' },
        { name: 'Payments', icon: Send, href: '/banking/payments' },
        { name: 'Me', icon: User, href: '/settings/profile' },
    ];

    return (
        <div className="flex min-h-[100dvh] bg-background font-sans text-foreground selection:bg-primary/30 relative">
            <TransactionSuccessModal />

            {/* ═══ Desktop Sidebar (hidden on mobile) ═══ */}
            <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:min-h-screen lg:fixed lg:left-0 lg:top-0 lg:z-40 border-r border-border bg-card/40 backdrop-blur-xl">
                {/* Brand */}
                <div className="flex items-center gap-3 px-6 pt-8 pb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-800 text-sm font-black text-primary-foreground shadow-lg">
                        A
                    </div>
                    <span className="text-lg font-extrabold tracking-tight text-foreground">
                        Apex<span className="text-primary">Bank</span>
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1.5 px-3 flex-1">
                    {navItems.map((item) => {
                        const isActive = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
                                    isActive
                                        ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(124,58,237,0.08)]'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                <item.icon
                                    size={20}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                                <span className={`text-sm tracking-tight ${isActive ? 'font-black' : 'font-semibold'}`}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar footer */}
                <div className="px-6 py-6 border-t border-border">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        © 2026 ApexBank
                    </p>
                </div>
            </aside>

            {/* ═══ Mobile Sidebar Overlay ═══ */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                    <aside className="absolute left-0 top-0 h-full w-[260px] bg-card border-r border-border flex flex-col animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between px-6 pt-8 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-800 text-sm font-black text-primary-foreground shadow-lg">
                                    A
                                </div>
                                <span className="text-lg font-extrabold tracking-tight text-foreground">
                                    Apex<span className="text-primary">Bank</span>
                                </span>
                            </div>
                            <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
                                <X size={20} />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-1.5 px-3 flex-1">
                            {navItems.map((item) => {
                                const isActive = url.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
                                            isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        <span className={`text-sm tracking-tight ${isActive ? 'font-black' : 'font-semibold'}`}>
                                            {item.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>
                </div>
            )}

            {/* ═══ Main Content Area ═══ */}
            <div className="flex flex-1 flex-col items-center lg:ml-[260px]">
                {/* Mobile top bar with hamburger (hidden on desktop where sidebar is always visible) */}
                <div className="lg:hidden sticky top-0 z-30 flex w-full items-center justify-between px-5 py-3 bg-background/80 backdrop-blur-xl border-b border-border/50">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl bg-card border border-border hover:bg-muted transition-all active:scale-90"
                    >
                        <Menu size={20} className="text-foreground" />
                    </button>
                    <span className="text-sm font-extrabold tracking-tight text-foreground">
                        Apex<span className="text-primary">Bank</span>
                    </span>
                    <div className="w-10" /> {/* Spacer for symmetry */}
                </div>

                {/* Page content — mobile: full width, desktop: centered with max width */}
                <main className="flex w-full max-w-md lg:max-w-6xl flex-1 flex-col overflow-x-hidden pb-32 lg:pb-10 lg:px-6 xl:px-10">
                    {children}
                </main>
            </div>

            {/* ═══ Mobile Bottom Navigation (hidden on desktop) ═══ */}
            <div className="lg:hidden fixed bottom-0 z-50 flex w-full justify-center px-4 pb-6">
                <nav className="flex h-20 w-full max-w-[calc(28rem-2rem)] items-center justify-around rounded-[2.5rem] border border-border bg-card/60 shadow-2xl backdrop-blur-2xl [-webkit-backdrop-filter:blur(40px)] transition-all duration-500">
                    {navItems.map((item) => {
                        const isActive = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group relative flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-95 ${
                                    isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                <div className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 ${
                                    isActive ? 'bg-primary/10 shadow-[0_0_20px_rgba(124,58,237,0.15)]' : 'bg-transparent'
                                }`}>
                                    <item.icon 
                                        size={isActive ? 24 : 22} 
                                        strokeWidth={isActive ? 2.5 : 2} 
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {isActive && (
                                        <div className="absolute -top-1 right-0 h-1.5 w-1.5 rounded-full bg-primary" />
                                    )}
                                </div>
                                <span className={`text-[10px] font-semibold tracking-tighter uppercase transition-opacity duration-300 ${
                                    isActive ? 'opacity-100' : 'opacity-60'
                                }`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
