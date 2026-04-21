import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatDateTime, formatMoney } from '@/lib/format';

interface Installment {
    sequence: number;
    due_date: string;
    principal_due: string;
    interest_due: string;
    total_due: string;
    status: string;
}

interface Loan {
    loan_id: number;
    product: string;
    principal: string;
    interest_rate: string;
    tenor_months: number;
    status: string;
    purpose: string;
    outstanding_balance: string;
    total_interest: string;
    total_paid: string;
    applied_at: string;
    approved_at?: string;
    disbursed_at?: string;
    installments: Installment[];
}

interface Props {
    loan: Loan;
}

export default function LoanShow({ loan }: Props) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Loans', href: '/banking/loans' },
                { title: `#${loan.loan_id}`, href: `/banking/loans/${loan.loan_id}` },
            ]}
        >
            <Head title={`Loan #${loan.loan_id}`} />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>{loan.product} — #{loan.loan_id}</CardTitle>
                            <Badge>{loan.status}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <Stat label="Principal" value={formatMoney(loan.principal)} />
                        <Stat label="Rate" value={`${(parseFloat(loan.interest_rate) * 100).toFixed(2)}%`} />
                        <Stat label="Tenor" value={`${loan.tenor_months} months`} />
                        <Stat label="Outstanding" value={formatMoney(loan.outstanding_balance)} />
                        <Stat label="Total Paid" value={formatMoney(loan.total_paid)} />
                        <Stat label="Interest" value={formatMoney(loan.total_interest)} />
                        <Stat label="Applied" value={formatDateTime(loan.applied_at)} />
                        <Stat label="Disbursed" value={loan.disbursed_at ? formatDateTime(loan.disbursed_at) : '—'} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Amortization Schedule</CardTitle></CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-2">#</th>
                                        <th className="pb-2">Due Date</th>
                                        <th className="pb-2">Principal</th>
                                        <th className="pb-2">Interest</th>
                                        <th className="pb-2">Total</th>
                                        <th className="pb-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loan.installments.length === 0 && (
                                        <tr><td colSpan={6} className="py-4 text-center text-muted-foreground">No installments yet.</td></tr>
                                    )}
                                    {loan.installments.map((i) => (
                                        <tr key={i.sequence} className="border-b">
                                            <td className="py-2">{i.sequence}</td>
                                            <td>{formatDate(i.due_date)}</td>
                                            <td>{formatMoney(i.principal_due)}</td>
                                            <td>{formatMoney(i.interest_due)}</td>
                                            <td className="font-semibold">{formatMoney(i.total_due)}</td>
                                            <td><Badge variant="outline" className="text-xs">{i.status}</Badge></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="text-sm font-semibold">{value}</div>
        </div>
    );
}
