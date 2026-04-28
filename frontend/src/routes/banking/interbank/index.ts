import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\InterbankPageController::enquiry
* @see Http/Controllers/Banking/InterbankPageController.php:41
* @route '/banking/interbank/name-enquiry'
*/
export const enquiry = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enquiry.url(options),
    method: 'post',
})

enquiry.definition = {
    methods: ["post"],
    url: '/banking/interbank/name-enquiry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::enquiry
* @see Http/Controllers/Banking/InterbankPageController.php:41
* @route '/banking/interbank/name-enquiry'
*/
enquiry.url = (options?: RouteQueryOptions) => {
    return enquiry.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::enquiry
* @see Http/Controllers/Banking/InterbankPageController.php:41
* @route '/banking/interbank/name-enquiry'
*/
enquiry.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enquiry.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::enquiry
* @see Http/Controllers/Banking/InterbankPageController.php:41
* @route '/banking/interbank/name-enquiry'
*/
const enquiryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enquiry.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::enquiry
* @see Http/Controllers/Banking/InterbankPageController.php:41
* @route '/banking/interbank/name-enquiry'
*/
enquiryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enquiry.url(options),
    method: 'post',
})

enquiry.form = enquiryForm

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::store
* @see Http/Controllers/Banking/InterbankPageController.php:60
* @route '/banking/interbank'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/banking/interbank',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::store
* @see Http/Controllers/Banking/InterbankPageController.php:60
* @route '/banking/interbank'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::store
* @see Http/Controllers/Banking/InterbankPageController.php:60
* @route '/banking/interbank'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::store
* @see Http/Controllers/Banking/InterbankPageController.php:60
* @route '/banking/interbank'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::store
* @see Http/Controllers/Banking/InterbankPageController.php:60
* @route '/banking/interbank'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const interbank = {
    enquiry: Object.assign(enquiry, enquiry),
    store: Object.assign(store, store),
}

export default interbank