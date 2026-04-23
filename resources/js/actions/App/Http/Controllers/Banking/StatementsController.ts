import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\StatementsController::view
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
export const view = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/banking/statements/{account}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\StatementsController::view
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
view.url = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { account: args }
    }

    if (Array.isArray(args)) {
        args = {
            account: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        account: args.account,
    }

    return view.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\StatementsController::view
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
view.get = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::view
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
view.head = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::view
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
const viewForm = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::view
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
viewForm.get = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::view
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
viewForm.head = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: view.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

view.form = viewForm

/**
* @see \App\Http\Controllers\Banking\StatementsController::csv
* @see Http/Controllers/Banking/StatementsController.php:47
* @route '/banking/statements/{account}/csv'
*/
export const csv = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: csv.url(args, options),
    method: 'get',
})

csv.definition = {
    methods: ["get","head"],
    url: '/banking/statements/{account}/csv',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\StatementsController::csv
* @see Http/Controllers/Banking/StatementsController.php:47
* @route '/banking/statements/{account}/csv'
*/
csv.url = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { account: args }
    }

    if (Array.isArray(args)) {
        args = {
            account: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        account: args.account,
    }

    return csv.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\StatementsController::csv
* @see Http/Controllers/Banking/StatementsController.php:47
* @route '/banking/statements/{account}/csv'
*/
csv.get = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: csv.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::csv
* @see Http/Controllers/Banking/StatementsController.php:47
* @route '/banking/statements/{account}/csv'
*/
csv.head = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: csv.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::csv
* @see Http/Controllers/Banking/StatementsController.php:47
* @route '/banking/statements/{account}/csv'
*/
const csvForm = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: csv.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::csv
* @see Http/Controllers/Banking/StatementsController.php:47
* @route '/banking/statements/{account}/csv'
*/
csvForm.get = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: csv.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::csv
* @see Http/Controllers/Banking/StatementsController.php:47
* @route '/banking/statements/{account}/csv'
*/
csvForm.head = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: csv.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

csv.form = csvForm

const StatementsController = { view, csv }

export default StatementsController