import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AdminController::stats
* @see Http/Controllers/Api/V1/AdminController.php:29
* @route '/api/v1/admin/stats'
*/
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminController::stats
* @see Http/Controllers/Api/V1/AdminController.php:29
* @route '/api/v1/admin/stats'
*/
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminController::stats
* @see Http/Controllers/Api/V1/AdminController.php:29
* @route '/api/v1/admin/stats'
*/
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::stats
* @see Http/Controllers/Api/V1/AdminController.php:29
* @route '/api/v1/admin/stats'
*/
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::stats
* @see Http/Controllers/Api/V1/AdminController.php:29
* @route '/api/v1/admin/stats'
*/
const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::stats
* @see Http/Controllers/Api/V1/AdminController.php:29
* @route '/api/v1/admin/stats'
*/
statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::stats
* @see Http/Controllers/Api/V1/AdminController.php:29
* @route '/api/v1/admin/stats'
*/
statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: stats.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

stats.form = statsForm

/**
* @see \App\Http\Controllers\Api\V1\AdminController::users
* @see Http/Controllers/Api/V1/AdminController.php:42
* @route '/api/v1/admin/users'
*/
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminController::users
* @see Http/Controllers/Api/V1/AdminController.php:42
* @route '/api/v1/admin/users'
*/
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminController::users
* @see Http/Controllers/Api/V1/AdminController.php:42
* @route '/api/v1/admin/users'
*/
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::users
* @see Http/Controllers/Api/V1/AdminController.php:42
* @route '/api/v1/admin/users'
*/
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::users
* @see Http/Controllers/Api/V1/AdminController.php:42
* @route '/api/v1/admin/users'
*/
const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: users.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::users
* @see Http/Controllers/Api/V1/AdminController.php:42
* @route '/api/v1/admin/users'
*/
usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: users.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::users
* @see Http/Controllers/Api/V1/AdminController.php:42
* @route '/api/v1/admin/users'
*/
usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: users.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

users.form = usersForm

/**
* @see \App\Http\Controllers\Api\V1\AdminController::auditLogs
* @see Http/Controllers/Api/V1/AdminController.php:129
* @route '/api/v1/admin/audit-logs'
*/
export const auditLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})

auditLogs.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/audit-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminController::auditLogs
* @see Http/Controllers/Api/V1/AdminController.php:129
* @route '/api/v1/admin/audit-logs'
*/
auditLogs.url = (options?: RouteQueryOptions) => {
    return auditLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminController::auditLogs
* @see Http/Controllers/Api/V1/AdminController.php:129
* @route '/api/v1/admin/audit-logs'
*/
auditLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::auditLogs
* @see Http/Controllers/Api/V1/AdminController.php:129
* @route '/api/v1/admin/audit-logs'
*/
auditLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: auditLogs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::auditLogs
* @see Http/Controllers/Api/V1/AdminController.php:129
* @route '/api/v1/admin/audit-logs'
*/
const auditLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: auditLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::auditLogs
* @see Http/Controllers/Api/V1/AdminController.php:129
* @route '/api/v1/admin/audit-logs'
*/
auditLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: auditLogs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::auditLogs
* @see Http/Controllers/Api/V1/AdminController.php:129
* @route '/api/v1/admin/audit-logs'
*/
auditLogsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: auditLogs.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

auditLogs.form = auditLogsForm

/**
* @see \App\Http\Controllers\Api\V1\AdminController::activateAccount
* @see Http/Controllers/Api/V1/AdminController.php:56
* @route '/api/v1/admin/accounts/{id}/activate'
*/
export const activateAccount = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activateAccount.url(args, options),
    method: 'post',
})

activateAccount.definition = {
    methods: ["post"],
    url: '/api/v1/admin/accounts/{id}/activate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminController::activateAccount
* @see Http/Controllers/Api/V1/AdminController.php:56
* @route '/api/v1/admin/accounts/{id}/activate'
*/
activateAccount.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return activateAccount.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminController::activateAccount
* @see Http/Controllers/Api/V1/AdminController.php:56
* @route '/api/v1/admin/accounts/{id}/activate'
*/
activateAccount.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activateAccount.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::activateAccount
* @see Http/Controllers/Api/V1/AdminController.php:56
* @route '/api/v1/admin/accounts/{id}/activate'
*/
const activateAccountForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: activateAccount.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::activateAccount
* @see Http/Controllers/Api/V1/AdminController.php:56
* @route '/api/v1/admin/accounts/{id}/activate'
*/
activateAccountForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: activateAccount.url(args, options),
    method: 'post',
})

