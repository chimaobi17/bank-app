import { Head, Link } from '@inertiajs/react';
import { Activity, ArrowRightLeft, Banknote, Database, Landmark, Lock, PieChart, Shield, Users } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import { register } from '@/routes';

interface Stats {
    total_users: number;
    total_accounts: number;
    total_transactions: number;
    total_volume: string;
}

interface Props {
    canRegister: boolean;
    stats: Stats;
}

export default function Welcome({ canRegister, stats }: Props) {
    return (
        <PublicLayout canRegister={canRegister}>
            <Head title="Premium Banking" />

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 pb-32 pt-20 lg:px-12 lg:pt-32">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-500 backdrop-blur-sm">
                        <Shield className="h-3.5 w-3.5" />
                        Secure Institutional Banking
                    </div>
                    <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-7xl lg:text-8xl">
                        The future of <br />
                        <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                            digital finance
                        </span>
                    </h1>
                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
                        Experience institutional-grade security with an Oracle 21c core. Seamless transfers, automated loans,
                        and real-time intelligence.
                    </p>
                    {canRegister && (
                        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href={register().url}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-8 py-4 text-base font-bold text-black shadow-[0_10px_30px_rgba(245,158,11,0.3)] transition-all hover:bg-amber-400 active:scale-95 sm:w-auto"
                            >
                                Open Account <ArrowRightLeft className="h-5 w-5" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats */}
            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
                    <StatItem icon={<Users className="size-4" />} value={stats.total_users.toLocaleString()} label="Active Clients" />
                    <StatItem icon={<Landmark className="size-4" />} value={stats.total_accounts.toLocaleString()} label="Total Accounts" />
                    <StatItem icon={<Activity className="size-4" />} value={stats.total_transactions.toLocaleString()} label="Transactions" />
                    <StatItem
                        icon={<Banknote className="size-4" />}
                        value={`₦${parseFloat(stats.total_volume || '0').toLocaleString()}`}
                        label="Processed Volume"
                    />
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto max-w-7xl border-t border-slate-900/50 px-6 py-24 lg:px-12">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <FeatureCard
                        icon={<ArrowRightLeft className="h-6 w-6" />}
                        title="Instant Transfers"
                        description="Move capital globally within seconds using our proprietary ledger engine."
                    />
                    <FeatureCard
                        icon={<PieChart className="h-6 w-6" />}
                        title="Automated Loans"
                        description="Algorithmic credit assessment providing instant liquidity when you need it."
                    />
                    <FeatureCard
                        icon={<Database className="h-6 w-6" />}
                        title="Oracle Core"
                        description="Built on Oracle 21c for unparalleled data integrity and high availability."
                    />
                    <FeatureCard
                        icon={<Lock className="h-6 w-6" />}
                        title="Ironclad Security"
                        description="Multi-factor authentication and AES-256 encryption at every layer."
                    />
                </div>
            </section>
        </PublicLayout>
    );
}

function StatItem({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-6 text-center backdrop-blur-sm">
            <div className="mb-2 flex justify-center text-amber-500/50">{icon}</div>
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="group rounded-3xl border border-slate-900 bg-slate-900/20 p-8 backdrop-blur-sm transition-all hover:border-amber-500/40 hover:bg-slate-900/40">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-amber-500 shadow-inner transition-transform duration-500 group-hover:scale-110">
                {icon}
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{description}</p>
        </div>
    );
}
