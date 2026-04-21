import { Head, router } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/lib/format';

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

    return (
        <AppLayout breadcrumbs={[{ title: 'Notifications', href: '/banking/notifications' }]}>
            <Head title="Notifications" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Notifications</h1>
                        <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
                    </div>
                    {unreadCount > 0 && (
                        <Button variant="outline" size="sm" onClick={markAllAsRead}>Mark all as read</Button>
                    )}
                </div>

                <Card>
                    <CardHeader><CardTitle>Inbox</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        {notifications.length === 0 && (
                            <div className="flex flex-col items-center py-8 text-muted-foreground">
                                <Bell className="mb-2 size-10 opacity-40" />
                                <p>No notifications.</p>
                            </div>
                        )}
                        {notifications.map((n) => (
                            <div
                                key={n.notification_id}
                                className={`flex items-start justify-between rounded-lg border p-3 ${!n.read_at ? 'bg-muted/40' : ''}`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-xs">{n.category}</Badge>
                                        <Badge variant="secondary" className="text-xs">{n.channel}</Badge>
                                        {!n.read_at && <Badge className="text-xs">New</Badge>}
                                    </div>
                                    <div className="mt-1 font-medium">{n.subject}</div>
                                    <p className="text-sm text-muted-foreground">{n.body}</p>
                                    <div className="mt-1 text-xs text-muted-foreground">{formatDateTime(n.created_at)}</div>
                                </div>
                                {!n.read_at && (
                                    <Button size="sm" variant="ghost" onClick={() => markAsRead(n.notification_id)}>
                                        Mark read
                                    </Button>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
