import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { 
    TrendingUp, 
    TrendingDown, 
    CreditCard, 
    ArrowUpRight, 
    ArrowDownLeft, 
    History,
    Wallet,
    ArrowRight,
    CircleDollarSign
} from 'lucide-react';
import { BreadcrumbItem } from '@/types';

interface Account {
    account_id: number;
    account_number: string;
    account_type: string;
    balance: number;
    available_balance: number;
    currency: string;
    status: string;
}

interface Transaction {
    transaction_id: string;
    reference: string;
    type: string;
    amount: number;
    currency: string;
    status: string;
    narration: string;
    posted_at: string;
    direction: 'debit' | 'credit';
}

interface Props {
    accounts: Account[];
    totalBalance: string;
    recentTransactions: Transaction[];
    unreadNotifications: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Banking Overview',
        href: '/banking/dashboard',
    },
];

export default function BankingDashboard({ accounts, totalBalance, recentTransactions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Executive Dashboard" />
            
            <div className="flex flex-col gap-8 p-6 md:p-8 max-w-7xl mx-auto w-full">
                {/* Greeting & Quick Summary */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Executive <span className="text-amber-500">Overview</span></h1>
                        <p className="text-slate-500 text-sm mt-1">Real-time intelligence from your private treasury.</p>
                    </div>
                    <div className="flex gap-2">
                         <div className="bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-2xl backdrop-blur-sm">
                            <span className="text-[10px] text-slate-500 uppercase font-black block leading-none mb-1 text-right">Portfolio Value</span>
                            <span className="text-xl font-black text-white leading-none">
                                {Number(totalBalance).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                            </span>
                         </div>
                    </div>
                </div>

                {/* Main Cards Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard 
                        title="Total Liquidity" 
                        value={Number(totalBalance).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                        change="+2.4%"
                        isPositive={true}
                        icon={<Wallet className="w-5 h-5" />}
                    />
                    <StatCard 
                        title="Monthly Inflow" 
                        value="₦450,000.00"
                        change="+12.5%"
                        isPositive={true}
                        icon={<TrendingUp className="w-5 h-5" />}
                    />
                    <StatCard 
                        title="Monthly Outflow" 
                        value="₦120,500.00"
                        change="-5.2%"
                        isPositive={false}
                        icon={<TrendingDown className="w-5 h-5" />}
                    />
                    <StatCard 
                        title="Active Assets" 
                        value={accounts.length.toString()}
                        change="0.0%"
                        isPositive={true}
                        icon={<CreditCard className="w-5 h-5" />}
                    />
                </div>

                <div className="grid gap-8 lg:grid-cols-7">
                    {/* Accounts Section */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-amber-500" />
                                My Accounts
                            </h2>
                            <Link href="/banking/accounts" className="text-amber-500 text-xs font-bold hover:underline">View All</Link>
                        </div>
                        
                        <div className="grid gap-4 sm:grid-cols-2">
                            {accounts.map((account) => (
                                <AccountListItem key={account.account_id} account={account} />
                            ))}
                            {accounts.length === 0 && (
                                <div className="col-span-full py-12 border border-dashed border-slate-800 rounded-[2rem] flex flex-col items-center justify-center text-slate-500">
                                    <p className="text-sm font-medium">No active accounts found.</p>
                                    <Link href="/banking/accounts" className="mt-4 px-6 py-2 bg-amber-500 text-black font-bold text-xs rounded-full hover:bg-amber-400 transition-colors">Open Account</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent History */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <History className="w-5 h-5 text-amber-500" />
                                Recent Activity
                            </h2>
                            <Link href="/banking/transfers" className="text-slate-500 text-xs font-bold hover:text-amber-500 transition-colors">History</Link>
                        </div>

                        <div className="flex flex-col gap-1 p-2 bg-slate-900/30 border border-slate-800/50 rounded-[2rem] min-h-[400px]">
                            {recentTransactions.map((tx) => (
                                <TransactionItem key={tx.transaction_id} transaction={tx} />
                            ))}
                            {recentTransactions.length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center opacity-30">
                                    <History className="w-12 h-12 mb-4" />
                                    <p className="text-xs uppercase tracking-widest font-black">No Recent Activity</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ title, value, change, isPositive, icon }: any) {
    return (
        <div className="p-6 rounded-[2rem] bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon}
            </div>
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">{title}</p>
            <h3 className="text-2xl font-black text-white mb-3 tracking-tighter">{value}</h3>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                {change} from last month
            </div>
        </div>
    );
}

function AccountListItem({ account }: { account: Account }) {
    return (
        <Link 
            href={`/banking/accounts/${account.account_number}`}
            className="group block p-6 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all active:scale-95 shadow-lg"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <CircleDollarSign className="w-5 h-5" />
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{account.account_type}</span>
                    <p className="text-xs font-mono text-slate-400 mt-1">•••• {account.account_number.slice(-4)}</p>
                </div>
            </div>
            <div>
                <p className="text-slate-500 text-xs font-medium mb-1">Available Funds</p>
                <h4 className="text-xl font-black text-white tracking-tighter">
                    {Number(account.available_balance).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                </h4>
            </div>
        </Link>
    );
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
    const isDebit = transaction.direction === 'debit';
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-default">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isDebit ? 'bg-slate-800 text-slate-400 group-hover:bg-red-500/20 group-hover:text-red-400' : 'bg-amber-500/10 text-amber-500 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'
                }`}>
                    {isDebit ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-200 line-clamp-1">{transaction.narration || transaction.type}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-tight">
                        {new Date(transaction.posted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {transaction.status}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className={`text-sm font-black ${isDebit ? 'text-slate-400' : 'text-amber-500 group-hover:text-emerald-400'}`}>
                    {isDebit ? '-' : '+'}{Number(transaction.amount).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                </p>
            </div>
        </div>
    );
}
