import DashboardLayout from '@/layouts/dashboard-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, CreditCard, KeyRound, Snowflake, Sun, Trash2 } from 'lucide-react';
import React from 'react';

interface CardData {
    card_id: number;
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
    daily_limit: string | null;
    monthly_limit: string | null;
    single_tx_limit: string | null;
    expiry: string | null;
    replacement_reason: string | null;
}

export default function CardShow({ card, flash }: { card: CardData; flash?: { status?: string } }) {
    const pin = useForm({ pin: '' });
    const limits = useForm<{ daily: string; monthly: string; single: string }>({
        daily: card.daily_limit ?? '',
        monthly: card.monthly_limit ?? '',
        single: card.single_tx_limit ?? '',
    });
    const replace = useForm<{ reason: 'lost' | 'stolen' | 'damaged' | 'compromised' }>({
        reason: 'lost',
    });

    const submitPin = (e: React.FormEvent) => {
        e.preventDefault();
        pin.post(`/banking/cards/${card.card_id}/pin`, {
            preserveScroll: true,
            onSuccess: () => pin.reset('pin'),
        });
    };

    const submitLimits = (e: React.FormEvent) => {
        e.preventDefault();
        limits.post(`/banking/cards/${card.card_id}/limits`, { preserveScroll: true });
    };

    const toggleFreeze = () => {
        router.post(`/banking/cards/${card.card_id}/${card.is_frozen ? 'unfreeze' : 'freeze'}`, {}, {
            preserveScroll: true,
        });
    };

    const submitReplace = (e: React.FormEvent) => {
        e.preventDefault();
        replace.post(`/banking/cards/${card.card_id}/replace`, { preserveScroll: true });
    };

    const gradient = card.is_virtual
        ? 'from-neutral-800 to-neutral-950'
        : card.brand === 'VISA'
          ? 'from-indigo-600 to-purple-900'
          : card.brand === 'MASTERCARD'
            ? 'from-orange-500 to-red-900'
            : 'from-emerald-600 to-teal-900';

    return (
        <DashboardLayout>
            <Head title={`Card •••• ${card.last4}`} />

            <div className="flex flex-col gap-6 px-6 pt-10 pb-10">
                <Link
                    href="/banking/cards"
                    className="flex items-center gap-2 self-start text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white"
                >
                    <ArrowLeft size={14} /> All cards
                </Link>

                {flash?.status && (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-300">
                        {flash.status}
                    </div>
                )}

                {/* Card hero */}
                <section
                    className={`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${gradient} p-8 shadow-2xl`}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                                {card.is_virtual ? 'Virtual' : 'Physical'} · {card.card_type}
                            </p>
                            <p className="text-lg font-black text-white">{card.brand}</p>
                        </div>
                        <CreditCard className="text-white/30" size={28} />
                    </div>

                    <div className="mt-16 flex flex-col gap-2">
                        <p className="text-xl font-mono font-bold tracking-[0.3em] text-white">{card.masked_pan}</p>
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-black uppercase tracking-widest text-white/60">
                                {card.account_number ?? '—'} · {card.currency ?? '—'}
                            </p>
                            <p className="text-[11px] font-black uppercase tracking-widest text-white/60">
                                Exp {card.expiry ?? '—'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Status pills */}
                <section className="flex flex-wrap gap-2">
                    <Pill label={card.status ?? 'unknown'} tone={card.status === 'active' ? 'good' : 'warn'} />
                    {card.is_frozen && <Pill label="Frozen" tone="info" />}
                    {card.online_only && <Pill label="Online Only" tone="neutral" />}
                    {card.has_pin ? <Pill label="PIN Set" tone="good" /> : <Pill label="No PIN" tone="warn" />}
                    {card.replacement_reason && <Pill label={`Replace: ${card.replacement_reason}`} tone="warn" />}
                </section>

                {/* Freeze toggle */}
                <button
                    onClick={toggleFreeze}
                    className={`flex items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-sm font-black uppercase tracking-widest transition-all ${
                        card.is_frozen
                            ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20'
                            : 'border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08]'
                    }`}
                >
                    {card.is_frozen ? <Sun size={18} /> : <Snowflake size={18} />}
                    {card.is_frozen ? 'Unfreeze Card' : 'Freeze Card'}
                </button>

                {/* PIN */}
                <form
                    onSubmit={submitPin}
                    className="flex flex-col gap-3 rounded-[2rem] border border-white/5 bg-white/[0.02] p-5"
                >
                    <h3 className="flex items-center gap-2 text-sm font-black text-white">
                        <KeyRound size={16} /> {card.has_pin ? 'Reset PIN' : 'Set PIN'}
                    </h3>
                    <input
                        type="password"
                        inputMode="numeric"
                        maxLength={6}
                        value={pin.data.pin}
                        onChange={(e) => pin.setData('pin', e.target.value.replace(/\D/g, ''))}
                        placeholder="4–6 digits"
                        className="rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-center text-lg tracking-[0.5em] text-white placeholder:text-gray-600 focus:border-primary/40 focus:outline-none"
                    />
                    {pin.errors.pin && (
                        <span className="text-xs font-semibold text-red-400">{pin.errors.pin}</span>
                    )}
                    <button
                        type="submit"
                        disabled={pin.processing || pin.data.pin.length < 4}
                        className="rounded-2xl bg-primary py-3 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(124,58,237,0.3)] disabled:opacity-50"
                    >
                        {pin.processing ? 'Saving…' : 'Save PIN'}
                    </button>
                </form>

                {/* Limits */}
                <form
                    onSubmit={submitLimits}
                    className="flex flex-col gap-3 rounded-[2rem] border border-white/5 bg-white/[0.02] p-5"
                >
                    <h3 className="text-sm font-black text-white">Spending Limits ({card.currency ?? 'NGN'})</h3>

                    <LimitInput label="Single" value={limits.data.single} onChange={(v) => limits.setData('single', v)} />
                    <LimitInput label="Daily" value={limits.data.daily} onChange={(v) => limits.setData('daily', v)} />
                    <LimitInput label="Monthly" value={limits.data.monthly} onChange={(v) => limits.setData('monthly', v)} />

                    <button
                        type="submit"
                        disabled={limits.processing}
                        className="rounded-2xl bg-white/[0.04] py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white/[0.08] disabled:opacity-50"
                    >
                        {limits.processing ? 'Updating…' : 'Update Limits'}
                    </button>
                </form>

                {/* Replacement */}
                <form
                    onSubmit={submitReplace}
                    className="flex flex-col gap-3 rounded-[2rem] border border-red-500/10 bg-red-500/[0.02] p-5"
                >
                    <h3 className="flex items-center gap-2 text-sm font-black text-red-300">
                        <Trash2 size={16} /> Request Replacement
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                        {(['lost', 'stolen', 'damaged', 'compromised'] as const).map((r) => (
                            <button
                                type="button"
                                key={r}
                                onClick={() => replace.setData('reason', r)}
                                className={`rounded-2xl border px-3 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${
                                    replace.data.reason === r
                                        ? 'border-red-500/40 bg-red-500/10 text-red-300'
                                        : 'border-white/5 bg-white/[0.02] text-gray-400'
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={replace.processing}
                        className="rounded-2xl bg-red-500/20 py-3 text-xs font-black uppercase tracking-widest text-red-200 hover:bg-red-500/30 disabled:opacity-50"
                    >
                        {replace.processing ? 'Sending…' : 'Request Replacement'}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}

function LimitInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <label className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-black/40 px-4 py-2.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</span>
            <input
                inputMode="decimal"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="0.00"
                className="w-32 bg-transparent text-right text-sm font-mono text-white placeholder:text-gray-600 focus:outline-none"
            />
        </label>
    );
}

function Pill({ label, tone }: { label: string; tone: 'good' | 'warn' | 'info' | 'neutral' }) {
    const styles = {
        good: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
        warn: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
        info: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
        neutral: 'border-white/10 bg-white/[0.03] text-gray-300',
    };

    return (
        <span
            className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${styles[tone]}`}
        >
            {label}
        </span>
    );
}
