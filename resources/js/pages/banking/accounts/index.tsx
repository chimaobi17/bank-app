import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Plus, 
    PiggyBank, 
    CreditCard, 
    Lock, 
    ChevronRight, 
    ShieldCheck, 
    Info,
    ArrowUpRight,
    TrendingUp
} from 'lucide-react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { formatMoney } from '@/lib/format';

interface Account {
    account_id: number;
    account_number: string;
    account_type: string;
    balance: string;
    available_balance: string;
    currency: string;
    status: string;
}

interface Props {
    accounts: Account[];
}

export default function AccountsIndex({ accounts }: Props) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        account_type: 'savings',
        currency: 'NGN',
        lock_in_months: '',
        overdraft_limit: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/banking/accounts', {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

    const getAccountIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'savings': return <PiggyBank className="size-6 text-amber-500" />;
            case 'fixed_deposit': return <Lock className="size-6 text-amber-500" />;
            default: return <CreditCard className="size-6 text-amber-500" />;
        }
    };

    return (
        <DashboardLayout>
            <Head title="Accounts" />
            
            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-4">
                            <ShieldCheck className="size-3" /> Oracle 21c Secured
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-foreground">Treasury <span className="text-amber-500">Accounts</span></h1>
                        <p className="text-muted-foreground font-medium mt-2 max-w-xl">
                            Consolidated view of your institutional capital. Manage savings, checking, and time-locked assets.
                        </p>
                    </div>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="rounded-2xl h-14 px-8 bg-amber-500 text-black hover:bg-amber-400 font-black shadow-xl shadow-amber-500/20 transition-all active:scale-95">
                                <Plus className="mr-2 size-5" /> Open New Account
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-[2rem] border-border bg-background shadow-2xl sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black tracking-tight">Institutional Account</DialogTitle>
                                <DialogDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Select your asset configuration
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-6 pt-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest opacity-70">Account Type</Label>
                                    <Select value={data.account_type} onValueChange={(v) => setData('account_type', v)}>
                                        <SelectTrigger className="h-12 border-border rounded-xl bg-muted/30">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-border">
                                            <SelectItem value="savings">Savings (High Interest)</SelectItem>
                                            <SelectItem value="checking">Checking (Daily Transactional)</SelectItem>
                                            <SelectItem value="fixed_deposit">Fixed Deposit (Time-Locked)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.account_type} />
                                </div>

                                {data.account_type === 'fixed_deposit' && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <Label className="text-xs font-bold uppercase tracking-widest opacity-70">Lock-in Period (Months)</Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                min="1"
                                                max="60"
                                                className="h-12 border-muted-foreground/20 rounded-xl bg-muted/30 pl-10"
                                                placeholder="e.g. 12"
                                                value={data.lock_in_months}
                                                onChange={(e) => setData('lock_in_months', e.target.value)}
                                            />
                                            <Lock className="absolute left-3 top-3.5 size-5 text-amber-500/50" />
                                        </div>
                                        <InputError message={errors.lock_in_months} />
                                    </div>
                                )}

                                {data.account_type === 'checking' && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <Label className="text-xs font-bold uppercase tracking-widest opacity-70">Overdraft Limit (Optional)</Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                min="0"
                                                className="h-12 border-muted-foreground/20 rounded-xl bg-muted/30 pl-10"
                                                placeholder="0.00"
                                                value={data.overdraft_limit}
                                                onChange={(e) => setData('overdraft_limit', e.target.value)}
                                            />
                                            <TrendingUp className="absolute left-3 top-3.5 size-5 text-amber-500/50" />
                                        </div>
                                        <InputError message={errors.overdraft_limit} />
                                    </div>
                                )}

                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                                    <Info className="size-5 text-amber-500 flex-shrink-0" />
                                    <p className="text-[10px] leading-relaxed text-amber-500/80 font-bold uppercase tracking-tight">
                                        Opening this account will generate a new unique 10-digit account number on the Oracle 21c ledger.
                                    </p>
                                </div>

                                <DialogFooter>
                                    <Button type="submit" disabled={processing} className="w-full h-12 rounded-xl bg-amber-500 text-black hover:bg-amber-400 font-black">
                                        {processing ? 'Processing Provisioning…' : 'Finalize Provisioning'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Accounts Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {accounts.length === 0 && (
                        <div className="md:col-span-2 lg:col-span-3 rounded-[3rem] border-2 border-dashed border-muted p-20 text-center flex flex-col items-center gap-4 bg-muted/5">
                            <div className="bg-muted p-6 rounded-3xl">
                                <PiggyBank className="size-12 text-muted-foreground/50" />
                            </div>
                            <h2 className="text-xl font-bold">No Capital Vaults Detected</h2>
                            <p className="max-w-md text-muted-foreground text-sm font-medium">
                                You haven't initialized any accounts yet. Use the action button above to provision your first institutional vault.
                            </p>
                        </div>
                    )}
                    
                    {accounts.map((a) => (
                        <Link key={a.account_id} href={`/banking/accounts/${a.account_number}`} className="group block outline-none">
                            <Card className="relative overflow-hidden rounded-[2.5rem] border bg-card p-0 transition-all hover:shadow-2xl hover:shadow-black/50 hover:border-amber-500/40 hover:-translate-y-1">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                    {getAccountIcon(a.account_type)}
                                </div>
                                
                                <CardHeader className="p-8 pb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-muted p-2 rounded-xl group-hover:bg-amber-500/10 transition-colors">
                                                {getAccountIcon(a.account_type)}
                                            </div>
                                            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-amber-500 transition-colors">
                                                {a.account_type.replace('_', ' ')}
                                            </CardTitle>
                                        </div>
                                        <Badge 
                                            variant="outline"
                                            className={`rounded-full px-2 text-[9px] uppercase font-bold border-none ${
                                                a.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'
                                            }`}
                                        >
                                            {a.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8 pt-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-60">Account Number</span>
                                        <div className="font-mono text-lg font-medium tracking-widest text-foreground">{a.account_number}</div>
                                    </div>
                                    
                                    <div className="mt-8 flex items-end justify-between">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-60">Balance</span>
                                            <div className="text-3xl font-black tracking-tighter text-foreground">
                                                {formatMoney(a.balance, a.currency)}
                                            </div>
                                        </div>
                                        <div className="size-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                                            <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-black transition-colors" />
                                        </div>
                                    </div>

                                    {parseFloat(a.available_balance) !== parseFloat(a.balance) && (
                                        <div className="mt-6 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground p-3 rounded-2xl bg-muted/50 border border-border">
                                            <span>Available Assets</span>
                                            <span className="text-foreground">{formatMoney(a.available_balance, a.currency)}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
