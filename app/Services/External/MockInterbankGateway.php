<?php

namespace App\Services\External;

use App\Contracts\External\InterbankGatewayContract;
use App\DTO\External\InterbankNameEnquiry;
use App\DTO\External\InterbankTransferRequest;
use App\DTO\External\InterbankTransferResponse;

final class MockInterbankGateway implements InterbankGatewayContract
{
    private array $sessions = [];

    public function nameEnquiry(string $bankCode, string $accountNumber): InterbankNameEnquiry
    {
        if (! preg_match('/^\d{10}$/', $accountNumber)) {
            return InterbankNameEnquiry::notFound($bankCode, $accountNumber, 'NIP account numbers must be exactly 10 digits.');
        }

        if (! preg_match('/^\d{3,6}$/', $bankCode)) {
            return InterbankNameEnquiry::notFound($bankCode, $accountNumber, 'Unknown bank code.');
        }

        return InterbankNameEnquiry::found(
            $bankCode,
            $accountNumber,
            $this->deriveAccountName($accountNumber),
            bvn: str_pad(substr($accountNumber, 0, 11), 11, '0', STR_PAD_LEFT),
        );
    }

    public function sendTransfer(InterbankTransferRequest $request): InterbankTransferResponse
    {
        if ($request->amount->isZero()) {
            return new InterbankTransferResponse(
                $request->sessionId,
                InterbankTransferResponse::STATUS_FAILED,
                '13',
                'Amount must be greater than zero.',
            );
        }

        $response = new InterbankTransferResponse(
            $request->sessionId,
            InterbankTransferResponse::STATUS_PENDING,
            '00',
            'Queued for settlement.',
            externalReference: 'MOCK-'.strtoupper(bin2hex(random_bytes(6))),
        );

        $this->sessions[$request->sessionId] = $response;

        return $response;
    }

    public function queryStatus(string $sessionId): InterbankTransferResponse
    {
        $existing = $this->sessions[$sessionId] ?? null;
        if (! $existing) {
            return new InterbankTransferResponse(
                $sessionId,
                InterbankTransferResponse::STATUS_FAILED,
                '25',
                'Unknown session.',
            );
        }

        $settled = new InterbankTransferResponse(
            $existing->sessionId,
            InterbankTransferResponse::STATUS_SUCCESS,
            '00',
            'Settlement complete.',
            externalReference: $existing->externalReference,
        );
        $this->sessions[$sessionId] = $settled;

        return $settled;
    }

    private function deriveAccountName(string $accountNumber): string
    {
        $hash = crc32($accountNumber);

        $first = ['ADA', 'CHIBUZOR', 'OLIVIA', 'EMEKA', 'ZAINAB', 'TOLU'];
        $last = ['OKORO', 'ADEYEMI', 'IBRAHIM', 'OKONKWO', 'BELLO', 'OLATUNJI'];

        return sprintf(
            '%s %s',
            $first[$hash % count($first)],
            $last[intdiv($hash, count($first)) % count($last)],
        );
    }
}
