import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PublicTopBar } from '@/components/public-top-bar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { logout } from '@/routes';
import { ChevronDown, LogOut, User, LayoutDashboard, Landmark } from 'lucide-react';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage().props as any;
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 pl-3 pr-2 py-1.5 text-sm font-medium text-slate-300 bg-slate-900/40 border border-slate-800/50 rounded-xl hover:border-amber-500/30 transition-all active:scale-95 group"
                        >
                            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-black">
                                {auth.user?.name?.charAt(0) || <User className="w-4 h-4" />}
                            </div>
                            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-widest">{auth.user?.name || 'Account'}</span>
                            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isProfileOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                                <div className="absolute right-0 mt-2 w-56 p-1 bg-[#0a0a0b] border border-slate-800 rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    <div className="px-4 py-3 border-b border-white/5">
                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Verified Session</p>
                                        <p className="text-xs font-bold text-white truncate">{auth.user?.email}</p>
                                    </div>
                                    <Link
                                        href="/"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:bg-slate-900 hover:text-white transition-colors rounded-xl mt-1"
                                    >
                                        <Landmark className="w-4 h-4" />
                                        Home Page
                                    </Link>
                                    <Link
                                        href={logout().url}
                                        method="post"
                                        as="button"
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/5 transition-colors rounded-xl"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign out
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>
    );
}
