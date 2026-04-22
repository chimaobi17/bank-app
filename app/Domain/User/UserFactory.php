<?php

namespace App\Domain\User;

use App\Models\User as UserModel;
use Closure;
use InvalidArgumentException;

/**
 * Resolves the specialized domain User for an Eloquent user model.
 *
 * New roles may be registered via UserFactory::register() without modifying
 * the resolution chain, preserving the Open/Closed Principle (Section 11.5).
 */
final class UserFactory
{
    /** @var array<int, Closure(UserModel): ?User> */
    private static array $resolvers = [];

    public static function fromModel(UserModel $model): User
    {
        foreach (self::$resolvers as $resolver) {
            if ($resolved = $resolver($model)) {
                return $resolved;
            }
        }

        if ($model->hasRole('super-admin')) {
            return new SuperAdministrator($model);
        }

        if ($model->hasRole('admin') || $model->hasRole('administrator')) {
            return new Administrator($model);
        }

        if ($model->hasRole('auditor')) {
            return new Auditor($model);
        }

        if ($model->hasRole('customer') || $model->customer_id) {
            return new Customer($model);
        }

        throw new InvalidArgumentException("Unable to resolve domain user for user ID: {$model->user_id}");
    }

    /**
     * Register a custom resolver. Returns the specialized User or null to
     * defer to the default chain.
     *
     * @param  Closure(UserModel): ?User  $resolver
     */
    public static function register(Closure $resolver): void
    {
        self::$resolvers[] = $resolver;
    }

    public static function clearResolvers(): void
    {
        self::$resolvers = [];
    }
}
