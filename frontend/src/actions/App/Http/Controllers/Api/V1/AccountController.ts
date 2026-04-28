import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\AccountController::index
* @see Http/Controllers/Api/V1/AccountController.php:21
* @route '/api/v1/accounts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AccountController::index
* @see Http/Controllers/Api/V1/AccountController.php:21
* @route '/api/v1/accounts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AccountController::index
* @see Http/Controllers/Api/V1/AccountController.php:21
* @route '/api/v1/accounts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::index
* @see Http/Controllers/Api/V1/AccountController.php:21
* @route '/api/v1/accounts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::index
* @see Http/Controllers/Api/V1/AccountController.php:21
* @route '/api/v1/accounts'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::index
* @see Http/Controllers/Api/V1/AccountController.php:21
* @route '/api/v1/accounts'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::index
* @see Http/Controllers/Api/V1/AccountController.php:21
* @route '/api/v1/accounts'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Api\V1\AccountController::store
* @see Http/Controllers/Api/V1/AccountController.php:49
* @route '/api/v1/accounts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/accounts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\AccountController::store
* @see Http/Controllers/Api/V1/AccountController.php:49
* @route '/api/v1/accounts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AccountController::store
* @see Http/Controllers/Api/V1/AccountController.php:49
* @route '/api/v1/accounts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::store
* @see Http/Controllers/Api/V1/AccountController.php:49
* @route '/api/v1/accounts'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::store
* @see Http/Controllers/Api/V1/AccountController.php:49
* @route '/api/v1/accounts'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\V1\AccountController::show
* @see Http/Controllers/Api/V1/AccountController.php:34
* @route '/api/v1/accounts/{accountNumber}'
*/
export const show = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/accounts/{accountNumber}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AccountController::show
* @see Http/Controllers/Api/V1/AccountController.php:34
* @route '/api/v1/accounts/{accountNumber}'
*/
show.url = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { accountNumber: args }
    }

    if (Array.isArray(args)) {
        args = {
            accountNumber: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        accountNumber: args.accountNumber,
    }

    return show.definition.url
            .replace('{accountNumber}', parsedArgs.accountNumber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AccountController::show
* @see Http/Controllers/Api/V1/AccountController.php:34
* @route '/api/v1/accounts/{accountNumber}'
*/
show.get = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::show
* @see Http/Controllers/Api/V1/AccountController.php:34
* @route '/api/v1/accounts/{accountNumber}'
*/
show.head = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::show
* @see Http/Controllers/Api/V1/AccountController.php:34
* @route '/api/v1/accounts/{accountNumber}'
*/
const showForm = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::show
* @see Http/Controllers/Api/V1/AccountController.php:34
* @route '/api/v1/accounts/{accountNumber}'
*/
showForm.get = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::show
* @see Http/Controllers/Api/V1/AccountController.php:34
* @route '/api/v1/accounts/{accountNumber}'
*/
showForm.head = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Api\V1\AccountController::transactions
* @see Http/Controllers/Api/V1/AccountController.php:80
* @route '/api/v1/accounts/{accountNumber}/transactions'
*/
export const transactions = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(args, options),
    method: 'get',
})

transactions.definition = {
    methods: ["get","head"],
    url: '/api/v1/accounts/{accountNumber}/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\AccountController::transactions
* @see Http/Controllers/Api/V1/AccountController.php:80
* @route '/api/v1/accounts/{accountNumber}/transactions'
*/
transactions.url = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { accountNumber: args }
    }

    if (Array.isArray(args)) {
        args = {
            accountNumber: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        accountNumber: args.accountNumber,
    }

    return transactions.definition.url
            .replace('{accountNumber}', parsedArgs.accountNumber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\AccountController::transactions
* @see Http/Controllers/Api/V1/AccountController.php:80
* @route '/api/v1/accounts/{accountNumber}/transactions'
*/
transactions.get = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::transactions
* @see Http/Controllers/Api/V1/AccountController.php:80
* @route '/api/v1/accounts/{accountNumber}/transactions'
*/
transactions.head = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transactions.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::transactions
* @see Http/Controllers/Api/V1/AccountController.php:80
* @route '/api/v1/accounts/{accountNumber}/transactions'
*/
const transactionsForm = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transactions.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::transactions
* @see Http/Controllers/Api/V1/AccountController.php:80
* @route '/api/v1/accounts/{accountNumber}/transactions'
*/
transactionsForm.get = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transactions.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\AccountController::transactions
* @see Http/Controllers/Api/V1/AccountController.php:80
* @route '/api/v1/accounts/{accountNumber}/transactions'
*/
transactionsForm.head = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transactions.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

transactions.form = transactionsForm

const AccountController = { index, store, show, transactions }

export default AccountController