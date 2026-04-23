import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { formatDateTime, formatMoney } from '@/lib/format';
import { ArrowLeft, Smartphone, Zap, Droplets, Tv, Wifi } from 'lucide-react';

interface Account {
    account_id: number;
    account_number: string;
    account_type: string;
    balance: string;
}

interface Biller {
    biller_id: number;
    name: string;
    category: string;
}

interface Payment {
    payment_id: number;
    payment_type: string;
    amount: string;
    currency: string;
    status: string;
    recipient_identifier: string;
    narration: string;
    biller: string | null;
    created_at: string;
}

interface Props {
    payments: Payment[];
    accounts: Account[];
    billers: Biller[];
}

export default function PaymentsIndex({ payments, accounts, billers }: Props) {
    const [mode, setMode] = useState<'bill' | 'airtime'>('bill');

    const { data, setData, post, processing, errors, reset } = useForm({
        account_id: accounts[0]?.account_id?.toString() ?? '',
        biller_id: '',
        payment_type: 'bill',
        amount: '',
        recipient_identifier: '',
        narration: '',
    });

    const { flash } = usePage().props as { flash: { success?: any; error?: any } };

    useEffect(() => {
        if (flash?.success) {
            reset('amount', 'recipient_identifier', 'narration');
        }
    }, [flash]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/banking/payments/${mode}`);
    };

    const categories = [
        { id: 'airtime', name: 'Airtime', icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 'bill', name: 'Electricity', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
        { id: 'water', name: 'Water', icon: Droplets, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
        { id: 'tv', name: 'TV', icon: Tv, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { id: 'internet', name: 'Internet', icon: Wifi, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    const getIcon = (type: string) => {
        switch(type.toLowerCase()) {
            case 'airtime': return <Smartphone className="size-5 text-blue-500" />;
            default: return <Zap className="size-5 text-amber-500" />;
        }
    };

    return (
        <DashboardLayout>
            <Head title="Payments & Bills" />
            
            <div className="flex flex-col gap-6 px-5 pt-10 pb-10 sm:px-6 lg:px-8 xl:px-0">
                {/* Header */}
                <header className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
                    <Link href="/banking/dashboard" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-card border border-border hover:bg-muted transition-all active:scale-90">
                        <ArrowLeft size={20} className="text-foreground" />
                    </Link>
                    <h1 className="text-2xl font-black tracking-tight text-foreground">Bills & Payments</h1>
                </header>

                {/* Quick Categories */}
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 animate-in fade-in slide-in-from-right-4 duration-700">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setMode(cat.id === 'airtime' ? 'airtime' : 'bill');
                                setData('payment_type', cat.id === 'airtime' ? 'airtime' : 'bill');
                            }}
                            className={`flex flex-col items-center gap-2 min-w-[72px] transition-all active:scale-95 ${
                                (mode === 'airtime' && cat.id === 'airtime') || (mode === 'bill' && cat.id !== 'airtime')
                                    ? 'opacity-100 scale-105' 
                                    : 'opacity-50 hover:opacity-80'
                            }`}
                        >
                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${cat.bg} border border-border`}>
                                <cat.icon className={`size-7 ${cat.color}`} />
                            </div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Desktop: side-by-side form + history */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">

                <div className="glass-card rounded-[2.5rem] p-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 border border-border">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pay From</Label>
                            <Select value={data.account_id} onValueChange={(v) => setData('account_id', v)}>
                                <SelectTrigger className="h-14 rounded-2xl bg-muted/50 border-border font-medium">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border bg-card">
                                    {accounts.map((a) => (
                                        <SelectItem key={a.account_id} value={a.account_id.toString()}>
                                            {a.account_type.replace('_', ' ')} — {a.account_number} ({formatMoney(a.balance)})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.account_id} />
                        </div>

                        {mode === 'bill' && (
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Biller</Label>
                                <Select value={data.biller_id} onValueChange={(v) => setData('biller_id', v)}>
                                    <SelectTrigger className="h-14 rounded-2xl bg-muted/50 border-border font-medium">
                                        <SelectValue placeholder="Select biller" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-border bg-card">
                                        {billers.map((b) => (
                                            <SelectItem key={b.biller_id} value={b.biller_id.toString()}>
                                                {b.name} ({b.category})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.biller_id} />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                {mode === 'airtime' ? 'Phone Number' : 'Account / Meter / Beneficiary ID'}
                            </Label>
                            <Input
                                className="h-14 rounded-2xl bg-muted/50 border-border font-mono text-lg"
                                value={data.recipient_identifier}
                                onChange={(e) => setData('recipient_identifier', e.target.value)}
                                placeholder={mode === 'airtime' ? '080...' : '123456789'}
                            />
                            <InputError message={errors.recipient_identifier} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Amount</Label>
                            <div className="relative">
                                <span className="absolute left-4 top-4 text-muted-foreground font-black text-lg">₦</span>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="50"
                                    className="h-14 rounded-2xl bg-muted/50 border-border pl-10 font-black text-lg"
                                    value={data.amount}
                                    placeholder="0.00"
                                    onChange={(e) => setData('amount', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.amount} />
                        </div>

                        {mode === 'bill' && (
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Narration (optional)</Label>
                                <Input
                                    className="h-14 rounded-2xl bg-muted/50 border-border"
                                    value={data.narration}
                                    onChange={(e) => setData('narration', e.target.value)}
                                    maxLength={100}
                                />
                                <InputError message={errors.narration} />
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-2 rounded-2xl h-14 bg-amber-500 text-black font-black uppercase tracking-widest hover:bg-amber-400 transition-all active:scale-95 shadow-[0_10px_30px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:active:scale-100"
                        >
                            {processing ? 'Processing...' : `Pay ${mode === 'airtime' ? 'Airtime' : 'Bill'}`}
                        </button>
                    </form>
                </div>

                {/* History */}
                <div className="mt-4 lg:mt-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <h3 className="text-lg font-black tracking-tight text-foreground mb-4">Recent Payments</h3>
                    <div className="flex flex-col gap-3">
                        {payments.length === 0 && (
                            <div className="rounded-[2rem] border-2 border-dashed border-border p-10 text-center flex flex-col items-center gap-2">
                                <p className="text-sm font-bold text-foreground">No recent payments</p>
                                <p className="text-xs text-muted-foreground">Your bill history will appear here.</p>
                            </div>
                        )}
                        {payments.map((p) => (
                            <div key={p.payment_id} className="flex items-center justify-between rounded-3xl border border-border bg-card p-5 group hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted group-hover:bg-card transition-colors">
                                        {getIcon(p.payment_type)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-foreground capitalize">{p.payment_type === 'bill' ? (p.biller ?? 'Bill') : 'Airtime'}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">
                                            {formatDateTime(p.created_at)}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-black text-foreground">{formatMoney(p.amount, p.currency)}</div>
                                    <Badge variant="outline" className={`mt-1 text-[9px] uppercase font-black border-border ${p.status === 'successful' ? 'text-green-500' : 'text-amber-500'}`}>
                                        {p.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                </div> {/* End desktop two column */}
            </div>
        </DashboardLayout>
    );
}
