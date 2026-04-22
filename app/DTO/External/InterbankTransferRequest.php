<?php

namespace App\DTO\External;

use App\ValueObjects\Money;

final readonly class InterbankTransferRequest
{
    public function __construct(
        public string $sessionId,
        public string $sourceBankCode,
        public string $sourceAccountNumber,
        public string $destinationBankCode,
        public string $destinationAccountNumber,
        public string $destinationAccountName,
        public Money $amount,
        public string $narration,
        public ?string $beneficiaryBvn = null,
    ) {}
}
