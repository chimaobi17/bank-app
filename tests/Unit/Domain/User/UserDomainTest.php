<?php

use App\Domain\User\Administrator;
use App\Domain\User\Auditor;
use App\Domain\User\Customer;
use App\Domain\User\SuperAdministrator;
use App\Domain\User\UserFactory;
use App\Enums\UserStatus;
use App\Models\User as UserModel;

function makeUserModel(array $overrides = []): UserModel
{
    $model = Mockery::mock(UserModel::class)->makePartial();
    $model->user_id = $overrides['user_id'] ?? 42;
    $model->username = $overrides['username'] ?? 'jane';
    $model->email = $overrides['email'] ?? 'jane@example.test';
    $model->status = $overrides['status'] ?? UserStatus::ACTIVE;
    $model->customer_id = $overrides['customer_id'] ?? null;

    $roles = $overrides['roles'] ?? [];
    $model->shouldReceive('hasRole')->andReturnUsing(fn ($r) => in_array($r, $roles, true));
    $model->shouldReceive('isLocked')->andReturn($overrides['locked'] ?? false);

    return $model;
}

it('resolves a Customer for a user with customer_id', function () {
    $user = UserFactory::fromModel(makeUserModel(['customer_id' => 1]));
    expect($user)->toBeInstanceOf(Customer::class);
    expect($user->roleName())->toBe('customer');
    expect($user->canPerformTransaction())->toBeTrue();
    expect($user->canOpenAccount())->toBeTrue();
    expect($user->canManageSystem())->toBeFalse();
});

it('resolves an Administrator from the admin role', function () {
    $user = UserFactory::fromModel(makeUserModel(['roles' => ['admin']]));
    expect($user)->toBeInstanceOf(Administrator::class);
    expect($user->canManageSystem())->toBeTrue();
    expect($user->canApproveLoan())->toBeTrue();
    expect($user->canReverseTransaction())->toBeTrue();
    expect($user->canPerformTransaction())->toBeFalse();
});

it('resolves a SuperAdministrator from the super-admin role', function () {
    $user = UserFactory::fromModel(makeUserModel(['roles' => ['super-admin']]));
    expect($user)->toBeInstanceOf(SuperAdministrator::class);
    expect($user->canManageSystem())->toBeTrue();
    expect($user->canAuditSystem())->toBeTrue();
});

it('resolves an Auditor from the auditor role', function () {
    $user = UserFactory::fromModel(makeUserModel(['roles' => ['auditor']]));
    expect($user)->toBeInstanceOf(Auditor::class);
    expect($user->canAuditSystem())->toBeTrue();
    expect($user->canViewFinancialData())->toBeTrue();
    expect($user->canPerformTransaction())->toBeFalse();
});

it('refuses capability checks when the user is inactive', function () {
    $user = UserFactory::fromModel(makeUserModel(['customer_id' => 1, 'status' => UserStatus::SUSPENDED]));
    expect($user->canPerformTransaction())->toBeFalse();
    expect($user->canOpenAccount())->toBeFalse();
});

it('permits custom resolvers to take precedence over defaults', function () {
    UserFactory::register(fn ($model) => $model->username === 'vip' ? new Auditor($model) : null);

    $user = UserFactory::fromModel(makeUserModel(['username' => 'vip', 'customer_id' => 1]));
    expect($user)->toBeInstanceOf(Auditor::class);

    UserFactory::clearResolvers();
});

it('throws when no role mapping resolves', function () {
    UserFactory::fromModel(makeUserModel());
})->throws(InvalidArgumentException::class);