activateAccount.form = activateAccountForm

/**
* @see \App\Http\Controllers\Api\V1\AdminController::closeAccount
* @see Http/Controllers/Api/V1/AdminController.php:67
* @route '/api/v1/admin/accounts/{id}/close'
*/
export const closeAccount = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: closeAccount.url(args, options),
    method: 'post',
})

closeAccount.definition = {
    methods: ["post"],
    url: '/api/v1/admin/accounts/{id}/close',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminController::closeAccount
* @see Http/Controllers/Api/V1/AdminController.php:67
* @route '/api/v1/admin/accounts/{id}/close'
*/
closeAccount.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return closeAccount.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminController::closeAccount
* @see Http/Controllers/Api/V1/AdminController.php:67
* @route '/api/v1/admin/accounts/{id}/close'
*/
closeAccount.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: closeAccount.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::closeAccount
* @see Http/Controllers/Api/V1/AdminController.php:67
* @route '/api/v1/admin/accounts/{id}/close'
*/
const closeAccountForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: closeAccount.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::closeAccount
* @see Http/Controllers/Api/V1/AdminController.php:67
* @route '/api/v1/admin/accounts/{id}/close'
*/
closeAccountForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: closeAccount.url(args, options),
    method: 'post',
})

closeAccount.form = closeAccountForm

/**
* @see \App\Http\Controllers\Api\V1\AdminController::pendingLoans
* @see Http/Controllers/Api/V1/AdminController.php:78
* @route '/api/v1/admin/loans/pending'
*/
export const pendingLoans = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pendingLoans.url(options),
    method: 'get',
})

pendingLoans.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/loans/pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminController::pendingLoans
* @see Http/Controllers/Api/V1/AdminController.php:78
* @route '/api/v1/admin/loans/pending'
*/
pendingLoans.url = (options?: RouteQueryOptions) => {
    return pendingLoans.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminController::pendingLoans
* @see Http/Controllers/Api/V1/AdminController.php:78
* @route '/api/v1/admin/loans/pending'
*/
pendingLoans.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pendingLoans.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::pendingLoans
* @see Http/Controllers/Api/V1/AdminController.php:78
* @route '/api/v1/admin/loans/pending'
*/
pendingLoans.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pendingLoans.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::pendingLoans
* @see Http/Controllers/Api/V1/AdminController.php:78
* @route '/api/v1/admin/loans/pending'
*/
const pendingLoansForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pendingLoans.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::pendingLoans
* @see Http/Controllers/Api/V1/AdminController.php:78
* @route '/api/v1/admin/loans/pending'
*/
pendingLoansForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pendingLoans.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::pendingLoans
* @see Http/Controllers/Api/V1/AdminController.php:78
* @route '/api/v1/admin/loans/pending'
*/
pendingLoansForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pendingLoans.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pendingLoans.form = pendingLoansForm

/**
* @see \App\Http\Controllers\Api\V1\AdminController::approveLoan
* @see Http/Controllers/Api/V1/AdminController.php:85
* @route '/api/v1/admin/loans/{id}/approve'
*/
export const approveLoan = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveLoan.url(args, options),
    method: 'post',
})

approveLoan.definition = {
    methods: ["post"],
    url: '/api/v1/admin/loans/{id}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminController::approveLoan
* @see Http/Controllers/Api/V1/AdminController.php:85
* @route '/api/v1/admin/loans/{id}/approve'
*/
approveLoan.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return approveLoan.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminController::approveLoan
* @see Http/Controllers/Api/V1/AdminController.php:85
* @route '/api/v1/admin/loans/{id}/approve'
*/
approveLoan.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveLoan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::approveLoan
* @see Http/Controllers/Api/V1/AdminController.php:85
* @route '/api/v1/admin/loans/{id}/approve'
*/
const approveLoanForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveLoan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::approveLoan
* @see Http/Controllers/Api/V1/AdminController.php:85
* @route '/api/v1/admin/loans/{id}/approve'
*/
approveLoanForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveLoan.url(args, options),
    method: 'post',
})

