import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTime, formatMoney } from '@/lib/format';

interface Loan {
    loan_id: number;
    product: string;
    principal: string;
    tenor_months: number;
    status: string;
    customer_name: string;
    applied_at: string;
}

interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    loans: Paginated<Loan>;
    filters: { status: string | null };
}

export default function AdminLoansIndex({ loans, filters }: Props) {
    const statuses = ['submitted', 'approved', 'rejected', 'disbursed', 'closed'];

    const approve = (id: number) => {
        if (confirm('Approve this loan and generate amortization schedule?')) {
            router.post(`/admin/loans/${id}/approve`);
        }
    };

    const reject = (id: number) => {
        if (confirm('Reject this loan application?')) {
            router.post(`/admin/loans/${id}/reject`);
        }
    };

    const disburse = (id: number) => {
        if (confirm('Disburse this loan to the customer account?')) {
            router.post(`/admin/loans/${id}/disburse`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Loans', href: '/admin/loans' }]}>
            <Head title="Admin - Loans" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Loan Management</h1>

                <div className="flex flex-wrap gap-2">
                    <Button variant={!filters.status ? 'default' : 'outline'} size="sm" asChild>
                        <Link href="/admin/loans">All</Link>
                    </Button>
                    {statuses.map((s) => (
                        <Button key={s} variant={filters.status === s ? 'default' : 'outline'} size="sm" asChild>
                            <Link href={`/admin/loans?status=${s}`}>{s}</Link>
                        </Button>
                    ))}
                </div>

                <Card>
                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr className="text-left">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Customer</th>
                                    <th className="p-3">Product</th>
                                    <th className="p-3">Principal</th>
                                    <th className="p-3">Tenor</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Applied</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.data.length === 0 && (
                                    <tr><td colSpan={8} className="py-8 text-center text-muted-foreground">No loans found.</td></tr>
                                )}
                                {loans.data.map((l) => (
                                    <tr key={l.loan_id} className="border-t">
                                        <td className="p-3">#{l.loan_id}</td>
                                        <td className="p-3">{l.customer_name}</td>
                                        <td className="p-3">{l.product}</td>
                                        <td className="p-3">{formatMoney(l.principal)}</td>
                                        <td className="p-3">{l.tenor_months} mo</td>
                                        <td className="p-3"><Badge>{l.status}</Badge></td>
                                        <td className="p-3 text-xs">{formatDateTime(l.applied_at)}</td>
                                        <td className="p-3">
                                            <div className="flex gap-1">
                                                {l.status === 'submitted' && (
                                                    <>
                                                        <Button size="sm" onClick={() => approve(l.loan_id)}>Approve</Button>
                                                        <Button size="sm" variant="outline" onClick={() => reject(l.loan_id)}>Reject</Button>
                                                    </>
                                                )}
                                                {l.status === 'approved' && (
                                                    <Button size="sm" onClick={() => disburse(l.loan_id)}>Disburse</Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {loans.last_page > 1 && (
                    <div className="flex flex-wrap gap-1">
                        {loans.links.map((link, i) => (
                            <Button
                                key={i}
                                size="sm"
                                variant={link.active ? 'default' : 'outline'}
                                disabled={!link.url}
                                asChild={!!link.url}
                            >
                                {link.url ? <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} /> : <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
