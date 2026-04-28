import DashboardLayout from '@/layouts/dashboard-layout';
import TransferSuccessModal, { TransferSuccessData } from '@/components/transfer-success-modal';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    Loader2,
    Search,
    Send,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

/* ─── Types ─── */

interface AccountOption {
    account_number: string;
    account_type: string;
    balance: string;
    available_balance: string;
    currency: string;
}

interface BankOption {
    code: string;
    name: string;
}

interface Props {
    accounts: AccountOption[];
    banks: BankOption[];
}

/* ─── Page ─── */

export default function InterbankTransfer({ accounts, banks }: Props) {
    const [resolvedName, setResolvedName] = useState<string | null>(null);
    const [resolveError, setResolveError] = useState<string | null>(null);
    const [resolving, setResolving] = useState(false);

    const flash = (usePage().props as unknown as { flash?: { successTransfer?: TransferSuccessData } }).flash;
    const successTransfer = flash?.successTransfer ?? null;
    const [success, setSuccess] = useState<TransferSuccessData | null>(successTransfer);

    const form = useForm({
        source_account_number: accounts[0]?.account_number ?? '',
        destination_bank_code: '',
        destination_account_number: '',
        destination_account_name: '',
        amount: '',
        narration: '',
    });

    useEffect(() => {
        if (successTransfer) {
            setSuccess(successTransfer);
            setResolvedName(null);
            form.reset('destination_bank_code', 'destination_account_number', 'destination_account_name', 'amount', 'narration');
        }
    }, [successTransfer?.reference]);

    const fromAccount = accounts.find((a) => a.account_number === form.data.source_account_number);

    const fmt = (v: string | number) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: fromAccount?.currency ?? 'NGN',
            minimumFractionDigits: 0,
        }).format(typeof v === 'string' ? parseFloat(v) : v);

    /* ─── Name enquiry ─── */

    const doNameEnquiry = useCallback(async () => {
        if (!form.data.destination_bank_code || form.data.destination_account_number.length !== 10) {
            return;
        }

        setResolving(true);
        setResolvedName(null);
        setResolveError(null);

        try {
            const res = await fetch('/banking/interbank/name-enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(
                        document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] ?? '',
                    ),
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    bank_code: form.data.destination_bank_code,
                    account_number: form.data.destination_account_number,
                }),
            });

            const payload = await res.json();

            if (payload.found) {
                setResolvedName(payload.account_name);
                form.setData('destination_account_name', payload.account_name);
            } else {
                setResolveError(payload.reason ?? 'Name not found.');
            }
        } catch {
            setResolveError('Network error.');
        } finally {
            setResolving(false);
        }
    }, [form.data.destination_bank_code, form.data.destination_account_number]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/banking/interbank', { preserveScroll: true });
    };

    return (
        <DashboardLayout>
            <Head title="Interbank Transfer" />

            <div className="flex flex-col gap-6 px-5 pt-10 pb-10 sm:px-6 lg:px-8 xl:px-0 lg:max-w-2xl lg:mx-auto lg:w-full">
                {/* Back */}
                <button
                    onClick={() => router.visit('/banking/transfers')}
                    className="flex items-center gap-2 self-start text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft size={14} /> Back
                </button>

                {/* Header */}
                <header className="flex flex-col gap-1">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        External
                    </p>
                    <h1 className="text-2xl font-black tracking-tight text-foreground">
                        Send to Other Banks
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        Transfer funds to accounts in other Nigerian banks via NIP.
                    </p>
                </header>

                <form onSubmit={submit} className="flex flex-col gap-4">
                    {/* Source account */}
                    <section className="flex flex-col gap-1.5 rounded-[2rem] border border-border bg-card/50 p-5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            From
                        </span>
                        <select
                            value={form.data.source_account_number}
                            onChange={(e) => form.setData('source_account_number', e.target.value)}
                            className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary/40 focus:outline-none"
                        >
                            {accounts.map((a) => (
                                <option key={a.account_number} value={a.account_number} className="bg-background">
                                    {a.account_type.replace('_', ' ')} · {a.account_number} · {fmt(a.available_balance)}
                                </option>
                            ))}
                        </select>
                        {form.errors.source_account_number && (
                            <span className="text-xs font-semibold text-red-400">{form.errors.source_account_number}</span>
                        )}
                    </section>

                    {/* Destination */}
                    <section className="flex flex-col gap-3 rounded-[2rem] border border-border bg-card/50 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Building2 size={18} />
                            </div>
                            <div>
                                <h2 className="text-sm font-black text-foreground">Destination</h2>
                                <p className="text-[10px] text-muted-foreground">Select the recipient's bank and account.</p>
                            </div>
                        </div>

                        <label className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                Bank
                            </span>
                            <select
                                value={form.data.destination_bank_code}
                                onChange={(e) => {
                                    form.setData('destination_bank_code', e.target.value);
                                    setResolvedName(null);
                                }}
                                className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary/40 focus:outline-none"
                            >
                                <option value="" className="bg-background">
                                    Select a bank
                                </option>
                                {banks.map((b) => (
                                    <option key={b.code} value={b.code} className="bg-background">
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                Account Number
                            </span>
                            <div className="flex gap-2">
                                <input
                                    inputMode="numeric"
                                    maxLength={10}
                                    value={form.data.destination_account_number}
                                    onChange={(e) => {
                                        const v = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        form.setData('destination_account_number', v);
                                        setResolvedName(null);
                                    }}
                                    placeholder="10-digit number"
                                    className="flex-1 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={doNameEnquiry}
                                    disabled={
                                        resolving ||
                                        !form.data.destination_bank_code ||
                                        form.data.destination_account_number.length !== 10
                                    }
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all hover:bg-primary/20 disabled:opacity-40"
                                >
                                    {resolving ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <Search size={16} />
                                    )}
                                </button>
                            </div>
                        </label>

                        {/* Resolved name badge */}
                        {resolvedName && (
                            <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3">
                                <CheckCircle2 size={16} className="text-emerald-400" />
                                <span className="text-sm font-bold text-emerald-300">{resolvedName}</span>
                            </div>
                        )}
                        {resolveError && (
                            <span className="text-xs font-semibold text-red-400">{resolveError}</span>
                        )}
                    </section>

                    {/* Amount & narration */}
                    <section className="flex flex-col gap-3 rounded-[2rem] border border-border bg-card/50 p-5">
                        <label className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                Amount ({fromAccount?.currency ?? 'NGN'})
                            </span>
                            <input
                                inputMode="decimal"
                                value={form.data.amount}
                                onChange={(e) => form.setData('amount', e.target.value)}
                                placeholder="0.00"
                                className="rounded-2xl border border-border bg-background px-4 py-3 text-lg font-mono font-bold text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none"
                            />
                            {fromAccount && (
                                <span className="text-[10px] font-bold text-muted-foreground">
                                    Available: {fmt(fromAccount.available_balance)}
                                </span>
                            )}
                            {form.errors.amount && (
                                <span className="text-xs font-semibold text-red-400">{form.errors.amount}</span>
                            )}
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                Narration
                            </span>
                            <input
                                value={form.data.narration}
                                onChange={(e) => form.setData('narration', e.target.value)}
                                maxLength={100}
                                placeholder="Payment for…"
                                className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none"
                            />
                        </label>
                    </section>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={form.processing || !resolvedName}
                        className="flex items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(124,58,237,0.3)] transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
                    >
                        {form.processing ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Send size={16} strokeWidth={3} />
                        )}
                        {form.processing ? 'Processing…' : 'Send Transfer'}
                    </button>
                </form>
            </div>

            <TransferSuccessModal data={success} onDone={() => setSuccess(null)} />
        </DashboardLayout>
    );
}
