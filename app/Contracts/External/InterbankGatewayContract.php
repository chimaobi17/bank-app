<?php

namespace App\Contracts\External;

use App\DTO\External\InterbankNameEnquiry;
use App\DTO\External\InterbankTransferRequest;
use App\DTO\External\InterbankTransferResponse;

interface InterbankGatewayContract
{
    public function nameEnquiry(string $bankCode, string $accountNumber): InterbankNameEnquiry;

    public function sendTransfer(InterbankTransferRequest $request): InterbankTransferResponse;

    public function queryStatus(string $sessionId): InterbankTransferResponse;
}
