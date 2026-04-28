import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\TransfersPageController::create
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/banking/transfers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::create
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::create
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::create
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::create
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::create
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::create
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
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
* @see \App\Http\Controllers\Banking\TransfersPageController::store
* @see Http/Controllers/Banking/TransfersPageController.php:30
* @route '/banking/transfers'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/banking/transfers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::store
* @see Http/Controllers/Banking/TransfersPageController.php:30
* @route '/banking/transfers'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::store
* @see Http/Controllers/Banking/TransfersPageController.php:30
* @route '/banking/transfers'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::store
* @see Http/Controllers/Banking/TransfersPageController.php:30
* @route '/banking/transfers'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::store
* @see Http/Controllers/Banking/TransfersPageController.php:30
* @route '/banking/transfers'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const TransfersPageController = { create, store }

export default TransfersPageController