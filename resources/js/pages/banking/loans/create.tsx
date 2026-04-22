import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { formatMoney } from '@/lib/format';

interface EmiResult {
    emi: string;
    total_payment: string;
    total_interest: string;
}

export default function LoanApply() {
    const { data, setData, post, processing, errors } = useForm({
        product: 'personal',
        principal: '',
        interest_rate: '0.15',
        tenor_months: '12',
        purpose: '',
        monthly_income: '',
    });

    const [emi, setEmi] = useState<EmiResult | null>(null);
    const [calculating, setCalculating] = useState(false);

    const calculate = async () => {
        if (!data.principal || !data.interest_rate || !data.tenor_months) return;
        setCalculating(true);
        try {
            const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
            const res = await fetch('/banking/loans/calculate-emi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    principal: data.principal,
                    interest_rate: data.interest_rate,
                    tenor_months: data.tenor_months,
                }),
            });
            if (res.ok) setEmi(await res.json());
        } finally {
            setCalculating(false);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/banking/loans');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Loans', href: '/banking/loans' }, { title: 'Apply', href: '/banking/loans/apply' }]}>
            <Head title="Apply for Loan" />
            <div className="grid flex-1 gap-4 p-4 md:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle>Loan Application</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>Product</Label>
                                <Select value={data.product} onValueChange={(v) => setData('product', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Personal</SelectItem>
                                        <SelectItem value="mortgage">Mortgage</SelectItem>
                                        <SelectItem value="auto">Auto</SelectItem>
                                        <SelectItem value="education">Education</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.product} />
                            </div>
                            <div>
                                <Label>Principal</Label>
                                <Input type="number" min="1000" value={data.principal} onChange={(e) => setData('principal', e.target.value)} />
                                <InputError message={errors.principal} />
                            </div>
                            <div>
                                <Label>Interest Rate (decimal, e.g. 0.15 for 15%)</Label>
                                <Input type="number" step="0.01" min="0.01" value={data.interest_rate} onChange={(e) => setData('interest_rate', e.target.value)} />
                                <InputError message={errors.interest_rate} />
                            </div>
                            <div>
                                <Label>Tenor (months)</Label>
                                <Input type="number" min="1" max="60" value={data.tenor_months} onChange={(e) => setData('tenor_months', e.target.value)} />
                                <InputError message={errors.tenor_months} />
                            </div>
                            <div>
                                <Label>Purpose</Label>
                                <Input value={data.purpose} onChange={(e) => setData('purpose', e.target.value)} />
                                <InputError message={errors.purpose} />
                            </div>
                            <div>
                                <Label>Monthly Income</Label>
                                <Input type="number" min="0" value={data.monthly_income} onChange={(e) => setData('monthly_income', e.target.value)} />
                                <InputError message={errors.monthly_income} />
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" onClick={calculate} disabled={calculating}>
                                    {calculating ? 'Calculating…' : 'Preview EMI'}
                                </Button>
                                <Button type="submit" disabled={processing} className="flex-1">
                                    {processing ? 'Submitting…' : 'Submit Application'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {emi && (
                    <Card>
                        <CardHeader><CardTitle>EMI Preview</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Monthly EMI</span>
                                <span className="font-semibold">{formatMoney(emi.emi)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Total Interest</span>
                                <span className="font-semibold">{formatMoney(emi.total_interest)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Total Payment</span>
                                <span className="font-semibold">{formatMoney(emi.total_payment)}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
