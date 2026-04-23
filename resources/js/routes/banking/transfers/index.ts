import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\TransfersPageController::store
* @see Http/Controllers/Banking/TransfersPageController.php:42
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
* @see Http/Controllers/Banking/TransfersPageController.php:42
* @route '/banking/transfers'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::store
* @see Http/Controllers/Banking/TransfersPageController.php:42
* @route '/banking/transfers'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::store
* @see Http/Controllers/Banking/TransfersPageController.php:42
* @route '/banking/transfers'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::store
* @see Http/Controllers/Banking/TransfersPageController.php:42
* @route '/banking/transfers'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const transfers = {
    store: Object.assign(store, store),
}

export default transfers