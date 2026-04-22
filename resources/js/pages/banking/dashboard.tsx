import DashboardLayout from '@/layouts/dashboard-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    Banknote,
    Bell,
    ChevronRight,
    CreditCard,
    Eye,
    EyeOff,
    Gamepad2,
    Gift,
    Globe,
    HelpCircle,
    PieChart,
    Plus,
    Send,
    Smartphone,
    TrendingUp,
    UserCheck,
    Wifi,
    Zap,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

/* ─── Types ───────────────────────────────────────────────────── */

interface Account {
    account_id: number;
    account_number: string;
    account_type: string;
    balance: number;
    available_balance: number;
    currency: string;
    status: string;
}

interface Transaction {
    transaction_id: string;
    reference: string;
    type: string;
    amount: number;
    currency: string;
    status: string;
    narration: string;
    posted_at: string;
    direction: 'debit' | 'credit';
}

interface Card {
    brand: string;
    last4: string;
    type: string;
    status: string;
    expiry: string;
}

interface SavingsGoal {
    name: string;
    target: number;
    current: number;
    color: string;
}

interface SpendAnalytics {
    total_spent: string;
    total_received: string;
    net_flow: string;
    spending_by_type: Record<string, string>;
    transaction_count: number;
}

interface MonthlyRow {
    month: string;
    income: number;
    expenses: number;
}

interface Props {
    user: { name: string; username: string; email: string };
    accounts: Account[];
    totalBalance: string;
    yesterday_earnings: string;
    recentTransactions: Transaction[];
    unreadNotifications: number;
    cards: Card[];
    savingsGoals: SavingsGoal[];
    spendAnalytics: SpendAnalytics;
    monthlyBreakdown: MonthlyRow[];
}

/* ─── Helpers ─────────────────────────────────────────────────── */

function getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
}

/* ─── Page ────────────────────────────────────────────────────── */

