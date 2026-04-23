import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::bill
* @see Http/Controllers/Banking/PaymentsPageController.php:69
* @route '/banking/payments/bill'
*/
export const bill = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bill.url(options),
    method: 'post',
})

bill.definition = {
    methods: ["post"],
    url: '/banking/payments/bill',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::bill
* @see Http/Controllers/Banking/PaymentsPageController.php:69
* @route '/banking/payments/bill'
*/
bill.url = (options?: RouteQueryOptions) => {
    return bill.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::bill
* @see Http/Controllers/Banking/PaymentsPageController.php:69
* @route '/banking/payments/bill'
*/
bill.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bill.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::bill
* @see Http/Controllers/Banking/PaymentsPageController.php:69
* @route '/banking/payments/bill'
*/
const billForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bill.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::bill
* @see Http/Controllers/Banking/PaymentsPageController.php:69
* @route '/banking/payments/bill'
*/
billForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: bill.url(options),
    method: 'post',
})

bill.form = billForm

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::airtime
* @see Http/Controllers/Banking/PaymentsPageController.php:81
* @route '/banking/payments/airtime'
*/
export const airtime = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: airtime.url(options),
    method: 'post',
})

airtime.definition = {
    methods: ["post"],
    url: '/banking/payments/airtime',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::airtime
* @see Http/Controllers/Banking/PaymentsPageController.php:81
* @route '/banking/payments/airtime'
*/
airtime.url = (options?: RouteQueryOptions) => {
    return airtime.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::airtime
* @see Http/Controllers/Banking/PaymentsPageController.php:81
* @route '/banking/payments/airtime'
*/
airtime.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: airtime.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::airtime
* @see Http/Controllers/Banking/PaymentsPageController.php:81
* @route '/banking/payments/airtime'
*/
const airtimeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: airtime.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::airtime
* @see Http/Controllers/Banking/PaymentsPageController.php:81
* @route '/banking/payments/airtime'
*/
airtimeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: airtime.url(options),
    method: 'post',
})

airtime.form = airtimeForm

const payments = {
    bill: Object.assign(bill, bill),
    airtime: Object.assign(airtime, airtime),
}

export default payments