import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::index
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/banking/payments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::index
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::index
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::index
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::index
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::index
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::index
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
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
* @see \App\Http\Controllers\Banking\PaymentsPageController::payBill
* @see Http/Controllers/Banking/PaymentsPageController.php:69
* @route '/banking/payments/bill'
*/
export const payBill = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payBill.url(options),
    method: 'post',
})

payBill.definition = {
    methods: ["post"],
    url: '/banking/payments/bill',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payBill
* @see Http/Controllers/Banking/PaymentsPageController.php:69
* @route '/banking/payments/bill'
*/
payBill.url = (options?: RouteQueryOptions) => {
    return payBill.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payBill
* @see Http/Controllers/Banking/PaymentsPageController.php:69
* @route '/banking/payments/bill'
*/
payBill.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payBill.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payBill
* @see Http/Controllers/Banking/PaymentsPageController.php:69
* @route '/banking/payments/bill'
*/
const payBillForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payBill.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payBill
* @see Http/Controllers/Banking/PaymentsPageController.php:69
* @route '/banking/payments/bill'
*/
payBillForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payBill.url(options),
    method: 'post',
})

payBill.form = payBillForm

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payAirtime
* @see Http/Controllers/Banking/PaymentsPageController.php:81
* @route '/banking/payments/airtime'
*/
export const payAirtime = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payAirtime.url(options),
    method: 'post',
})

payAirtime.definition = {
    methods: ["post"],
    url: '/banking/payments/airtime',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payAirtime
* @see Http/Controllers/Banking/PaymentsPageController.php:81
* @route '/banking/payments/airtime'
*/
payAirtime.url = (options?: RouteQueryOptions) => {
    return payAirtime.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payAirtime
* @see Http/Controllers/Banking/PaymentsPageController.php:81
* @route '/banking/payments/airtime'
*/
payAirtime.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payAirtime.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payAirtime
* @see Http/Controllers/Banking/PaymentsPageController.php:81
* @route '/banking/payments/airtime'
*/
const payAirtimeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payAirtime.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payAirtime
* @see Http/Controllers/Banking/PaymentsPageController.php:81
* @route '/banking/payments/airtime'
*/
payAirtimeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: payAirtime.url(options),
    method: 'post',
})

payAirtime.form = payAirtimeForm

const PaymentsPageController = { index, payBill, payAirtime }

export default PaymentsPageController