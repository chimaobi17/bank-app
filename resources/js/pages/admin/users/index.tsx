import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDateTime } from '@/lib/format';

interface User {
    user_id: number;
    username: string;
    email: string;
    phone: string;
    status: string | null;
    customer_name: string | null;
    kyc_status: string | null;
    roles: string[];
    created_at: string;
}

interface Paginated<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    last_page: number;
}

interface Props {
    users: Paginated<User>;
    filters: { search: string | null };
}

export default function AdminUsersIndex({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/users', { search }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Users', href: '/admin/users' }]}>
            <Head title="Admin - Users" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Users</h1>

                <form onSubmit={submit} className="flex gap-2">
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search username or email" className="w-80" />
                    <Button type="submit" variant="outline">Search</Button>
                </form>

                <Card>
                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr className="text-left">
                                    <th className="p-3">Username</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">KYC</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Roles</th>
                                    <th className="p-3">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.length === 0 && (
                                    <tr><td colSpan={7} className="py-8 text-center text-muted-foreground">No users found.</td></tr>
                                )}
                                {users.data.map((u) => (
                                    <tr key={u.user_id} className="border-t">
                                        <td className="p-3 font-medium">{u.username}</td>
                                        <td className="p-3">{u.customer_name ?? '—'}</td>
                                        <td className="p-3 text-xs">{u.email}</td>
                                        <td className="p-3">
                                            {u.kyc_status ? <Badge variant="outline">{u.kyc_status}</Badge> : '—'}
                                        </td>
                                        <td className="p-3"><Badge>{u.status ?? '—'}</Badge></td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {u.roles.map((r) => <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>)}
                                            </div>
                                        </td>
                                        <td className="p-3 text-xs">{formatDateTime(u.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {users.last_page > 1 && (
                    <div className="flex flex-wrap gap-1">
                        {users.links.map((link, i) => (
                            <Button key={i} size="sm" variant={link.active ? 'default' : 'outline'} disabled={!link.url} asChild={!!link.url}>
                                {link.url ? <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} /> : <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
