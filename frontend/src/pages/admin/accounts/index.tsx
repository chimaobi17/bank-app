import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatMoney } from '@/lib/format';
import { useState } from 'react';

interface Account {
    account_id: number;
    account_number: string;
    account_type: string;
    balance: string;
    status: string;
    customer_name: string;
    opened_at: string;
}

interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    accounts: Paginated<Account>;
    filters: { status: string | null; search: string | null };
}

export default function AdminAccountsIndex({ accounts, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/accounts', { search, status: filters.status }, { preserveState: true });
    };

    const activate = (id: number) => {
        if (confirm('Activate this account?')) router.post(`/admin/accounts/${id}/activate`);
    };

    const close = (id: number) => {
        if (confirm('Close this account?')) router.post(`/admin/accounts/${id}/close`);
    };

    const statuses = ['pending', 'active', 'dormant', 'closed'];

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Accounts', href: '/admin/accounts' }]}>
            <Head title="Admin - Accounts" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Accounts</h1>

                <div className="flex flex-wrap items-center gap-2">
                    <form onSubmit={submit} className="flex gap-2">
                        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search account number" className="w-64" />
                        <Button type="submit" variant="outline">Search</Button>
                    </form>
                    <div className="ml-auto flex flex-wrap gap-2">
                        <Button variant={!filters.status ? 'default' : 'outline'} size="sm" asChild>
                            <Link href="/admin/accounts">All</Link>
                        </Button>
                        {statuses.map((s) => (
                            <Button key={s} size="sm" variant={filters.status === s ? 'default' : 'outline'} asChild>
                                <Link href={`/admin/accounts?status=${s}`}>{s}</Link>
                            </Button>
                        ))}
                    </div>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr className="text-left">
                                    <th className="p-3">Account #</th>
                                    <th className="p-3">Customer</th>
                                    <th className="p-3">Type</th>
                                    <th className="p-3">Balance</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.data.length === 0 && (
                                    <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No accounts found.</td></tr>
                                )}
                                {accounts.data.map((a) => (
                                    <tr key={a.account_id} className="border-t">
                                        <td className="p-3 font-mono">{a.account_number}</td>
                                        <td className="p-3">{a.customer_name}</td>
                                        <td className="p-3 capitalize">{a.account_type.replace('_', ' ')}</td>
                                        <td className="p-3">{formatMoney(a.balance)}</td>
                                        <td className="p-3"><Badge variant={a.status === 'active' ? 'default' : 'secondary'}>{a.status}</Badge></td>
                                        <td className="p-3">
                                            <div className="flex gap-1">
                                                {a.status === 'pending' && <Button size="sm" onClick={() => activate(a.account_id)}>Activate</Button>}
                                                {a.status === 'active' && <Button size="sm" variant="outline" onClick={() => close(a.account_id)}>Close</Button>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
