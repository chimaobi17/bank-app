<?php

namespace App\Services\Security;

use App\Models\OtpChallenge;
use App\Models\User;
use Carbon\CarbonImmutable;
use RuntimeException;

final class OtpService
{
    public const MAX_ATTEMPTS = 5;

    public function __construct(
        private readonly int $ttlSeconds = 300,
        private readonly int $codeLength = 6,
    ) {}

    public function issue(User $user, string $purpose, string $channel): array
    {
        $code = $this->generateCode();

        $challenge = OtpChallenge::create([
            'user_id' => $user->user_id,
            'purpose' => $purpose,
            'channel' => $channel,
            'code_hash' => hash('sha256', $code),
            'expires_at' => CarbonImmutable::now()->addSeconds($this->ttlSeconds),
            'attempts' => 0,
        ]);

        return [$challenge, $code];
    }

    public function verify(OtpChallenge $challenge, string $code): bool
    {
        if ($challenge->isConsumed()) {
            throw new RuntimeException('OTP already consumed.');
        }

        if ($challenge->isExpired()) {
            throw new RuntimeException('OTP expired.');
        }

        if ($challenge->attempts >= self::MAX_ATTEMPTS) {
            throw new RuntimeException('OTP attempt limit exceeded.');
        }

        if (! hash_equals($challenge->code_hash, hash('sha256', $code))) {
            $challenge->attempts = ($challenge->attempts ?? 0) + 1;
            $challenge->save();

            return false;
        }

        $challenge->consumed_at = CarbonImmutable::now();
        $challenge->save();

        return true;
    }

    private function generateCode(): string
    {
        $max = (int) str_repeat('9', $this->codeLength);
        $int = random_int(0, $max);

        return str_pad((string) $int, $this->codeLength, '0', STR_PAD_LEFT);
    }
}
