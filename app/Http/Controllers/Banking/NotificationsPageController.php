<?php

namespace App\Http\Controllers\Banking;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Services\NotificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationsPageController extends Controller
{
    public function __construct(
        private NotificationService $notifications,
    ) {}

    public function index(Request $request): Response
    {
        $notifications = Notification::where('user_id', $request->user()->user_id)
            ->latest()
            ->take(100)
            ->get()
            ->map(fn ($n) => [
                'notification_id' => $n->notification_id,
                'channel' => $n->channel->value,
                'category' => $n->category,
                'subject' => $n->subject,
                'body' => $n->body,
                'status' => $n->status,
                'read_at' => $n->read_at?->toIso8601String(),
                'created_at' => $n->created_at->toIso8601String(),
            ]);

        return Inertia::render('banking/notifications/index', [
            'notifications' => $notifications,
        ]);
    }

    public function markAsRead(Request $request, int $id): RedirectResponse
    {
        Notification::where('user_id', $request->user()->user_id)
            ->where('notification_id', $id)
            ->firstOrFail()
            ->markAsRead();

        return back();
    }

    public function markAllAsRead(Request $request): RedirectResponse
    {
        $this->notifications->markAllAsRead($request->user()->user_id);

        return back();
    }
}
