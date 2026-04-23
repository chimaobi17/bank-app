import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\AccountsPageController::open
* @see Http/Controllers/Banking/AccountsPageController.php:74
* @route '/banking/accounts'
*/
export const open = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: open.url(options),
    method: 'post',
})

open.definition = {
    methods: ["post"],
    url: '/banking/accounts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::open
* @see Http/Controllers/Banking/AccountsPageController.php:74
* @route '/banking/accounts'
*/
open.url = (options?: RouteQueryOptions) => {
    return open.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::open
* @see Http/Controllers/Banking/AccountsPageController.php:74
* @route '/banking/accounts'
*/
open.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: open.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::open
* @see Http/Controllers/Banking/AccountsPageController.php:74
* @route '/banking/accounts'
*/
const openForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: open.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::open
* @see Http/Controllers/Banking/AccountsPageController.php:74
* @route '/banking/accounts'
*/
openForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: open.url(options),
    method: 'post',
})

open.form = openForm

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::show
* @see Http/Controllers/Banking/AccountsPageController.php:32
* @route '/banking/accounts/{accountNumber}'
*/
export const show = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/banking/accounts/{accountNumber}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::show
* @see Http/Controllers/Banking/AccountsPageController.php:32
* @route '/banking/accounts/{accountNumber}'
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
* @see \App\Http\Controllers\Banking\AccountsPageController::show
* @see Http/Controllers/Banking/AccountsPageController.php:32
* @route '/banking/accounts/{accountNumber}'
*/
show.get = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::show
* @see Http/Controllers/Banking/AccountsPageController.php:32
* @route '/banking/accounts/{accountNumber}'
*/
show.head = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::show
* @see Http/Controllers/Banking/AccountsPageController.php:32
* @route '/banking/accounts/{accountNumber}'
*/
const showForm = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::show
* @see Http/Controllers/Banking/AccountsPageController.php:32
* @route '/banking/accounts/{accountNumber}'
*/
showForm.get = (args: { accountNumber: string | number } | [accountNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::show
* @see Http/Controllers/Banking/AccountsPageController.php:32
* @route '/banking/accounts/{accountNumber}'
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

const accounts = {
    open: Object.assign(open, open),
    show: Object.assign(show, show),
}

export default accounts