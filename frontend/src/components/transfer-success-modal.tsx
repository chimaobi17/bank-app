import { router } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, Copy, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface TransferSuccessData {
    amount: string;
    currency: string;
    from_account_number: string;
    to_account_number: string;
    to_account_name?: string | null;
    to_bank_name?: string | null;
    reference: string;
    narration?: string | null;
    posted_at?: string | null;
    new_balance?: string | null;
}

interface Props {
    data: TransferSuccessData | null;
    onDone?: () => void;
}

export default function TransferSuccessModal({ data, onDone }: Props) {
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (data) {
            setVisible(true);
            setCopied(false);
        }
    }, [data]);

    if (!data || !visible) return null;

    const close = () => {
        setVisible(false);
        if (onDone) onDone();
    };

    const copyReference = async () => {
        try {
            await navigator.clipboard.writeText(data.reference);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            // ignore
        }
    };

    const fmt = (v: string | number) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: data.currency || 'NGN',
            minimumFractionDigits: 2,
        }).format(typeof v === 'string' ? parseFloat(v) : v);

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center">
            <div className="relative w-full max-w-md animate-in slide-in-from-bottom-8 duration-500 sm:rounded-[2.5rem] sm:zoom-in-95">
                <div className="relative overflow-hidden rounded-t-[2.5rem] border-t border-white/5 bg-neutral-950 p-6 pb-8 shadow-[0_-10px_60px_rgba(124,58,237,0.25)] sm:rounded-[2.5rem] sm:border">
                    {/* Close */}
                    <button
                        onClick={close}
                        aria-label="Close"
                        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/[0.03] text-gray-400 transition-all hover:bg-white/[0.08] hover:text-white"
                    >
                        <X size={16} />
                    </button>

                    {/* Ambient glow */}
                    <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

                    {/* Check + title */}
                    <div className="relative flex flex-col items-center gap-4 pt-4 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_40px_rgba(52,211,153,0.3)]">
                            <CheckCircle2 size={40} strokeWidth={2.5} className="text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400">
                                Transfer Successful
                            </p>
                            <h2 className="mt-2 text-4xl font-black tracking-tight text-white">
                                {fmt(data.amount)}
                            </h2>
                        </div>
                    </div>

                    {/* From → To */}
                    <div className="mt-7 flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                        <div className="flex-1 text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">From</p>
                            <p className="mt-1 font-mono text-sm font-bold text-white">
                                {data.from_account_number}
                            </p>
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <ArrowRight size={14} strokeWidth={3} />
                        </div>
                        <div className="flex-1 text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">To</p>
                            <p className="mt-1 font-mono text-sm font-bold text-white">
                                {data.to_account_number}
                            </p>
                            {data.to_account_name && (
                                <p className="truncate text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    {data.to_account_name}
                                </p>
                            )}
                            {data.to_bank_name && (
                                <p className="truncate text-[10px] font-bold text-primary/80">
                                    {data.to_bank_name}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <dl className="mt-4 grid grid-cols-1 gap-2 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-sm">
                        <DetailRow label="Reference">
                            <button
                                onClick={copyReference}
                                className="flex items-center gap-2 font-mono text-xs font-bold text-white transition-colors hover:text-primary"
                            >
                                {data.reference}
                                <Copy size={12} className={copied ? 'text-emerald-400' : 'text-gray-500'} />
                            </button>
                        </DetailRow>
                        {data.narration && <DetailRow label="Narration">{data.narration}</DetailRow>}
                        {data.posted_at && (
                            <DetailRow label="Date">
                                {new Date(data.posted_at).toLocaleString(undefined, {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                })}
                            </DetailRow>
                        )}
                        {data.new_balance != null && (
                            <DetailRow label="New Balance">
                                <span className="font-mono font-bold text-emerald-300">
                                    {fmt(data.new_balance)}
                                </span>
                            </DetailRow>
                        )}
                    </dl>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col gap-2">
                        <button
                            onClick={() => router.visit('/banking/dashboard')}
                            className="rounded-2xl bg-primary py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(124,58,237,0.3)] transition-all hover:bg-primary/90 active:scale-[0.98]"
                        >
                            Back to Dashboard
                        </button>
                        <button
                            onClick={close}
                            className="rounded-2xl border border-white/5 bg-white/[0.02] py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:bg-white/[0.05] hover:text-white"
                        >
                            New Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <dt className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</dt>
            <dd className="truncate text-right text-sm text-white">{children}</dd>
        </div>
    );
}
