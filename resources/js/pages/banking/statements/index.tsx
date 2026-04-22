import DashboardLayout from '@/layouts/dashboard-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDownToLine,
    ArrowLeft,
    ArrowDownRight,
    ArrowUpRight,
    TrendingDown,
    TrendingUp,
    Calendar,
} from 'lucide-react';
import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

/* ─── Types ─── */

interface TransactionRow {
    posted_at: string | null;
    reference: string;
    type: string | null;
    narration: string | null;
    direction: 'debit' | 'credit';
    amount: number;
    balance_after: string;
}

interface Statement {
    account: {
        account_id: number;
        account_number: string;
        account_type: string | null;
        currency: string | null;
    };
    period: { start: string; end: string };
    opening_balance: string;
    closing_balance: string;
    transactions: TransactionRow[];
    transaction_count: number;
}

interface Analytics {
    total_spent: string;
    total_received: string;
    net_flow: string;
    spending_by_type: Record<string, string>;
    transaction_count: number;
}

interface Props {
    statement: Statement;
    analytics: Analytics;
    filters: { from: string; to: string };
}

/* ─── Constants ─── */

const PIE_COLORS = [
    '#7C3AED', // primary purple
    '#3B82F6', // blue
    '#10B981', // emerald
    '#F59E0B', // amber
    '#EF4444', // red
    '#06B6D4', // cyan
    '#EC4899', // pink
    '#8B5CF6', // violet
];

/* ─── Page ─── */

