<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuditController extends Controller
{
    public function index(Request $request): Response
    {
        $query = AuditLog::with('actor')->latest();

        if ($entity = $request->query('entity')) {
            $query->where('entity_type', $entity);
        }

        if ($action = $request->query('action')) {
            $query->where('action', 'like', "%{$action}%");
        }

        $logs = $query->paginate(50)->through(fn ($log) => [
            'id' => $log->id,
            'action' => $log->action,
            'entity_type' => $log->entity_type,
            'entity_id' => $log->entity_id,
            'actor' => $log->actor?->username,
            'ip_address' => $log->ip_address,
            'created_at' => $log->created_at->toIso8601String(),
            'before' => $log->before,
            'after' => $log->after,
        ]);

        return Inertia::render('admin/audit/index', [
            'logs' => $logs,
            'filters' => ['entity' => $entity, 'action' => $action],
        ]);
    }
}
