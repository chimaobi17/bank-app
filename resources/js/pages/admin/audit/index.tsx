import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/lib/format';

interface AuditLog {
    id: number;
    action: string;
    entity_type: string;
    entity_id: number;
    actor: string | null;
    ip_address: string | null;
    created_at: string;
    before: Record<string, unknown> | null;
    after: Record<string, unknown> | null;
}

interface Paginated<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    last_page: number;
}

interface Props {
    logs: Paginated<AuditLog>;
    filters: { entity: string | null; action: string | null };
}

export default function AdminAuditIndex({ logs }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }, { title: 'Audit Log', href: '/admin/audit' }]}>
            <Head title="Audit Log" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Audit Log</h1>

                <Card>
                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr className="text-left">
                                    <th className="p-3">When</th>
                                    <th className="p-3">Actor</th>
                                    <th className="p-3">Action</th>
                                    <th className="p-3">Entity</th>
                                    <th className="p-3">IP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.data.length === 0 && (
                                    <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No audit entries.</td></tr>
                                )}
                                {logs.data.map((log) => (
                                    <tr key={log.id} className="border-t">
                                        <td className="p-3 text-xs">{formatDateTime(log.created_at)}</td>
                                        <td className="p-3">{log.actor ?? 'system'}</td>
                                        <td className="p-3"><Badge variant="outline">{log.action}</Badge></td>
                                        <td className="p-3 font-mono text-xs">{log.entity_type}#{log.entity_id}</td>
                                        <td className="p-3 font-mono text-xs">{log.ip_address ?? '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {logs.last_page > 1 && (
                    <div className="flex flex-wrap gap-1">
                        {logs.links.map((link, i) => (
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
