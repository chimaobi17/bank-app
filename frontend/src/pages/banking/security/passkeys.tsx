import DashboardLayout from '@/layouts/dashboard-layout';
import { Head, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Fingerprint,
    Key,
    Loader2,
    Plus,
    ShieldCheck,
    Smartphone,
    Trash2,
} from 'lucide-react';
import React, { useCallback, useState } from 'react';

/* ─── Types ─── */

interface Passkey {
    credential_id: number;
    device_name: string;
    registered_at: string | null;
    last_used_at: string | null;
    is_revoked: boolean;
}

interface Props {
    passkeys: Passkey[];
    flash?: { status?: string };
}

/* ─── Page ─── */

export default function PasskeysPage({ passkeys, flash }: Props) {
    const [registering, setRegistering] = useState(false);
    const [deviceName, setDeviceName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const activePasskeys = passkeys.filter((p) => !p.is_revoked);
    const revokedPasskeys = passkeys.filter((p) => p.is_revoked);

    /* ─── Simulate WebAuthn ceremony ─── */
    const registerPasskey = useCallback(async () => {
        if (!deviceName.trim()) return;

        setRegistering(true);
        setError(null);
        setSuccess(null);

        try {
            // Step 1: Get registration options from server
            const optRes = await fetch('/banking/security/passkeys/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(
                        document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] ?? '',
                    ),
                    Accept: 'application/json',
                },
            });

            const { options } = await optRes.json();

            // Step 2: In a real implementation, this calls navigator.credentials.create().
            // For stub/mock, we simulate a successful attestation.
            const stubAttestation = {
                id: options.challenge, // Use challenge as credential handle for stub
                publicKey: btoa(crypto.getRandomValues(new Uint8Array(32)).toString()),
                format: 'packed',
            };

            // Step 3: Complete registration
            const completeRes = await fetch('/banking/security/passkeys/register/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(
                        document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] ?? '',
                    ),
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    attestation: stubAttestation,
                    device_name: deviceName.trim(),
                }),
            });

            const result = await completeRes.json();

            if (result.status === 'registered') {
                setSuccess('Passkey registered successfully.');
                setDeviceName('');
                setShowForm(false);
                router.reload({ only: ['passkeys'] });
            } else {
                setError(result.message ?? 'Registration failed.');
            }
        } catch {
            setError('Network error during registration.');
        } finally {
            setRegistering(false);
        }
    }, [deviceName]);

    /* ─── Revoke ─── */
    const revokePasskey = useCallback(async (credentialId: number) => {
        try {
            await fetch(`/banking/security/passkeys/${credentialId}/revoke`, {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(
                        document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] ?? '',
                    ),
                    Accept: 'application/json',
                },
            });
            router.reload({ only: ['passkeys'] });
        } catch {
            setError('Failed to revoke passkey.');
        }
    }, []);

    /* ─── Verify (authenticate) ─── */
    const verifyPasskey = useCallback(async () => {
        setError(null);
        setSuccess(null);

        try {
            const optRes = await fetch('/banking/security/passkeys/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(
                        document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] ?? '',
                    ),
                    Accept: 'application/json',
                },
            });
            const { options } = await optRes.json();

            if (!options.allowCredentials?.length) {
                setError('No registered passkeys to authenticate with.');
                return;
            }

            // Stub: use first available credential
            const stubAssertion = { id: options.allowCredentials[0].id };

            const verifyRes = await fetch('/banking/security/passkeys/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': decodeURIComponent(
                        document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] ?? '',
                    ),
                    Accept: 'application/json',
                },
                body: JSON.stringify({ assertion: stubAssertion }),
            });

            const result = await verifyRes.json();
            if (result.status === 'verified') {
                setSuccess('Biometric verification successful. MFA session granted.');
            } else {
                setError(result.message ?? 'Verification failed.');
            }
        } catch {
            setError('Network error during verification.');
        }
    }, []);

    return (
        <DashboardLayout>
            <Head title="Passkeys" />

            <div className="flex flex-col gap-6 px-5 pt-10 pb-10 sm:px-6 lg:px-8 xl:px-0 lg:max-w-3xl lg:mx-auto lg:w-full">
                <button
                    onClick={() => router.visit('/banking/dashboard')}
                    className="flex items-center gap-2 self-start text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white"
                >
                    <ArrowLeft size={14} /> Dashboard
                </button>

                <header className="flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                            Security
                        </p>
                        <h1 className="text-2xl font-black tracking-tight text-white">Passkeys</h1>
                        <p className="text-xs text-gray-500">
                            Use biometric authentication for quick, secure logins and MFA.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm((v) => !v)}
                        className="flex h-10 items-center gap-2 rounded-2xl bg-primary/10 px-4 text-xs font-black uppercase tracking-widest text-primary transition-all hover:bg-primary/20"
                    >
                        <Plus size={14} strokeWidth={3} /> Add
                    </button>
                </header>

                {/* Notifications */}
                {flash?.status && (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-300">
                        {flash.status}
                    </div>
                )}
                {success && (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-300">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-semibold text-red-300">
                        {error}
                    </div>
                )}

                {/* Register form */}
                {showForm && (
                    <section className="flex flex-col gap-3 rounded-[2rem] border border-white/5 bg-white/[0.02] p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Fingerprint size={18} />
                            </div>
                            <div>
                                <h2 className="text-sm font-black text-white">Register a New Passkey</h2>
                                <p className="text-[10px] text-gray-500">
                                    Name this device (e.g. "iPhone", "MacBook Pro").
                                </p>
                            </div>
                        </div>

                        <input
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                            placeholder="Device name"
                            maxLength={100}
                            className="rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-primary/40 focus:outline-none"
                        />

                        <button
                            onClick={registerPasskey}
                            disabled={registering || !deviceName.trim()}
                            className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(124,58,237,0.3)] transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
                        >
                            {registering ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <Key size={14} />
                            )}
                            {registering ? 'Registering…' : 'Register Passkey'}
                        </button>
                    </section>
                )}

                {/* Quick verify button */}
                {activePasskeys.length > 0 && (
                    <button
                        onClick={verifyPasskey}
                        className="flex items-center justify-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] py-4 text-xs font-black uppercase tracking-widest text-emerald-400 transition-all hover:bg-emerald-500/[0.12]"
                    >
                        <ShieldCheck size={18} /> Verify with Passkey (Grant MFA)
                    </button>
                )}

                {/* Active passkeys */}
                <section className="flex flex-col gap-3">
                    <h3 className="text-sm font-black text-white">
                        Active ({activePasskeys.length})
                    </h3>

                    {activePasskeys.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
                            <Fingerprint size={28} className="text-gray-600" />
                            <p className="text-sm font-bold text-white">No passkeys registered</p>
                            <p className="text-xs text-gray-500">Add a passkey above to enable biometric login.</p>
                        </div>
                    ) : (
                        activePasskeys.map((p) => (
                            <div
                                key={p.credential_id}
                                className="flex items-center justify-between rounded-[2rem] border border-white/5 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.04]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                                        <Smartphone size={18} />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-sm font-bold text-white">{p.device_name}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                                            Registered{' '}
                                            {p.registered_at
                                                ? new Date(p.registered_at).toLocaleDateString()
                                                : '—'}
                                            {p.last_used_at && (
                                                <>
                                                    {' · Last used '}
                                                    {new Date(p.last_used_at).toLocaleDateString()}
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => revokePasskey(p.credential_id)}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-all hover:bg-red-500/10 hover:text-red-400"
                                    title="Revoke"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </section>

                {/* Revoked passkeys */}
                {revokedPasskeys.length > 0 && (
                    <section className="flex flex-col gap-3">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            Revoked ({revokedPasskeys.length})
                        </h3>
                        {revokedPasskeys.map((p) => (
                            <div
                                key={p.credential_id}
                                className="flex items-center gap-3 rounded-[2rem] border border-white/5 bg-white/[0.01] p-4 opacity-50"
                            >
                                <Smartphone size={16} className="text-gray-600" />
                                <span className="text-xs font-bold text-gray-400">{p.device_name}</span>
                                <span className="ml-auto text-[9px] font-bold text-red-400">Revoked</span>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </DashboardLayout>
    );
}
