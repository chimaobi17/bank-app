<?php

namespace App\Policies;

final class Roles
{
    public const ADMINISTRATOR = 'administrator';

    public const BRANCH_MANAGER = 'branch_manager';

    public const TELLER = 'teller';

    public const AUDITOR = 'auditor';

    public const CUSTOMER = 'customer';

    public const STAFF_ROLES = [
        self::ADMINISTRATOR,
        self::BRANCH_MANAGER,
        self::TELLER,
        self::AUDITOR,
    ];

    public const APPROVERS = [
        self::ADMINISTRATOR,
        self::BRANCH_MANAGER,
    ];
}
