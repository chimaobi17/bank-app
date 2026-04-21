import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTime, formatMoney } from '@/lib/format';

interface Loan {
    loan_id: number;
    product: string;
    principal: string;
    interest_rate: string;
    tenor_months: number;
    status: string;
    outstanding_balance: string;
    applied_at: string;
}

interface Props {
    loans: Loan[];
}

export default function LoansIndex({ loans }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Loans', href: '/banking/loans' }]}>
            <Head title="Loans" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Loans</h1>
                        <p className="text-sm text-muted-foreground">Apply, track and manage your loan applications.</p>
                    </div>
                    <Button asChild><Link href="/banking/loans/apply">Apply for Loan</Link></Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {loans.length === 0 && (
                        <Card className="md:col-span-2">
                            <CardContent className="p-8 text-center text-muted-foreground">
                                No loans yet. Apply above.
                            </CardContent>
                        </Card>
                    )}
                    {loans.map((l) => (
                        <Link key={l.loan_id} href={`/banking/loans/${l.loan_id}`}>
                            <Card className="transition hover:shadow-md">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>{l.product}</CardTitle>
                                        <Badge variant={l.status === 'disbursed' ? 'default' : 'secondary'}>{l.status}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Principal</span>
                                        <span className="font-semibold">{formatMoney(l.principal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Outstanding</span>
                                        <span className="font-semibold">{formatMoney(l.outstanding_balance)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Rate / Tenor</span>
                                        <span>{(parseFloat(l.interest_rate) * 100).toFixed(2)}% · {l.tenor_months} mo</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Applied {formatDateTime(l.applied_at)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
