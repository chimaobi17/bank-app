import { Link, usePage } from '@inertiajs/react';
import { Landmark, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { dashboard, login, register } from '@/routes';

type NavLink = { label: string; href: string };

const primaryNav: NavLink[] = [
    { label: 'Personal', href: '/#personal' },
    { label: 'Business', href: '/#business' },
    { label: 'Cards', href: '/#cards' },
    { label: 'Loans', href: '/#loans' },
    { label: 'Digital', href: '/#digital' },
    { label: 'About', href: '/#about' },
];

interface Props {
    canRegister?: boolean;
}

export function PublicMainBar({ canRegister }: Props) {
    const page = usePage().props as { auth: { user: unknown }; canRegister?: boolean };
    const { auth } = page;
    const registrationEnabled = canRegister ?? page.canRegister ?? false;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 border-b border-slate-900/50 bg-[#050505]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                        <Landmark className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
                        Apex<span className="text-amber-500">Bank</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {primaryNav.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-sm font-medium text-slate-300 transition-colors hover:text-amber-500"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {auth?.user ? (
                        <Link
                            href={dashboard().url}
                            className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all hover:bg-amber-400 active:scale-95"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login().url}
                                className="hidden text-sm font-black uppercase tracking-widest text-slate-200 transition-colors hover:text-white sm:block"
                            >
                                Log In
                            </Link>
                            {registrationEnabled && (
                                <Link
                                    href={register().url}
                                    className="rounded-full border border-slate-700 px-5 py-2 text-sm font-black uppercase tracking-widest text-white transition-all hover:border-amber-500 hover:bg-amber-500/10 active:scale-95"
                                >
                                    Sign Up
                                </Link>
                            )}
                        </>
                    )}

                    <button
                        type="button"
                        onClick={() => setMobileOpen((o) => !o)}
                        className="rounded-lg p-2 text-slate-200 hover:bg-slate-900 lg:hidden"
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <nav className="border-t border-slate-900 bg-[#050505] lg:hidden">
                    <ul className="flex flex-col gap-1 px-6 py-4">
                        {primaryNav.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-amber-500"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        {!auth?.user && (
                            <li>
                                <Link
                                    href={login().url}
                                    className="block rounded-lg px-3 py-2 text-sm font-black uppercase tracking-widest text-slate-300 hover:bg-slate-900 hover:text-amber-500 sm:hidden"
                                >
                                    Log In
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            )}
        </div>
    );
}
