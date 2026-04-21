import { Head, Link } from '@inertiajs/react';
import { Activity, CreditCard, TrendingUp, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/lib/format';

interface Stats {
    users_total: number;
    accounts_total: number;
    accounts_pending: number;
    transactions_today: number;
    transaction_volume_today: string;
    loans_pending: number;
    loans_approved: number;
    loans_disbursed: number;
}

interface Props {
    stats: Stats;
}

export default function AdminDashboard({ stats }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Admin', href: '/admin' }]}>
            <Head title="Admin Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Admin Overview</h1>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard icon={<Users className="size-5" />} label="Total Users" value={stats.users_total.toString()} href="/admin/users" />
                    <StatCard icon={<CreditCard className="size-5" />} label="Accounts" value={stats.accounts_total.toString()} subtitle={`${stats.accounts_pending} pending`} href="/admin/accounts" />
                    <StatCard icon={<Activity className="size-5" />} label="Transactions Today" value={stats.transactions_today.toString()} subtitle={formatMoney(stats.transaction_volume_today)} />
                    <StatCard icon={<TrendingUp className="size-5" />} label="Pending Loans" value={stats.loans_pending.toString()} subtitle={`${stats.loans_approved} approved`} href="/admin/loans?status=submitted" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <QuickLink href="/admin/accounts?status=pending" label="Pending Account Activations" count={stats.accounts_pending} />
                            <QuickLink href="/admin/loans?status=submitted" label="Loan Applications Awaiting Review" count={stats.loans_pending} />
                            <QuickLink href="/admin/loans?status=approved" label="Approved Loans Awaiting Disbursement" count={stats.loans_approved} />
                            <QuickLink href="/admin/audit" label="Audit Log" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Loan Pipeline</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <PipelineRow label="Submitted" value={stats.loans_pending} />
                            <PipelineRow label="Approved" value={stats.loans_approved} />
                            <PipelineRow label="Disbursed" value={stats.loans_disbursed} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ icon, label, value, subtitle, href }: { icon: React.ReactNode; label: string; value: string; subtitle?: string; href?: string }) {
    const content = (
        <Card className="transition hover:shadow-md">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                    {icon}
                    <CardTitle className="text-sm">{label}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
            </CardContent>
        </Card>
    );
    return href ? <Link href={href}>{content}</Link> : content;
}

function QuickLink({ href, label, count }: { href: string; label: string; count?: number }) {
    return (
        <Link href={href} className="flex items-center justify-between rounded-lg border p-3 transition hover:bg-muted">
            <span className="text-sm">{label}</span>
            {count !== undefined && <span className="font-semibold">{count}</span>}
        </Link>
    );
}

function PipelineRow({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-lg font-semibold">{value}</span>
        </div>
    );
}
