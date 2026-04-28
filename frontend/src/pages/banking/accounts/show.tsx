import { Head } from '@inertiajs/react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateTime, formatMoney } from '@/lib/format';

interface Account {
    account_id: number;
    account_number: string;
    account_type: string;
    balance: string;
    available_balance: string;
    currency: string;
    status: string;
    opened_at: string;
    daily_transfer_limit: string;
    per_transaction_limit: string;
}

interface Transaction {
    transaction_id: number;
    reference: string;
    type: string;
    amount: string;
    currency: string;
    status: string;
    narration: string;
    posted_at: string;
    direction: 'debit' | 'credit';
}

interface Props {
    account: Account;
    transactions: Transaction[];
}

export default function AccountShow({ account, transactions }: Props) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Accounts', href: '/banking/accounts' },
                { title: account.account_number, href: `/banking/accounts/${account.account_number}` },
            ]}
        >
            <Head title={`Account ${account.account_number}`} />
            <div className="flex flex-1 flex-col gap-6 p-4">
                <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    <CardContent className="p-6">
                        <div className="text-xs uppercase opacity-80">
                            {account.account_type.replace('_', ' ')} · {account.status}
                        </div>
                        <div className="mt-2 font-mono text-lg">{account.account_number}</div>
                        <div className="mt-4 text-4xl font-bold">{formatMoney(account.balance, account.currency)}</div>
                        <div className="mt-1 text-sm opacity-80">
                            Available: {formatMoney(account.available_balance, account.currency)}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Daily Limit</CardTitle></CardHeader>
                        <CardContent><div className="text-xl font-bold">{formatMoney(account.daily_transfer_limit, account.currency)}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Per-Transaction Limit</CardTitle></CardHeader>
                        <CardContent><div className="text-xl font-bold">{formatMoney(account.per_transaction_limit, account.currency)}</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm">Opened</CardTitle></CardHeader>
                        <CardContent><div className="text-xl font-bold">{formatDateTime(account.opened_at)}</div></CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {transactions.length === 0 && (
                            <p className="text-sm text-muted-foreground">No transactions yet.</p>
                        )}
                        {transactions.map((t) => (
                            <div key={t.transaction_id} className="flex items-center justify-between rounded-lg border p-3">
                                <div className="flex items-center gap-3">
                                    <div className={`rounded-full p-2 ${t.direction === 'credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {t.direction === 'credit' ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{t.narration || t.type.replace('_', ' ')}</div>
                                        <div className="font-mono text-xs text-muted-foreground">{t.reference}</div>
                                        <div className="text-xs text-muted-foreground">{formatDateTime(t.posted_at)}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`font-semibold ${t.direction === 'credit' ? 'text-green-700' : 'text-red-700'}`}>
                                        {t.direction === 'credit' ? '+' : '-'}
                                        {formatMoney(t.amount, t.currency)}
                                    </div>
                                    <Badge variant="outline" className="text-xs">{t.status}</Badge>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
