import { Head, router } from '@inertiajs/react';
import { Bell, Check, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '@/layouts/dashboard-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/lib/format';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Notification {
    notification_id: number;
    channel: string;
    category: string;
    subject: string;
    body: string;
    status: string;
    read_at: string | null;
    created_at: string;
}

interface Props {
    notifications: Notification[];
}

export default function NotificationsIndex({ notifications }: Props) {
    const markAllAsRead = () => router.post('/banking/notifications/read-all');
    const markAsRead = (id: number) => router.post(`/banking/notifications/${id}/read`);

    const unreadCount = notifications.filter((n) => !n.read_at).length;

    const getIcon = (category: string) => {
        switch(category.toLowerCase()) {
            case 'security': return <div className="p-3 rounded-2xl bg-red-500/10 text-red-500"><Bell size={20} /></div>;
            case 'transaction': return <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500"><Bell size={20} /></div>;
            default: return <div className="p-3 rounded-2xl bg-primary/10 text-primary"><Bell size={20} /></div>;
        }
    };

    return (
        <DashboardLayout>
            <Head title="Notifications" />

            <div className="flex flex-col gap-6 px-6 pt-10 pb-10">
                <header className="flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex items-center gap-4">
                        <Link href="/banking/dashboard" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-card border border-border hover:bg-muted transition-all active:scale-90">
                            <ArrowLeft size={20} className="text-foreground" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-foreground">Inbox</h1>
                            <p className="text-xs text-muted-foreground font-bold">{unreadCount} unread message{unreadCount !== 1 && 's'}</p>
                        </div>
                    </div>
                    {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                            <CheckCircle2 size={14} /> Mark All Read
                        </button>
                    )}
                </header>

                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    {notifications.length === 0 && (
                        <div className="rounded-[2.5rem] border-2 border-dashed border-border p-12 text-center flex flex-col items-center gap-4 bg-card/20">
                            <div className="bg-muted p-6 rounded-3xl opacity-50">
                                <Bell className="size-10 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-foreground">You're all caught up</p>
                                <p className="text-xs text-muted-foreground">No new notifications right now.</p>
                            </div>
                        </div>
                    )}
                    {notifications.map((n) => (
                        <div
                            key={n.notification_id}
                            className={`flex flex-col gap-3 rounded-3xl border p-5 transition-all ${
                                !n.read_at ? 'bg-card border-primary/20 shadow-lg shadow-primary/5' : 'bg-card/50 border-border opacity-70'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                {getIcon(n.category)}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`font-bold text-sm ${!n.read_at ? 'text-foreground' : 'text-foreground/80'}`}>{n.subject}</h3>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            {formatDateTime(n.created_at)}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{n.body}</p>
                                    
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className={`text-[9px] uppercase font-black ${!n.read_at ? 'border-primary/20 text-primary bg-primary/5' : 'border-border'}`}>
                                                {n.category}
                                            </Badge>
                                        </div>
                                        {!n.read_at && (
                                            <button 
                                                onClick={() => markAsRead(n.notification_id)}
                                                className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                                            >
                                                <Check size={12} /> Mark read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