export default function BankingDashboard({
    user,
    totalBalance,
    yesterday_earnings,
    recentTransactions,
    unreadNotifications,
    cards,
    savingsGoals,
    spendAnalytics,
    monthlyBreakdown,
}: Props) {
    const [showBalance, setShowBalance] = useState(true);
    const greeting = useMemo(getGreeting, []);

    const fmt = (v: string | number) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(typeof v === 'string' ? parseFloat(v) : v);

    /* ── Action grid data ─── */
    const actions = [
        { name: 'To Bank', icon: Banknote, color: 'from-blue-500/20 to-blue-600/5', text: 'text-blue-400', href: '/banking/transfers' },
        { name: 'Interbank', icon: ArrowUpRight, color: 'from-emerald-500/20 to-emerald-600/5', text: 'text-emerald-400', href: '/banking/interbank' },
        { name: 'Wealth', icon: PieChart, color: 'from-purple-500/20 to-purple-600/5', text: 'text-purple-400', href: '/banking/accounts' },
        { name: 'Reward', icon: Gift, color: 'from-amber-500/20 to-amber-600/5', text: 'text-amber-400', href: '/banking/cards' },
    ];

    /* ── Services grid data ─── */
    const services = [
        { name: 'Airtime', icon: Smartphone, color: 'text-blue-400', href: '/banking/payments' },
        { name: 'Data', icon: Wifi, color: 'text-emerald-400', href: '/banking/payments' },
        { name: 'Betting', icon: Gamepad2, color: 'text-red-400', href: '/banking/payments' },
        { name: 'Internet', icon: Globe, color: 'text-cyan-400', href: '/banking/payments' },
        { name: 'Electricity', icon: Zap, color: 'text-yellow-400', href: '/banking/payments' },
    ];

    return (
        <DashboardLayout>
            <Head title="Dashboard — ApexBank" />

            <div className="flex flex-col gap-8 px-6 pt-10 pb-10">

                {/* ═══════════ 1. Profile Header ═══════════ */}
                <header className="flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex items-center gap-3">
                        <div className="animate-pulse-glow flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-800 text-lg font-black text-white shadow-[0_8px_20px_rgba(124,58,237,0.3)] border border-white/10 ring-1 ring-white/5">
                            {user.name?.[0] || 'U'}
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 text-left">
                                {greeting},
                            </p>
                            <h2 className="text-lg font-extrabold tracking-tight text-white">
                                {user.name}
                                {user.username && (
                                    <span className="ml-2 text-xs font-bold text-primary/80">@{user.username}</span>
                                )}
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/banking/notifications"
                            className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all active:scale-90 group"
                        >
                            <Bell size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                            {(unreadNotifications ?? 0) > 0 && (
                                <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-black" />
                            )}
                        </Link>
                        <Link
                            href="/banking/security/passkeys"
                            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all active:scale-90 group"
                        >
                            <HelpCircle size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                        </Link>
                    </div>
                </header>

                {/* ═══════════ 2. Premium Balance Card ═══════════ */}
                <section className="relative overflow-hidden rounded-[2.5rem] bg-premium-gradient p-8 shadow-[0_20px_50px_rgba(124,58,237,0.25)] animate-in zoom-in-95 duration-700 delay-100 group">
                    {/* Animated orbs */}
                    <div className="animate-shimmer absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-900/40 blur-2xl" />
                    <div className="absolute right-20 bottom-10 h-24 w-24 rounded-full bg-indigo-400/10 blur-2xl animate-float" />

                    <div className="relative z-10 flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                                    Portfolio Balance
                                </span>
                                <button
                                    onClick={() => setShowBalance(!showBalance)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-all active:scale-90"
                                >
                                    {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-5xl font-black tracking-tighter text-white transition-all duration-500">
                                {showBalance ? fmt(totalBalance) : '••••••••'}
                            </h1>
                            <div className="flex items-center gap-2">
                                <p className="text-xs font-bold text-white/50">Yesterday's Profit</p>
                                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-black text-emerald-400">
                                    +{fmt(yesterday_earnings)}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Link
                                href="/banking/accounts"
                                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/20 py-3.5 text-[12px] font-black uppercase tracking-wider text-white backdrop-blur-md hover:bg-black/40 transition-all active:scale-95 shadow-lg"
                            >
                                <Plus size={16} strokeWidth={3} />
                                Top Up
                            </Link>
                            <Link
                                href="/banking/transfers"
                                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 py-3.5 text-[12px] font-black uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/20 transition-all active:scale-95"
                            >
                                <Send size={16} strokeWidth={3} />
                                Transfer
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ═══════════ 3. Action Grid ═══════════ */}
                <section className="grid grid-cols-4 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    {actions.map((action) => (
                        <Link
                            key={action.name}
                            href={action.href}
                            className="group flex flex-col items-center gap-3 active:scale-90 transition-all"
                        >
                            <div className={`flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-b ${action.color} border border-white/5 shadow-inner transition-all duration-300 group-hover:border-white/10 group-hover:-translate-y-1`}>
                                <action.icon size={24} className={`${action.text} transition-transform group-hover:scale-110`} />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 text-center tracking-tight group-hover:text-gray-300 transition-colors">
                                {action.name}
                            </span>
                        </Link>
                    ))}
                </section>

                {/* ═══════════ 4. My Cards Carousel ═══════════ */}
                {cards && cards.length > 0 && (
                    <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-250">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black tracking-tight text-white">My Cards</h3>
                            <Link href="/banking/cards" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-colors">
                                Manage
                            </Link>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
                            {cards.map((card, i) => (
                                <div
                                    key={i}
                                    className={`flex-none w-[280px] h-[160px] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-transform hover:scale-[1.02] active:scale-95 shadow-xl ${
                                        card.type === 'Virtual'
                                            ? 'bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/10'
                                            : 'bg-gradient-to-br from-purple-600 to-indigo-900 border border-white/20 shadow-purple-500/20'
                                    }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="text-left">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">{card.type} Card</p>
                                            <p className="text-sm font-black text-white">{card.brand}</p>
                                        </div>
                                        <div className="h-8 w-12 rounded bg-white/10 backdrop-blur-sm border border-white/5 flex items-center justify-center">
                                            <div className="h-4 w-4 rounded-full bg-orange-500/80 -mr-1" />
                                            <div className="h-4 w-4 rounded-full bg-yellow-500/80 -ml-1" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 items-start">
                                        <p className="text-lg font-mono font-bold tracking-[0.2em] text-white">
                                            •••• •••• •••• {card.last4}
                                        </p>
                                        <div className="flex w-full justify-between items-center pt-2">
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Exp: {card.expiry}</p>
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ═══════════ 5. Savings Goals ═══════════ */}
                {savingsGoals && savingsGoals.length > 0 && (
                    <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black tracking-tight text-white">Savings Goals</h3>
                            <button className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">New Goal</button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {savingsGoals.map((goal, i) => {
                                const pct = Math.round((goal.current / goal.target) * 100);
                                return (
                                    <div key={i} className="glass-card rounded-[2rem] p-6 group hover:bg-white/[0.04] transition-all">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-10 w-10 rounded-xl ${goal.color} bg-opacity-20 flex items-center justify-center text-white`}>
                                                    <TrendingUp size={20} />
                                                </div>
                                                <span className="font-bold text-white">{goal.name}</span>
                                            </div>
                                            <span className="text-xs font-black text-white/40">{pct}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${goal.color} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between mt-3">
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{fmt(goal.current)}</span>
                                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Target: {fmt(goal.target)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* ═══════════ 6. Spend Analytics ═══════════ */}
                <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-350">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black tracking-tight text-white">Analytics</h3>
                        <Link href="/banking/accounts" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                            Last 30 days
                        </Link>
                    </div>

                    {/* Summary pills */}
                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col gap-1 rounded-[1.5rem] border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Income</span>
                            <span className="text-sm font-black text-emerald-400">{fmt(spendAnalytics?.total_received ?? '0')}</span>
                        </div>
                        <div className="flex flex-col gap-1 rounded-[1.5rem] border border-red-500/20 bg-red-500/[0.04] p-4">
                            <span className="text-[9px] font-black uppercase tracking-widest text-red-400/60">Spent</span>
                            <span className="text-sm font-black text-red-400">{fmt(spendAnalytics?.total_spent ?? '0')}</span>
                        </div>
                        <div className="flex flex-col gap-1 rounded-[1.5rem] border border-primary/20 bg-primary/[0.04] p-4">
                            <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">Net</span>
                            <span className={`text-sm font-black ${parseFloat(spendAnalytics?.net_flow ?? '0') >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {fmt(spendAnalytics?.net_flow ?? '0')}
                            </span>
                        </div>
                    </div>

                    {/* Monthly chart */}
                    {monthlyBreakdown && monthlyBreakdown.length > 0 && (
                        <div className="glass-card rounded-[2rem] p-5">
                            <h4 className="mb-4 text-xs font-black text-white">Income vs Expenses</h4>
                            <div className="h-44">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyBreakdown} barGap={4}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            tick={{ fontSize: 9, fill: '#555' }}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 9, fill: '#555' }}
                                            axisLine={false}
                                            tickLine={false}
                                            width={55}
                                            tickFormatter={(v) =>
                                                Intl.NumberFormat('en', { notation: 'compact' }).format(Number(v))
                                            }
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                background: '#1A1A1A',
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                borderRadius: '1rem',
                                                fontSize: 11,
                                                color: '#fff',
                                            }}
                                            formatter={(value, name) => [
                                                fmt(Number(value)),
                                                String(name).charAt(0).toUpperCase() + String(name).slice(1),
                                            ]}
                                        />
                                        <Legend wrapperStyle={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em' }} />
                                        <Bar dataKey="income" fill="#10B981" radius={[8, 8, 0, 0]} maxBarSize={18} />
                                        <Bar dataKey="expenses" fill="#EF4444" radius={[8, 8, 0, 0]} maxBarSize={18} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </section>

                {/* ═══════════ 7. Digital Services Grid ═══════════ */}
                <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black tracking-tight text-white">Digital Services</h3>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        {services.map((service) => (
                            <Link key={service.name} href={service.href} className="group flex flex-col items-center gap-3 active:scale-90 transition-all">
                                <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white/[0.03] border border-white/5 shadow-inner transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-white/10 group-hover:-translate-y-1">
                                    <service.icon size={26} className={`${service.color} transition-transform group-hover:scale-110`} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 text-center tracking-tight group-hover:text-gray-300 transition-colors capitalize">
                                    {service.name.toLowerCase()}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ═══════════ 8. Premium Upgrade Banner ═══════════ */}
                <section className="bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/20 rounded-[2.5rem] p-8 flex justify-between items-center animate-in zoom-in-95 duration-700 delay-500 group hover:border-yellow-500/30 transition-all cursor-pointer">
                    <div className="flex flex-col gap-1 text-left">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500">Premium Upgrade</p>
                        <h4 className="text-lg font-black text-white">Apex Platinum</h4>
                        <p className="text-xs text-white/50">Get 2.5% cashback on all travel.</p>
                    </div>
                    <ChevronRight className="text-yellow-500 transition-transform group-hover:translate-x-1" />
                </section>

                {/* ═══════════ 9. Recent Activity Feed ═══════════ */}
                <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-600">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black tracking-tight text-white">Recent Activity</h3>
                        <Link href="/banking/accounts" className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                            See All <ChevronRight size={12} />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {recentTransactions?.length > 0 ? (
                            recentTransactions.map((tx) => (
                                <div
                                    key={tx.transaction_id}
                                    className="group flex items-center justify-between rounded-3xl border border-white/5 bg-white/[0.01] p-5 transition-all hover:bg-white/[0.04]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                                                tx.direction === 'debit'
                                                    ? 'bg-white/5 text-gray-400 group-hover:bg-red-500/10 group-hover:text-red-400'
                                                    : 'bg-emerald-500/10 text-emerald-400'
                                            }`}
                                        >
                                            {tx.direction === 'debit' ? (
                                                <Send size={20} strokeWidth={2.5} />
                                            ) : (
                                                <Banknote size={20} strokeWidth={2.5} />
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-0.5 text-left">
                                            <p className="max-w-[150px] truncate text-sm font-bold text-white group-hover:text-primary transition-colors">
                                                {tx.narration || tx.type}
                                            </p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                                                {new Date(tx.posted_at).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}{' '}
                                                • {tx.status.toLowerCase()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className={`text-[15px] font-black tracking-tight ${
                                                tx.direction === 'debit' ? 'text-white' : 'text-emerald-400'
                                            }`}
                                        >
                                            {tx.direction === 'debit' ? '-' : '+'}{fmt(tx.amount)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center gap-3 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.01] p-10 text-center">
                                <CreditCard size={32} className="text-gray-600" />
                                <p className="text-sm font-bold text-white">No recent transactions</p>
                                <p className="text-xs text-gray-500">Your activity will appear here.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}