export default function StatementsIndex({ statement, analytics, filters }: Props) {
    const [from, setFrom] = useState(filters.from);
    const [to, setTo] = useState(filters.to);

    const currency = statement.account.currency ?? 'NGN';
    const fmt = (v: string | number) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
        }).format(typeof v === 'string' ? parseFloat(v) : v);

    /* Build cumulative-balance line data from transactions */
    const lineData = (() => {
        const pts: { date: string; balance: number }[] = [
            {
                date: statement.period.start.slice(0, 10),
                balance: parseFloat(statement.opening_balance),
            },
        ];
        for (const tx of statement.transactions) {
            pts.push({
                date: tx.posted_at?.slice(0, 10) ?? '',
                balance: parseFloat(tx.balance_after),
            });
        }
        return pts;
    })();

    /* Build pie chart data */
    const pieData = Object.entries(analytics.spending_by_type).map(([type, value]) => ({
        name: type.replace(/_/g, ' '),
        value: parseFloat(value),
    }));

    const applyFilter = () => {
        router.get(
            `/banking/statements/${statement.account.account_number}`,
            { from, to },
            { preserveScroll: true },
        );
    };

    const netFlow = parseFloat(analytics.net_flow);

    return (
        <DashboardLayout>
            <Head title={`Statement · ${statement.account.account_number}`} />

            <div className="flex flex-col gap-6 px-6 pt-10 pb-10">
                {/* Back */}
                <Link
                    href="/banking/accounts"
                    className="flex items-center gap-2 self-start text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white"
                >
                    <ArrowLeft size={14} /> Accounts
                </Link>

                {/* Header */}
                <header className="flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                            Statement
                        </p>
                        <h1 className="text-2xl font-black tracking-tight text-white">
                            {statement.account.account_number}
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                            {statement.account.account_type} · {currency}
                        </p>
                    </div>
                    <a
                        href={`/banking/statements/${statement.account.account_number}/csv?from=${from}&to=${to}`}
                        className="flex h-10 items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 text-xs font-black uppercase tracking-widest text-emerald-400 transition-all hover:bg-emerald-500/20"
                    >
                        <ArrowDownToLine size={14} strokeWidth={3} /> CSV
                    </a>
                </header>

                {/* Date filter */}
                <section className="flex items-end gap-2 rounded-[2rem] border border-white/5 bg-white/[0.02] p-4">
                    <Calendar size={16} className="mb-2 text-gray-500" />
                    <label className="flex flex-1 flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            From
                        </span>
                        <input
                            type="date"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="rounded-2xl border border-white/5 bg-black/40 px-3 py-2 text-xs text-white focus:border-primary/40 focus:outline-none"
                        />
                    </label>
                    <label className="flex flex-1 flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            To
                        </span>
                        <input
                            type="date"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="rounded-2xl border border-white/5 bg-black/40 px-3 py-2 text-xs text-white focus:border-primary/40 focus:outline-none"
                        />
                    </label>
                    <button
                        onClick={applyFilter}
                        className="rounded-2xl bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/20"
                    >
                        Apply
                    </button>
                </section>

                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-3">
                    <SummaryCard
                        label="Income"
                        value={fmt(analytics.total_received)}
                        icon={<ArrowDownRight size={16} />}
                        tone="emerald"
                    />
                    <SummaryCard
                        label="Spent"
                        value={fmt(analytics.total_spent)}
                        icon={<ArrowUpRight size={16} />}
                        tone="red"
                    />
                    <SummaryCard
                        label="Net Flow"
                        value={fmt(analytics.net_flow)}
                        icon={netFlow >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        tone={netFlow >= 0 ? 'emerald' : 'red'}
                    />
                    <SummaryCard
                        label="Transactions"
                        value={String(analytics.transaction_count)}
                        icon={<Calendar size={16} />}
                        tone="purple"
                    />
                </div>

                {/* Balance trend chart */}
                {lineData.length > 1 && (
                    <section className="flex flex-col gap-3 rounded-[2rem] border border-white/5 bg-white/[0.02] p-5">
                        <h3 className="text-sm font-black text-white">Balance Trend</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={lineData}>
                                    <defs>
                                        <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.35} />
                                            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 9, fill: '#555' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 9, fill: '#555' }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={60}
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
                                        formatter={(v) => [fmt(Number(v)), 'Balance']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="balance"
                                        stroke="#7C3AED"
                                        strokeWidth={2}
                                        fill="url(#balanceGrad)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>
                )}

                {/* Spending by type donut */}
                {pieData.length > 0 && (
                    <section className="flex flex-col gap-3 rounded-[2rem] border border-white/5 bg-white/[0.02] p-5">
                        <h3 className="text-sm font-black text-white">Spending Breakdown</h3>
                        <div className="flex items-center gap-4">
                            <div className="h-32 w-32 flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            innerRadius={28}
                                            outerRadius={56}
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {pieData.map((_, i) => (
                                                <Cell
                                                    key={i}
                                                    fill={PIE_COLORS[i % PIE_COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <ul className="flex flex-col gap-2">
                                {pieData.map((d, i) => (
                                    <li key={d.name} className="flex items-center gap-2">
                                        <span
                                            className="h-2.5 w-2.5 rounded-full"
                                            style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                                        />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            {d.name}
                                        </span>
                                        <span className="text-[10px] font-bold text-white">{fmt(d.value)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {/* Transactions list */}
                <section className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-white">
                            Transactions ({statement.transaction_count})
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                            <span>Opening: {fmt(statement.opening_balance)}</span>
                            <span>·</span>
                            <span>Closing: {fmt(statement.closing_balance)}</span>
                        </div>
                    </div>

                    {statement.transactions.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
                            <Calendar size={28} className="text-gray-600" />
                            <p className="text-sm font-bold text-white">No activity</p>
                            <p className="text-xs text-gray-500">Try adjusting the date range.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {statement.transactions.map((tx, i) => (
                                <div
                                    key={i}
                                    className="group flex items-center justify-between rounded-3xl border border-white/5 bg-white/[0.01] p-4 transition-all hover:bg-white/[0.04]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                                                tx.direction === 'credit'
                                                    ? 'bg-emerald-500/10 text-emerald-400'
                                                    : 'bg-white/5 text-gray-400'
                                            }`}
                                        >
                                            {tx.direction === 'credit' ? (
                                                <ArrowDownRight size={18} />
                                            ) : (
                                                <ArrowUpRight size={18} />
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-0.5 text-left">
                                            <p className="max-w-[140px] truncate text-xs font-bold text-white">
                                                {tx.narration || tx.type || tx.reference}
                                            </p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                                                {tx.posted_at
                                                    ? new Date(tx.posted_at).toLocaleDateString(undefined, {
                                                          month: 'short',
                                                          day: 'numeric',
                                                      })
                                                    : '—'}{' '}
                                                · {tx.type}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className={`text-[13px] font-black tracking-tight ${
                                                tx.direction === 'credit' ? 'text-emerald-400' : 'text-white'
                                            }`}
                                        >
                                            {tx.direction === 'credit' ? '+' : '-'}
                                            {fmt(tx.amount)}
                                        </p>
                                        <p className="text-[9px] font-bold text-gray-600">
                                            {fmt(tx.balance_after)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </DashboardLayout>
    );
}

/* ─── Helpers ─── */

function SummaryCard({
    label,
    value,
    icon,
    tone,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
    tone: 'emerald' | 'red' | 'purple';
}) {
    const toneMap = {
        emerald: 'border-emerald-500/20 bg-emerald-500/[0.05] text-emerald-400',
        red: 'border-red-500/20 bg-red-500/[0.05] text-red-400',
        purple: 'border-primary/20 bg-primary/[0.05] text-primary',
    };

    return (
        <div className={`flex flex-col gap-2 rounded-[2rem] border p-5 ${toneMap[tone]}`}>
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
                    {label}
                </span>
            </div>
            <span className="text-lg font-black tracking-tight text-white">{value}</span>
        </div>
    );
}
