import DashboardLayout from '@/layouts/dashboard-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { CreditCard, Plus, Snowflake } from 'lucide-react';
import React, { useState } from 'react';

interface CardRow {
    card_id: number;
    account_id: number;
    account_number: string | null;
    currency: string | null;
    masked_pan: string;
    last4: string;
    brand: string;
    card_type: string;
    is_virtual: boolean;
    online_only: boolean;
    status: string | null;
    is_frozen: boolean;
    has_pin: boolean;
    expiry: string | null;
}

interface AccountOption {
    account_id: number;
    account_number: string;
    account_type: string | null;
    currency: string;
}

interface Props {
    cards: CardRow[];
    accounts: AccountOption[];
    flash?: { status?: string };
}

export default function CardsIndex({ cards, accounts, flash }: Props) {
    const [showIssuer, setShowIssuer] = useState(false);
    const form = useForm<{ account_id: string; brand: 'VISA' | 'MASTERCARD' | 'VERVE' }>({
        account_id: accounts[0]?.account_id.toString() ?? '',
        brand: 'VISA',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/banking/cards/virtual', {
            preserveScroll: true,
            onSuccess: () => setShowIssuer(false),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Cards" />

            <div className="flex flex-col gap-6 px-6 pt-10 pb-10">
                <header className="flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Wallet</p>
                        <h1 className="text-2xl font-black tracking-tight text-white">Your cards</h1>
                    </div>
                    <button
                        onClick={() => setShowIssuer((v) => !v)}
                        className="flex h-10 items-center gap-2 rounded-2xl bg-primary/10 px-4 text-xs font-black uppercase tracking-widest text-primary transition-all hover:bg-primary/20"
                    >
                        <Plus size={14} strokeWidth={3} /> Virtual
                    </button>
                </header>

                {flash?.status && (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-300">
                        {flash.status}
                    </div>
                )}

                {showIssuer && (
                    <form
                        onSubmit={submit}
                        className="flex flex-col gap-3 rounded-[2rem] border border-white/5 bg-white/[0.02] p-5"
                    >
                        <h3 className="text-sm font-black text-white">Issue a Virtual Card</h3>

                        <label className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                Funding Account
                            </span>
                            <select
                                value={form.data.account_id}
                                onChange={(e) => form.setData('account_id', e.target.value)}
                                className="rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                            >
                                {accounts.map((a) => (
                                    <option key={a.account_id} value={a.account_id} className="bg-neutral-900">
                                        {a.account_number} · {a.account_type} · {a.currency}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div className="grid grid-cols-3 gap-2">
                            {(['VISA', 'MASTERCARD', 'VERVE'] as const).map((b) => (
                                <button
                                    type="button"
                                    key={b}
                                    onClick={() => form.setData('brand', b)}
                                    className={`rounded-2xl border px-3 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                                        form.data.brand === b
                                            ? 'border-primary/40 bg-primary/10 text-primary'
                                            : 'border-white/5 bg-white/[0.02] text-gray-400'
                                    }`}
                                >
                                    {b}
                                </button>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={form.processing || !form.data.account_id}
                            className="rounded-2xl bg-primary py-3 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(124,58,237,0.3)] disabled:opacity-50"
                        >
                            {form.processing ? 'Issuing…' : 'Issue Card'}
                        </button>
                    </form>
                )}

                {cards.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="flex flex-col gap-4">
                        {cards.map((c) => (
                            <CardTile key={c.card_id} card={c} />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

function CardTile({ card }: { card: CardRow }) {
    const gradient = card.is_virtual
        ? 'from-neutral-800 to-neutral-950'
        : card.brand === 'VISA'
          ? 'from-indigo-600 to-purple-900'
          : card.brand === 'MASTERCARD'
            ? 'from-orange-500 to-red-900'
            : 'from-emerald-600 to-teal-900';

    return (
        <Link
            href={`/banking/cards/${card.card_id}`}
            className={`relative block overflow-hidden rounded-[2rem] bg-gradient-to-br ${gradient} p-6 shadow-xl transition-all hover:-translate-y-1`}
        >
            {card.is_frozen && (
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-300">
                    <Snowflake size={10} /> Frozen
                </div>
            )}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                        {card.is_virtual ? 'Virtual' : 'Physical'} · {card.card_type}
                    </p>
                    <p className="text-sm font-black text-white">{card.brand}</p>
                </div>
                <CreditCard className="text-white/40" size={20} />
            </div>

            <div className="mt-10 flex flex-col gap-1">
                <p className="text-xl font-mono font-bold tracking-[0.3em] text-white">•••• {card.last4}</p>
                <div className="flex items-center justify-between pt-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                        {card.account_number ?? 'No account'}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                        Exp: {card.expiry ?? '—'}
                    </p>
                </div>
            </div>
        </Link>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center gap-3 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
            <CreditCard size={32} className="text-gray-600" />
            <p className="text-sm font-bold text-white">No cards yet</p>
            <p className="text-xs text-gray-500">Issue a virtual card or request a physical one.</p>
        </div>
    );
}
