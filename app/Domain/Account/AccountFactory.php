<?php

namespace App\Domain\Account;

use App\Enums\AccountType;
use App\Models\Account as AccountModel;
use Closure;
use InvalidArgumentException;

/**
 * Resolves the specialized domain Account for an Eloquent account model.
 *
 * New account types may be registered via AccountFactory::register() without
 * modifying the core resolution chain (Open/Closed — Section 11.5).
 */
final class AccountFactory
{
    /** @var array<string, Closure(AccountModel): Account> */
    private static array $customResolvers = [];

    public static function fromModel(AccountModel $model): Account
    {
        $typeKey = $model->account_type->value;

        if (isset(self::$customResolvers[$typeKey])) {
            return (self::$customResolvers[$typeKey])($model);
        }

        return match ($model->account_type) {
            AccountType::SAVINGS => new SavingsAccount($model),
            AccountType::CHECKING => new CheckingAccount($model),
            AccountType::FIXED_DEPOSIT => new FixedDepositAccount($model),
            default => throw new InvalidArgumentException("Unknown account type: {$model->account_type->value}"),
        };
    }

    /**
     * Register a resolver for a custom account type. Allows extension of the
     * account taxonomy (e.g. ForeignCurrency, Escrow) without editing core.
     *
     * @param  Closure(AccountModel): Account  $resolver
     */
    public static function register(AccountType|string $type, Closure $resolver): void
    {
        $key = $type instanceof AccountType ? $type->value : $type;
        self::$customResolvers[$key] = $resolver;
    }

    public static function clearResolvers(): void
    {
        self::$customResolvers = [];
    }
}
