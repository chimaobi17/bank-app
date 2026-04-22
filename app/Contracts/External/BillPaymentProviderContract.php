<?php

namespace App\Contracts\External;

use App\DTO\External\BillPaymentQuote;
use App\DTO\External\BillPaymentRequest;
use App\DTO\External\BillPaymentResponse;

interface BillPaymentProviderContract
{
    public function code(): string;

    public function supports(string $billerCode): bool;

    public function quote(string $billerCode, string $customerReference, string $amount): BillPaymentQuote;

    public function pay(BillPaymentRequest $request): BillPaymentResponse;
}
