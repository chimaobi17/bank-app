import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\LoansPageController::index
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/banking/loans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\LoansPageController::index
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\LoansPageController::index
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::index
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::index
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::index
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::index
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
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
* @see \App\Http\Controllers\Banking\LoansPageController::create
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/banking/loans/apply',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\LoansPageController::create
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\LoansPageController::create
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::create
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::create
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::create
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::create
* @see Http/Controllers/Banking/LoansPageController.php:42
* @route '/banking/loans/apply'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

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
* @see \App\Http\Controllers\Banking\LoansPageController::calculateEmi
* @see Http/Controllers/Banking/LoansPageController.php:93
* @route '/banking/loans/calculate-emi'
*/
export const calculateEmi = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculateEmi.url(options),
    method: 'post',
})

calculateEmi.definition = {
    methods: ["post"],
    url: '/banking/loans/calculate-emi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\LoansPageController::calculateEmi
* @see Http/Controllers/Banking/LoansPageController.php:93
* @route '/banking/loans/calculate-emi'
*/
calculateEmi.url = (options?: RouteQueryOptions) => {
    return calculateEmi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\LoansPageController::calculateEmi
* @see Http/Controllers/Banking/LoansPageController.php:93
* @route '/banking/loans/calculate-emi'
*/
calculateEmi.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculateEmi.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::calculateEmi
* @see Http/Controllers/Banking/LoansPageController.php:93
* @route '/banking/loans/calculate-emi'
*/
const calculateEmiForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: calculateEmi.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::calculateEmi
* @see Http/Controllers/Banking/LoansPageController.php:93
* @route '/banking/loans/calculate-emi'
*/
calculateEmiForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: calculateEmi.url(options),
    method: 'post',
})

calculateEmi.form = calculateEmiForm

const LoansPageController = { index, create, store, show, calculateEmi }

export default LoansPageController