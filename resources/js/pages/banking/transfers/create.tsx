import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { formatMoney } from '@/lib/format';

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
    const { data, setData, post, processing, errors } = useForm({
        from_account_number: accounts[0]?.account_number ?? '',
        to_account_number: '',
        amount: '',
        narration: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/banking/transfers');
    };

    const fromAccount = accounts.find((a) => a.account_number === data.from_account_number);

    return (
        <AppLayout breadcrumbs={[{ title: 'Transfers', href: '/banking/transfers' }]}>
            <Head title="Transfer" />
            <div className="flex flex-1 items-start justify-center p-4">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle>Send Money</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>From Account</Label>
                                <Select value={data.from_account_number} onValueChange={(v) => setData('from_account_number', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {accounts.map((a) => (
                                            <SelectItem key={a.account_number} value={a.account_number}>
                                                {a.account_type.replace('_', ' ')} — {a.account_number} ({formatMoney(a.available_balance, a.currency)})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.from_account_number} />
                            </div>

                            <div>
                                <Label>To Account Number</Label>
                                <Input
                                    value={data.to_account_number}
                                    onChange={(e) => setData('to_account_number', e.target.value)}
                                    placeholder="10-digit account number"
                                    maxLength={10}
                                />
                                <InputError message={errors.to_account_number} />
                            </div>

                            <div>
                                <Label>Amount</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                />
                                {fromAccount && (
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Available: {formatMoney(fromAccount.available_balance, fromAccount.currency)}
                                    </p>
                                )}
                                <InputError message={errors.amount} />
                            </div>

                            <div>
                                <Label>Narration (optional)</Label>
                                <Input
                                    value={data.narration}
                                    onChange={(e) => setData('narration', e.target.value)}
                                    maxLength={100}
                                />
                                <InputError message={errors.narration} />
                            </div>

                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing ? 'Processing…' : 'Send Transfer'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
