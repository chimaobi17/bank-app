<?php

namespace App\Services\Cards;

use App\Contracts\Repositories\AccountRepositoryContract;
use App\Enums\CardStatus;
use App\Models\Card;
use App\ValueObjects\CardPan;
use Carbon\CarbonImmutable;
use InvalidArgumentException;

final class VirtualCardIssuer
{
    public function __construct(
        private readonly AccountRepositoryContract $accounts,
    ) {}

    public function issue(int $accountId, string $brand = 'VISA', int $validityMonths = 36): Card
    {
        $accountModel = $this->accounts->findById($accountId);
        if (! $accountModel) {
            throw new InvalidArgumentException('Account not found.');
        }

        $pan = new CardPan($this->generateLuhnCompliantPan($brand));

        return Card::create([
            'account_id' => $accountModel->account_id,
            'pan_token' => $pan->token(),
            'masked_pan' => $pan->masked(),
            'card_type' => 'debit',
            'brand' => $pan->brand(),
            'expiry' => CarbonImmutable::now()->addMonths($validityMonths)->toDateString(),
            'status' => CardStatus::ACTIVE,
            'is_virtual' => true,
            'online_only' => true,
        ]);
    }

    private function generateLuhnCompliantPan(string $brand): string
    {
        $iin = match (strtoupper($brand)) {
            'VISA' => '4',
            'MASTERCARD' => '5'.random_int(1, 5),
            'VERVE' => '5061'.random_int(0, 9),
            default => '4',
        };

        $body = $iin;
        while (strlen($body) < 15) {
            $body .= (string) random_int(0, 9);
        }

        return $body.(string) $this->luhnCheckDigit($body);
    }

    private function luhnCheckDigit(string $digits): int
    {
        $sum = 0;
        $parity = (strlen($digits) + 1) % 2;
        for ($i = 0; $i < strlen($digits); $i++) {
            $d = (int) $digits[$i];
            if ($i % 2 === $parity) {
                $d *= 2;
                if ($d > 9) {
                    $d -= 9;
                }
            }
            $sum += $d;
        }

        return (10 - ($sum % 10)) % 10;
    }
}
