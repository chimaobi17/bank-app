import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\PaymentController::billers
* @see Http/Controllers/Api/V1/PaymentController.php:32
* @route '/api/v1/billers'
*/
export const billers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: billers.url(options),
    method: 'get',
})

billers.definition = {
    methods: ["get","head"],
    url: '/api/v1/billers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::billers
* @see Http/Controllers/Api/V1/PaymentController.php:32
* @route '/api/v1/billers'
*/
billers.url = (options?: RouteQueryOptions) => {
    return billers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::billers
* @see Http/Controllers/Api/V1/PaymentController.php:32
* @route '/api/v1/billers'
*/
billers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: billers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::billers
* @see Http/Controllers/Api/V1/PaymentController.php:32
* @route '/api/v1/billers'
*/
billers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: billers.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::billers
* @see Http/Controllers/Api/V1/PaymentController.php:32
* @route '/api/v1/billers'
*/
const billersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: billers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::billers
* @see Http/Controllers/Api/V1/PaymentController.php:32
* @route '/api/v1/billers'
*/
billersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: billers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::billers
* @see Http/Controllers/Api/V1/PaymentController.php:32
* @route '/api/v1/billers'
*/
billersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: billers.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

billers.form = billersForm

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::index
* @see Http/Controllers/Api/V1/PaymentController.php:22
* @route '/api/v1/payments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/payments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::index
* @see Http/Controllers/Api/V1/PaymentController.php:22
* @route '/api/v1/payments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::index
* @see Http/Controllers/Api/V1/PaymentController.php:22
* @route '/api/v1/payments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::index
* @see Http/Controllers/Api/V1/PaymentController.php:22
* @route '/api/v1/payments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::index
* @see Http/Controllers/Api/V1/PaymentController.php:22
* @route '/api/v1/payments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::index
* @see Http/Controllers/Api/V1/PaymentController.php:22
* @route '/api/v1/payments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::index
* @see Http/Controllers/Api/V1/PaymentController.php:22
* @route '/api/v1/payments'
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
* @see \App\Http\Controllers\Api\V1\PaymentController::pay
* @see Http/Controllers/Api/V1/PaymentController.php:37
* @route '/api/v1/payments/bill'
*/
export const pay = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pay.url(options),
    method: 'post',
})

pay.definition = {
    methods: ["post"],
    url: '/api/v1/payments/bill',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::pay
* @see Http/Controllers/Api/V1/PaymentController.php:37
* @route '/api/v1/payments/bill'
*/
pay.url = (options?: RouteQueryOptions) => {
    return pay.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::pay
* @see Http/Controllers/Api/V1/PaymentController.php:37
* @route '/api/v1/payments/bill'
*/
pay.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pay.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::pay
* @see Http/Controllers/Api/V1/PaymentController.php:37
* @route '/api/v1/payments/bill'
*/
const payForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pay.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::pay
* @see Http/Controllers/Api/V1/PaymentController.php:37
* @route '/api/v1/payments/bill'
*/
payForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pay.url(options),
    method: 'post',
})

pay.form = payForm

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::airtime
* @see Http/Controllers/Api/V1/PaymentController.php:47
* @route '/api/v1/payments/airtime'
*/
export const airtime = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: airtime.url(options),
    method: 'post',
})

airtime.definition = {
    methods: ["post"],
    url: '/api/v1/payments/airtime',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::airtime
* @see Http/Controllers/Api/V1/PaymentController.php:47
* @route '/api/v1/payments/airtime'
*/
airtime.url = (options?: RouteQueryOptions) => {
    return airtime.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::airtime
* @see Http/Controllers/Api/V1/PaymentController.php:47
* @route '/api/v1/payments/airtime'
*/
airtime.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: airtime.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::airtime
* @see Http/Controllers/Api/V1/PaymentController.php:47
* @route '/api/v1/payments/airtime'
*/
const airtimeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: airtime.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\PaymentController::airtime
* @see Http/Controllers/Api/V1/PaymentController.php:47
* @route '/api/v1/payments/airtime'
*/
airtimeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: airtime.url(options),
    method: 'post',
})

airtime.form = airtimeForm

const PaymentController = { billers, index, pay, airtime }

export default PaymentController