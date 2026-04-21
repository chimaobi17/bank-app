import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { formatDateTime, formatMoney } from '@/lib/format';

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

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/banking/payments/${mode}`, { onSuccess: () => reset('amount', 'recipient_identifier', 'narration') });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Payments', href: '/banking/payments' }]}>
            <Head title="Payments" />
            <div className="grid flex-1 gap-4 p-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>New Payment</CardTitle>
                        <div className="flex gap-2 pt-2">
                            <Button size="sm" variant={mode === 'bill' ? 'default' : 'outline'} onClick={() => { setMode('bill'); setData('payment_type', 'bill'); }}>Bill</Button>
                            <Button size="sm" variant={mode === 'airtime' ? 'default' : 'outline'} onClick={() => { setMode('airtime'); setData('payment_type', 'airtime'); }}>Airtime</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>From Account</Label>
                                <Select value={data.account_id} onValueChange={(v) => setData('account_id', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
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
                                <div>
                                    <Label>Biller</Label>
                                    <Select value={data.biller_id} onValueChange={(v) => setData('biller_id', v)}>
                                        <SelectTrigger><SelectValue placeholder="Select biller" /></SelectTrigger>
                                        <SelectContent>
                                            {billers.map((b) => (
                                                <SelectItem key={b.biller_id} value={b.biller_id.toString()}>{b.name} ({b.category})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.biller_id} />
                                </div>
                            )}

                            <div>
                                <Label>{mode === 'airtime' ? 'Phone Number' : 'Account/Meter/Customer ID'}</Label>
                                <Input
                                    value={data.recipient_identifier}
                                    onChange={(e) => setData('recipient_identifier', e.target.value)}
                                />
                                <InputError message={errors.recipient_identifier} />
                            </div>

                            <div>
                                <Label>Amount</Label>
                                <Input type="number" step="0.01" min="50" value={data.amount} onChange={(e) => setData('amount', e.target.value)} />
                                <InputError message={errors.amount} />
                            </div>

                            {mode === 'bill' && (
                                <div>
                                    <Label>Narration</Label>
                                    <Input value={data.narration} onChange={(e) => setData('narration', e.target.value)} maxLength={100} />
                                    <InputError message={errors.narration} />
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing ? 'Processing…' : `Pay ${mode === 'airtime' ? 'Airtime' : 'Bill'}`}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Recent Payments</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        {payments.length === 0 && (
                            <p className="text-sm text-muted-foreground">No payments yet.</p>
                        )}
                        {payments.map((p) => (
                            <div key={p.payment_id} className="flex items-center justify-between rounded-lg border p-3">
                                <div>
                                    <div className="text-sm font-medium capitalize">{p.payment_type} — {p.biller ?? p.recipient_identifier}</div>
                                    <div className="text-xs text-muted-foreground">{formatDateTime(p.created_at)}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold">{formatMoney(p.amount, p.currency)}</div>
                                    <Badge variant="outline" className="text-xs">{p.status}</Badge>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