approveLoan.form = approveLoanForm

/**
* @see \App\Http\Controllers\Api\V1\AdminController::rejectLoan
* @see Http/Controllers/Api/V1/AdminController.php:96
* @route '/api/v1/admin/loans/{id}/reject'
*/
export const rejectLoan = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectLoan.url(args, options),
    method: 'post',
})

rejectLoan.definition = {
    methods: ["post"],
    url: '/api/v1/admin/loans/{id}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminController::rejectLoan
* @see Http/Controllers/Api/V1/AdminController.php:96
* @route '/api/v1/admin/loans/{id}/reject'
*/
rejectLoan.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return rejectLoan.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminController::rejectLoan
* @see Http/Controllers/Api/V1/AdminController.php:96
* @route '/api/v1/admin/loans/{id}/reject'
*/
rejectLoan.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectLoan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::rejectLoan
* @see Http/Controllers/Api/V1/AdminController.php:96
* @route '/api/v1/admin/loans/{id}/reject'
*/
const rejectLoanForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: rejectLoan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::rejectLoan
* @see Http/Controllers/Api/V1/AdminController.php:96
* @route '/api/v1/admin/loans/{id}/reject'
*/
rejectLoanForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: rejectLoan.url(args, options),
    method: 'post',
})

rejectLoan.form = rejectLoanForm

/**
* @see \App\Http\Controllers\Api\V1\AdminController::disburseLoan
* @see Http/Controllers/Api/V1/AdminController.php:107
* @route '/api/v1/admin/loans/{id}/disburse'
*/
export const disburseLoan = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disburseLoan.url(args, options),
    method: 'post',
})

disburseLoan.definition = {
    methods: ["post"],
    url: '/api/v1/admin/loans/{id}/disburse',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminController::disburseLoan
* @see Http/Controllers/Api/V1/AdminController.php:107
* @route '/api/v1/admin/loans/{id}/disburse'
*/
disburseLoan.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return disburseLoan.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminController::disburseLoan
* @see Http/Controllers/Api/V1/AdminController.php:107
* @route '/api/v1/admin/loans/{id}/disburse'
*/
disburseLoan.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disburseLoan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::disburseLoan
* @see Http/Controllers/Api/V1/AdminController.php:107
* @route '/api/v1/admin/loans/{id}/disburse'
*/
const disburseLoanForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: disburseLoan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::disburseLoan
* @see Http/Controllers/Api/V1/AdminController.php:107
* @route '/api/v1/admin/loans/{id}/disburse'
*/
disburseLoanForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: disburseLoan.url(args, options),
    method: 'post',
})

disburseLoan.form = disburseLoanForm

/**
* @see \App\Http\Controllers\Api\V1\AdminController::reverseTransaction
* @see Http/Controllers/Api/V1/AdminController.php:118
* @route '/api/v1/admin/transactions/{id}/reverse'
*/
export const reverseTransaction = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reverseTransaction.url(args, options),
    method: 'post',
})

reverseTransaction.definition = {
    methods: ["post"],
    url: '/api/v1/admin/transactions/{id}/reverse',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AdminController::reverseTransaction
* @see Http/Controllers/Api/V1/AdminController.php:118
* @route '/api/v1/admin/transactions/{id}/reverse'
*/
reverseTransaction.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return reverseTransaction.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AdminController::reverseTransaction
* @see Http/Controllers/Api/V1/AdminController.php:118
* @route '/api/v1/admin/transactions/{id}/reverse'
*/
reverseTransaction.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reverseTransaction.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::reverseTransaction
* @see Http/Controllers/Api/V1/AdminController.php:118
* @route '/api/v1/admin/transactions/{id}/reverse'
*/
const reverseTransactionForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reverseTransaction.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AdminController::reverseTransaction
* @see Http/Controllers/Api/V1/AdminController.php:118
* @route '/api/v1/admin/transactions/{id}/reverse'
*/
reverseTransactionForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reverseTransaction.url(args, options),
    method: 'post',
})

reverseTransaction.form = reverseTransactionForm

const AdminController = { stats, users, auditLogs, activateAccount, closeAccount, pendingLoans, approveLoan, rejectLoan, disburseLoan, reverseTransaction }

export default AdminController