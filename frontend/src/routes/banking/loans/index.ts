import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\LoansPageController::apply
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
export const apply = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apply.url(options),
    method: 'get',
})

apply.definition = {
    methods: ["get","head"],
    url: '/banking/loans/apply',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\LoansPageController::apply
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
apply.url = (options?: RouteQueryOptions) => {
    return apply.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\LoansPageController::apply
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
apply.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: apply.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::apply
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
apply.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: apply.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::apply
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
const applyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apply.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::apply
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
applyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apply.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::apply
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
applyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: apply.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

apply.form = applyForm

/**
* @see \App\Http\Controllers\Banking\LoansPageController::store
* @see Http/Controllers/Banking/LoansPageController.php:47
* @route '/banking/loans'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/banking/loans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\LoansPageController::store
* @see Http/Controllers/Banking/LoansPageController.php:47
* @route '/banking/loans'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\LoansPageController::store
* @see Http/Controllers/Banking/LoansPageController.php:47
* @route '/banking/loans'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::store
* @see Http/Controllers/Banking/LoansPageController.php:47
* @route '/banking/loans'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::store
* @see Http/Controllers/Banking/LoansPageController.php:47
* @route '/banking/loans'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Banking\LoansPageController::show
* @see Http/Controllers/Banking/LoansPageController.php:56
* @route '/banking/loans/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/banking/loans/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\LoansPageController::show
* @see Http/Controllers/Banking/LoansPageController.php:56
* @route '/banking/loans/{id}'
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
* @see \App\Http\Controllers\Banking\LoansPageController::show
* @see Http/Controllers/Banking/LoansPageController.php:56
* @route '/banking/loans/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::show
* @see Http/Controllers/Banking/LoansPageController.php:56
* @route '/banking/loans/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::show
* @see Http/Controllers/Banking/LoansPageController.php:56
* @route '/banking/loans/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::show
* @see Http/Controllers/Banking/LoansPageController.php:56
* @route '/banking/loans/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::show
* @see Http/Controllers/Banking/LoansPageController.php:56
* @route '/banking/loans/{id}'
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
* @see \App\Http\Controllers\Banking\LoansPageController::calculate
* @see Http/Controllers/Banking/LoansPageController.php:93
* @route '/banking/loans/calculate-emi'
*/
export const calculate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculate.url(options),
    method: 'post',
})

calculate.definition = {
    methods: ["post"],
    url: '/banking/loans/calculate-emi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\LoansPageController::calculate
* @see Http/Controllers/Banking/LoansPageController.php:93
* @route '/banking/loans/calculate-emi'
*/
calculate.url = (options?: RouteQueryOptions) => {
    return calculate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\LoansPageController::calculate
* @see Http/Controllers/Banking/LoansPageController.php:93
* @route '/banking/loans/calculate-emi'
*/
calculate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::calculate
* @see Http/Controllers/Banking/LoansPageController.php:93
* @route '/banking/loans/calculate-emi'
*/
const calculateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: calculate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::calculate
* @see Http/Controllers/Banking/LoansPageController.php:93
* @route '/banking/loans/calculate-emi'
*/
calculateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: calculate.url(options),
    method: 'post',
})

calculate.form = calculateForm

const loans = {
    apply: Object.assign(apply, apply),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    calculate: Object.assign(calculate, calculate),
}

export default loans