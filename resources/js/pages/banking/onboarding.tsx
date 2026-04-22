import DashboardLayout from '@/layouts/dashboard-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { CheckCircle2, Circle, FileCheck, IdCard, ShieldCheck, UserRound } from 'lucide-react';
import React from 'react';

type StepKey = 'profile' | 'id_verification' | 'address_proof' | 'review';

interface Props {
    user: { username: string; email: string; name: string };
    customer: {
        customer_id: number;
        full_name: string;
        kyc_status: string | null;
        has_id_doc: boolean;
        has_address_doc: boolean;
        kyc_verified_at: string | null;
    } | null;
    currentStep: StepKey;
    steps: StepKey[];
    flash?: { status?: string };
}

const STEP_META: Record<StepKey, { label: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
    profile: { label: 'Profile', icon: UserRound },
    id_verification: { label: 'Identity', icon: IdCard },
    address_proof: { label: 'Address', icon: FileCheck },
    review: { label: 'Review', icon: ShieldCheck },
};

export default function Onboarding({ user, customer, currentStep, steps, flash }: Props) {
    const identity = useForm({
        document_type: 'BVN' as 'BVN' | 'NIN' | 'PASSPORT',
        document_number: '',
        first_name: customer?.full_name?.split(' ')[0] ?? '',
        last_name: customer?.full_name?.split(' ').slice(1).join(' ') ?? '',
        country: 'NG',
    });

    const address = useForm<{ document: File | null }>({ document: null });

    const submitIdentity = (e: React.FormEvent) => {
        e.preventDefault();
        identity.post('/banking/onboarding/identity', {
            preserveScroll: true,
        });
    };

    const submitAddress = (e: React.FormEvent) => {
        e.preventDefault();
        address.post('/banking/onboarding/address', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const stepIndex = steps.indexOf(currentStep);

    return (
        <DashboardLayout>
            <Head title="KYC Onboarding" />

            <div className="flex flex-col gap-8 px-6 pt-10 pb-10">
                <header className="flex flex-col gap-2">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                        Account Verification
                    </p>
                    <h1 className="text-3xl font-black tracking-tight text-white">
                        Hi <span className="text-primary">@{user.username}</span>, let's verify you
                    </h1>
                    <p className="text-sm text-gray-400">
                        A few quick steps to unlock transfers, loans, and cards.
                    </p>
                </header>

                {flash?.status && (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-300">
                        {flash.status}
                    </div>
                )}

                {/* Stepper */}
                <ol className="flex items-center gap-2">
                    {steps.map((s, i) => {
                        const Icon = STEP_META[s].icon;
                        const done = i < stepIndex || (customer?.kyc_status === 'verified');
                        const active = i === stepIndex;
                        return (
                            <li key={s} className="flex flex-1 flex-col items-center gap-2">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-all ${
                                        done
                                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                            : active
                                              ? 'border-primary/40 bg-primary/10 text-primary shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                                              : 'border-white/5 bg-white/[0.02] text-gray-600'
                                    }`}
                                >
                                    {done ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                                </div>
                                <span
                                    className={`text-[10px] font-black uppercase tracking-widest ${
                                        active ? 'text-white' : 'text-gray-600'
                                    }`}
                                >
                                    {STEP_META[s].label}
                                </span>
                            </li>
                        );
                    })}
                </ol>

                {/* Customer profile summary */}
                <section className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                Customer Profile
                            </p>
                            <p className="text-base font-bold text-white">
                                {customer?.full_name ?? 'No customer linked'}
                            </p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <KycBadge status={customer?.kyc_status ?? 'not_started'} />
                    </div>
                </section>

                {/* Identity step */}
                {currentStep === 'id_verification' || currentStep === 'profile' ? (
                    <form
                        onSubmit={submitIdentity}
                        className="flex flex-col gap-4 rounded-[2rem] border border-white/5 bg-white/[0.02] p-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <IdCard size={18} />
                            </div>
                            <div>
                                <h2 className="text-base font-black text-white">Identity Verification</h2>
                                <p className="text-xs text-gray-500">BVN, NIN, or International Passport.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {(['BVN', 'NIN', 'PASSPORT'] as const).map((t) => (
                                <button
                                    type="button"
                                    key={t}
                                    onClick={() => identity.setData('document_type', t)}
                                    className={`rounded-2xl border px-3 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                                        identity.data.document_type === t
                                            ? 'border-primary/40 bg-primary/10 text-primary'
                                            : 'border-white/5 bg-white/[0.02] text-gray-400 hover:bg-white/[0.04]'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                Document Number
                            </span>
                            <input
                                inputMode="numeric"
                                autoComplete="off"
                                value={identity.data.document_number}
                                onChange={(e) => identity.setData('document_number', e.target.value)}
                                className="rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-primary/40 focus:outline-none"
                                placeholder={identity.data.document_type === 'PASSPORT' ? 'A01234567' : '12345678901'}
                            />
                            {identity.errors.document_number && (
                                <span className="text-xs font-semibold text-red-400">
                                    {identity.errors.document_number}
                                </span>
                            )}
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                    First Name
                                </span>
                                <input
                                    value={identity.data.first_name}
                                    onChange={(e) => identity.setData('first_name', e.target.value)}
                                    className="rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                                />
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                    Last Name
                                </span>
                                <input
                                    value={identity.data.last_name}
                                    onChange={(e) => identity.setData('last_name', e.target.value)}
                                    className="rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={identity.processing}
                            className="mt-2 rounded-2xl bg-primary py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(124,58,237,0.3)] transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
                        >
                            {identity.processing ? 'Verifying…' : 'Verify Identity'}
                        </button>
                    </form>
                ) : null}

                {/* Address step */}
                {currentStep === 'address_proof' && (
                    <form
                        onSubmit={submitAddress}
                        className="flex flex-col gap-4 rounded-[2rem] border border-white/5 bg-white/[0.02] p-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <FileCheck size={18} />
                            </div>
                            <div>
                                <h2 className="text-base font-black text-white">Proof of Address</h2>
                                <p className="text-xs text-gray-500">
                                    Utility bill, bank statement, or tenancy agreement (PDF / JPG / PNG · max 4 MB).
                                </p>
                            </div>
                        </div>

                        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-white/10 bg-black/40 px-4 py-10 text-center transition-all hover:border-primary/30">
                            <span className="text-sm font-bold text-white">
                                {address.data.document?.name ?? 'Tap to choose a file'}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                                PDF · JPG · PNG
                            </span>
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => address.setData('document', e.target.files?.[0] ?? null)}
                            />
                        </label>
                        {address.errors.document && (
                            <span className="text-xs font-semibold text-red-400">{address.errors.document}</span>
                        )}

                        <button
                            type="submit"
                            disabled={address.processing || !address.data.document}
                            className="rounded-2xl bg-primary py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(124,58,237,0.3)] transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
                        >
                            {address.processing ? 'Uploading…' : 'Upload Document'}
                        </button>
                    </form>
                )}

                {/* Review step */}
                {currentStep === 'review' && (
                    <section className="flex flex-col gap-3 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/[0.03] p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                                <ShieldCheck size={18} />
                            </div>
                            <div>
                                <h2 className="text-base font-black text-white">
                                    {customer?.kyc_status === 'verified' ? 'You are fully verified' : 'Under review'}
                                </h2>
                                <p className="text-xs text-gray-500">
                                    {customer?.kyc_status === 'verified'
                                        ? `Verified on ${customer.kyc_verified_at?.slice(0, 10)}.`
                                        : 'An admin will approve your profile shortly.'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => router.visit('/banking/dashboard')}
                            className="mt-2 rounded-2xl border border-white/5 bg-white/[0.02] py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white/[0.04]"
                        >
                            Back to Dashboard
                        </button>
                    </section>
                )}
            </div>
        </DashboardLayout>
    );
}

function KycBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        verified: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
        pending: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
        rejected: 'border-red-500/30 bg-red-500/10 text-red-300',
        not_started: 'border-white/5 bg-white/[0.02] text-gray-400',
    };

    return (
        <div
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                styles[status] ?? styles.not_started
            }`}
        >
            <Circle size={8} className="fill-current" />
            {status.replace('_', ' ')}
        </div>
    );
}
