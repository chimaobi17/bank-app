import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import {
    Shield,
    ArrowRightLeft,
    Landmark,
    Bell,
    PieChart,
    Database,
    Lock,
    Globe,
    User,
    LogOut,
    ChevronDown,
    LayoutDashboard
} from 'lucide-react';

export default function Landing() {
    const { auth } = usePage().props as any;
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/30 selection:text-amber-200">
            <Head title="Premium Banking" />

            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[25%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute top-[20%] -right-[5%] w-[50%] h-[50%] rounded-full bg-amber-600/5 blur-[100px]" />
            </div>

            {/* Navigation */}
            <header className="relative z-50 flex items-center justify-between px-6 py-6 mx-auto max-w-7xl lg:px-12">
                <div className="flex items-center gap-2 group cursor-default">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-500">
                        <Landmark className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white uppercase sm:text-2xl">
                        Apex<span className="text-amber-500">Bank</span>
                    </span>
                </div>

                <nav className="flex items-center gap-4 sm:gap-8">
                    {auth.user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 pl-4 pr-3 py-2 text-sm font-medium text-foreground bg-card/50 border border-border rounded-2xl hover:border-amber-500/50 transition-all active:scale-95 group"
                            >
                                <span className="hidden sm:inline text-muted-foreground group-hover:text-amber-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Account</span>
                                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-primary-foreground font-bold">
                                    {auth.user.name.charAt(0)}
                                </div>
                                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                                    <div className="absolute right-0 mt-3 w-56 p-1 bg-card border border-border rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
                                        <div className="px-4 py-3 border-b border-border">
                                            <p className="text-xs text-muted-foreground uppercase font-black">Logged in as</p>
                                            <p className="text-sm font-bold text-foreground truncate">{auth.user.email}</p>
                                        </div>
                                        <Link
                                            href={dashboard()}
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-amber-500 hover:text-primary-foreground transition-colors rounded-xl mt-1"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors rounded-xl"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign out
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href={login().url}
                                className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                href={register().url}
                                className="px-6 py-2.5 text-sm font-black uppercase tracking-widest text-foreground border-2 border-amber-500/50 rounded-full hover:bg-amber-500 hover:text-primary-foreground transition-all active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            {/* Hero Section */}
            <main className="relative z-10">
                <section className="px-6 pt-20 pb-32 mx-auto max-w-7xl lg:px-12 lg:pt-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-semibold tracking-wider text-amber-500 uppercase border rounded-full border-amber-500/20 bg-amber-500/5 backdrop-blur-sm">
                            <Shield className="w-3.5 h-3.5" />
                            Secure Institutional Banking
                        </div>
                        <h1 className="text-5xl font-black tracking-tight text-foreground sm:text-7xl lg:text-8xl leading-tight">
                            The future of <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                                digital finance
                            </span>
                        </h1>
                        <p className="mt-8 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto leading-relaxed">
                            Experience institutional-grade security with an Oracle 21c core.
                            Seamless transfers, automated loans, and real-time intelligence.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 mt-12 sm:flex-row">
                            <Link
                                href={register().url}
                                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-primary-foreground bg-amber-500 rounded-2xl hover:bg-amber-400 transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] active:scale-95 flex items-center justify-center gap-2"
                            >
                                Open Account <ArrowRightLeft className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="px-6 py-24 mx-auto max-w-7xl lg:px-12 border-t border-border">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            icon={<ArrowRightLeft className="w-6 h-6" />}
                            title="Instant Transfers"
                            description="Move capital globally within seconds using our proprietary ledger engine."
                        />
                        <FeatureCard
                            icon={<PieChart className="w-6 h-6" />}
                            title="Automated Loans"
                            description="Algorithmic credit assessment providing instant liquidity when you need it."
                        />
                        <FeatureCard
                            icon={<Database className="w-6 h-6" />}
                            title="Oracle Core"
                            description="Built on Oracle 21c for unparalleled data integrity and high availability."
                        />
                        <FeatureCard
                            icon={<Lock className="w-6 h-6" />}
                            title="Ironclad Security"
                            description="Multi-factor authentication and AES-256 encryption at every layer."
                        />
                    </div>
                </section>
            </main>

            <footer className="px-6 py-12 mt-24 border-t border-border lg:px-12">
                <div className="flex flex-col items-center justify-between mx-auto max-w-7xl gap-6 sm:flex-row">
                    <div className="text-sm text-muted-foreground">
                        &copy; 2026 ApexBank Systems Group. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-3xl border border-border bg-card/20 backdrop-blur-sm hover:border-amber-500/30 hover:bg-card/40 transition-all group">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-2xl bg-muted text-amber-500 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                {icon}
            </div>
            <h3 className="mb-3 text-xl font-bold text-card-foreground">{title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
                {description}
            </p>
        </div>
    );
}
