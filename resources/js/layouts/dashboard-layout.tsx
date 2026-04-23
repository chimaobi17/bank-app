import { Link, usePage } from '@inertiajs/react';
import { Home, CreditCard, Send, User } from 'lucide-react';
import React from 'react';
import TransactionSuccessModal from '@/components/transaction-success-modal';

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    const { url } = usePage();

    const navItems = [
        { name: 'Home', icon: Home, href: '/banking/dashboard' },
        { name: 'Cards', icon: CreditCard, href: '/banking/cards' },
        { name: 'Payments', icon: Send, href: '/banking/payments' },
        { name: 'Me', icon: User, href: '/settings/profile' },
    ];

    return (
        <div className="flex min-h-[100dvh] flex-col items-center bg-background font-sans text-foreground selection:bg-primary/30 relative">
            <TransactionSuccessModal />
            {/* Mobile Viewport Container */}
            <main className="flex w-full max-w-md flex-1 flex-col overflow-x-hidden pb-32">
                {children}
            </main>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 z-50 flex w-full justify-center px-4 pb-6">
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
