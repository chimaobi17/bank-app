<?php

namespace App\Services;

use App\Contracts\Repositories\AuditLogRepositoryContract;
use App\Domain\Account\AccountFactory;
use App\Models\ScheduledTransfer;
use App\Models\User;
use App\ValueObjects\Money;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Throwable;

final class ScheduledTransferService
{
    public function __construct(
        private readonly TransferService $transfers,
        private readonly AuditLogRepositoryContract $audit,
    ) {}

    public function schedule(User $user, array $data): ScheduledTransfer
    {
        return DB::transaction(function () use ($user, $data) {
            $schedule = ScheduledTransfer::create(array_merge($data, [
                'user_id' => $user->user_id,
                'is_active' => true,
                'next_run_date' => $data['start_date'] ?? CarbonImmutable::now()->addDay()->toDateString(),
            ]));

            if ($schedule->sourceAccount) {
                $this->audit->record(
                    AccountFactory::fromModel($schedule->sourceAccount),
                    'scheduled_transfer.created',
                    $user->user_id,
                    ['schedule_id' => $schedule->scheduled_transfer_id, 'frequency' => $schedule->frequency],
                );
            }

            return $schedule;
        });
    }

    public function cancel(ScheduledTransfer $schedule, ?int $actorId = null): ScheduledTransfer
    {
        $schedule->update(['is_active' => false]);

        if ($schedule->sourceAccount) {
            $this->audit->record(
                AccountFactory::fromModel($schedule->sourceAccount),
                'scheduled_transfer.cancelled',
                $actorId ?? auth()->id(),
                ['schedule_id' => $schedule->scheduled_transfer_id],
            );
        }

        return $schedule;
    }

    public function runDue(): Collection
    {
        $due = ScheduledTransfer::where('is_active', true)
            ->where('next_run_date', '<=', today())
            ->where(function ($q) {
                $q->whereNull('end_date')->orWhere('end_date', '>=', today());
            })
            ->get();

        return $due->map(fn (ScheduledTransfer $s) => $this->executeOne($s));
    }

    public function executeOne(ScheduledTransfer $schedule): ScheduledTransfer
    {
        return DB::transaction(function () use ($schedule) {
            try {
                if (! $schedule->sourceAccount || ! $schedule->destinationAccount) {
                    throw new \RuntimeException('Scheduled transfer missing source or destination account.');
                }

                $this->transfers->execute(
                    $schedule->sourceAccount->account_number,
                    $schedule->destinationAccount->account_number,
                    Money::of($schedule->amount, $schedule->currency),
                    $schedule->narration ?? 'Scheduled transfer',
                    $schedule->user_id,
                );

                $schedule->update([
                    'last_run_at' => now(),
                    'next_run_date' => $this->calculateNextRun($schedule),
                ]);

                if ($schedule->end_date && $schedule->next_run_date > $schedule->end_date) {
                    $schedule->update(['is_active' => false]);
                }

                $this->audit->record(
                    AccountFactory::fromModel($schedule->sourceAccount),
                    'scheduled_transfer.executed',
                    $schedule->user_id,
                    ['schedule_id' => $schedule->scheduled_transfer_id],
                );
            } catch (Throwable $e) {
                if ($schedule->sourceAccount) {
                    $this->audit->record(
                        AccountFactory::fromModel($schedule->sourceAccount),
                        'scheduled_transfer.failed',
                        $schedule->user_id,
                        ['schedule_id' => $schedule->scheduled_transfer_id, 'error' => $e->getMessage()],
                    );
                }
            }

            return $schedule->fresh();
        });
    }

    private function calculateNextRun(ScheduledTransfer $schedule): string
    {
        $current = CarbonImmutable::parse($schedule->next_run_date);

        return match ($schedule->frequency) {
            'daily' => $current->addDay()->toDateString(),
            'weekly' => $current->addWeek()->toDateString(),
            'monthly' => $current->addMonth()->toDateString(),
            'quarterly' => $current->addMonths(3)->toDateString(),
            'yearly' => $current->addYear()->toDateString(),
            default => $current->addMonth()->toDateString(),
        };
    }
}
