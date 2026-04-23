import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\LoanController::index
* @see Http/Controllers/Api/V1/LoanController.php:21
* @route '/api/v1/loans'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/loans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\LoanController::index
* @see Http/Controllers/Api/V1/LoanController.php:21
* @route '/api/v1/loans'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\LoanController::index
* @see Http/Controllers/Api/V1/LoanController.php:21
* @route '/api/v1/loans'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::index
* @see Http/Controllers/Api/V1/LoanController.php:21
* @route '/api/v1/loans'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::index
* @see Http/Controllers/Api/V1/LoanController.php:21
* @route '/api/v1/loans'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::index
* @see Http/Controllers/Api/V1/LoanController.php:21
* @route '/api/v1/loans'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::index
* @see Http/Controllers/Api/V1/LoanController.php:21
* @route '/api/v1/loans'
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
* @see \App\Http\Controllers\Api\V1\LoanController::store
* @see Http/Controllers/Api/V1/LoanController.php:34
* @route '/api/v1/loans'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/loans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\LoanController::store
* @see Http/Controllers/Api/V1/LoanController.php:34
* @route '/api/v1/loans'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\LoanController::store
* @see Http/Controllers/Api/V1/LoanController.php:34
* @route '/api/v1/loans'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::store
* @see Http/Controllers/Api/V1/LoanController.php:34
* @route '/api/v1/loans'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::store
* @see Http/Controllers/Api/V1/LoanController.php:34
* @route '/api/v1/loans'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\V1\LoanController::show
* @see Http/Controllers/Api/V1/LoanController.php:48
* @route '/api/v1/loans/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/loans/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\LoanController::show
* @see Http/Controllers/Api/V1/LoanController.php:48
* @route '/api/v1/loans/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\LoanController::show
* @see Http/Controllers/Api/V1/LoanController.php:48
* @route '/api/v1/loans/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::show
* @see Http/Controllers/Api/V1/LoanController.php:48
* @route '/api/v1/loans/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::show
* @see Http/Controllers/Api/V1/LoanController.php:48
* @route '/api/v1/loans/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::show
* @see Http/Controllers/Api/V1/LoanController.php:48
* @route '/api/v1/loans/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::show
* @see Http/Controllers/Api/V1/LoanController.php:48
* @route '/api/v1/loans/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\V1\LoanController::calculateEmi
* @see Http/Controllers/Api/V1/LoanController.php:59
* @route '/api/v1/loans/calculate-emi'
*/
export const calculateEmi = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculateEmi.url(options),
    method: 'post',
})

calculateEmi.definition = {
    methods: ["post"],
    url: '/api/v1/loans/calculate-emi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\LoanController::calculateEmi
* @see Http/Controllers/Api/V1/LoanController.php:59
* @route '/api/v1/loans/calculate-emi'
*/
calculateEmi.url = (options?: RouteQueryOptions) => {
    return calculateEmi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\LoanController::calculateEmi
* @see Http/Controllers/Api/V1/LoanController.php:59
* @route '/api/v1/loans/calculate-emi'
*/
calculateEmi.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculateEmi.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::calculateEmi
* @see Http/Controllers/Api/V1/LoanController.php:59
* @route '/api/v1/loans/calculate-emi'
*/
const calculateEmiForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: calculateEmi.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\LoanController::calculateEmi
* @see Http/Controllers/Api/V1/LoanController.php:59
* @route '/api/v1/loans/calculate-emi'
*/
calculateEmiForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: calculateEmi.url(options),
    method: 'post',
})

calculateEmi.form = calculateEmiForm

const LoanController = { index, store, show, calculateEmi }

export default LoanController