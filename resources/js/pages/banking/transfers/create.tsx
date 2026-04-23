import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { formatMoney } from '@/lib/format';
import { ArrowLeft, Send } from 'lucide-react';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

interface Account {
    account_number: string;
    account_type: string;
    balance: string;
    available_balance: string;
    currency: string;
}

interface Props {
    accounts: Account[];
}

export default function TransferCreate({ accounts }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        from_account_number: accounts[0]?.account_number ?? '',
        to_account_number: '',
        amount: '',
        narration: '',
    });
    
    const { flash } = usePage().props as { flash: { success?: any; error?: any } };

    useEffect(() => {
        if (flash?.success) {
            reset('amount', 'to_account_number', 'narration');
        }
    }, [flash]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/banking/transfers');
    };

    const fromAccount = accounts.find((a) => a.account_number === data.from_account_number);

    return (
        <DashboardLayout>
            <Head title="Transfer Money" />
            <div className="flex flex-col gap-6 px-5 pt-10 pb-10 sm:px-6 lg:px-8 xl:px-0">
                {/* Header */}
                <header className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
                    <Link href="/banking/dashboard" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-card border border-border hover:bg-muted transition-all active:scale-90">
                        <ArrowLeft size={20} className="text-foreground" />
                    </Link>
                    <h1 className="text-2xl font-black tracking-tight text-foreground">Internal Transfer</h1>
                </header>

                <div className="glass-card rounded-[2.5rem] p-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 border border-border lg:max-w-2xl lg:mx-auto lg:w-full">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Source Account</Label>
                            <Select value={data.from_account_number} onValueChange={(v) => setData('from_account_number', v)}>
                                <SelectTrigger className="h-14 rounded-2xl bg-muted/50 border-border font-medium">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border bg-card">
                                    {accounts.map((a) => (
                                        <SelectItem key={a.account_number} value={a.account_number}>
                                            {a.account_type.replace('_', ' ')} — {a.account_number} ({formatMoney(a.available_balance, a.currency)})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.from_account_number} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Destination Account</Label>
                            <Input
                                className="h-14 rounded-2xl bg-muted/50 border-border font-mono text-lg"
                                value={data.to_account_number}
                                onChange={(e) => setData('to_account_number', e.target.value)}
                                placeholder="10-digit account number"
                                maxLength={10}
                            />
                            <p className="text-[10px] font-bold text-primary/80 uppercase tracking-widest mt-1">
                                TIP: Try sending to <span className="text-foreground">1000000001</span> (Apex Reserve)
                            </p>
                            <InputError message={errors.to_account_number} />
                        </div>

                        <div className="space-y-2 relative">
                            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Amount</Label>
                            <div className="relative">
                                <span className="absolute left-4 top-4 text-muted-foreground font-black text-lg">₦</span>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    className="h-14 rounded-2xl bg-muted/50 border-border pl-10 font-black text-lg"
                                    value={data.amount}
                                    placeholder="0.00"
                                    onChange={(e) => setData('amount', e.target.value)}
                                />
                            </div>
                            {fromAccount && (
                                <p className="text-[10px] font-bold text-muted-foreground text-right uppercase tracking-widest mt-1">
                                    Available: {formatMoney(fromAccount.available_balance, fromAccount.currency)}
                                </p>
                            )}
                            <InputError message={errors.amount} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Narration (optional)</Label>
                            <Input
                                className="h-14 rounded-2xl bg-muted/50 border-border"
                                value={data.narration}
                                onChange={(e) => setData('narration', e.target.value)}
                                maxLength={100}
                                placeholder="What's this for?"
                            />
                            <InputError message={errors.narration} />
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-2 rounded-2xl h-14 bg-amber-500 text-black font-black uppercase tracking-widest hover:bg-amber-400 transition-all active:scale-95 shadow-[0_10px_30px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:active:scale-100"
                        >
                            {processing ? 'Processing...' : (
                                <>
                                    <Send size={18} strokeWidth={3} />
                                    Send Money
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
