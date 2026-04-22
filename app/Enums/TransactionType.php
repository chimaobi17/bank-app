<?php

namespace App\Enums;

enum TransactionType: string
{
    case DEPOSIT = 'deposit';
    case WITHDRAWAL = 'withdrawal';
    case TRANSFER = 'transfer';
    case BILL_PAYMENT = 'bill_payment';
    case LOAN_DISBURSEMENT = 'loan_disbursement';
    case LOAN_REPAYMENT = 'loan_repayment';
    case INTEREST_CREDIT = 'interest_credit';
    case FEE_CHARGE = 'fee_charge';
    case REVERSAL = 'reversal';
}
