<?php

namespace App\Exceptions;

use RuntimeException;

class InvalidStateTransitionException extends RuntimeException
{
    public function __construct(string $from, string $to, string $entity = 'Entity')
    {
        parent::__construct("{$entity} cannot transition from {$from} to {$to}.");
    }
}
