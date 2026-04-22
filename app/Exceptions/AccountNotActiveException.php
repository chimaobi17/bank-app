<?php

namespace App\Exceptions;

use RuntimeException;

class AccountNotActiveException extends RuntimeException
{
    public function __construct(string $message = 'Account is not active.')
    {
        parent::__construct($message);
    }
}
