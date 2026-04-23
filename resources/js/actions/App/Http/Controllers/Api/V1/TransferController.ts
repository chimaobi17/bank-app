import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\TransferController::store
* @see Http/Controllers/Api/V1/TransferController.php:18
* @route '/api/v1/transfers'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/transfers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\TransferController::store
* @see Http/Controllers/Api/V1/TransferController.php:18
* @route '/api/v1/transfers'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\TransferController::store
* @see Http/Controllers/Api/V1/TransferController.php:18
* @route '/api/v1/transfers'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\TransferController::store
* @see Http/Controllers/Api/V1/TransferController.php:18
* @route '/api/v1/transfers'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\TransferController::store
* @see Http/Controllers/Api/V1/TransferController.php:18
* @route '/api/v1/transfers'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const TransferController = { store }

export default TransferControllerrl(options),
    method: 'post',
})

store.form = storeForm

const TransferController = { store }

export default TransferController