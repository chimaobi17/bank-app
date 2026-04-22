<?php

namespace App\Exceptions;

use RuntimeException;

class TransactionLimitExceededException extends RuntimeException
{
    public function __construct(string $message = 'Transaction limit exceeded.')
    {
        parent::__construct($message);
    }
}
