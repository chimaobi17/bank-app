<?php

use App\Models\Account;
use App\Models\User;
use App\Services\TransferService;
use App\ValueObjects\Money;

$fromAcc = '2027411707';
$toAcc = '1000000001';

$from = Account::where('account_number', $fromAcc)->first();
$to = Account::where('account_number', $toAcc)->first();

if (!$from || !$to) {
    echo "Accounts not found.\n";
    return;
}

echo "From Account: {$from->account_number}, Balance: {$from->balance}\n";
echo "To Account: {$to->account_number}, Balance: {$to->balance}\n";

$amount = 100.00;
echo "Transferring: {$amount}...\n";

$service = app(TransferService::class);
try {
    $result = $service->execute(
        $from->account_number,
        $to->account_number,
        Money::of($amount),
        'Test transfer',
        User::where('customer_id', 104)->first()->user_id
    );
    echo "Transfer successful! Reference: {$result->reference->getValue()}\n";
} catch (\Exception $e) {
    echo "Transfer failed: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}

$from->refresh();
$to->refresh();

echo "New From Balance: {$from->balance}\n";
echo "New To Balance: {$to->balance}\n";
