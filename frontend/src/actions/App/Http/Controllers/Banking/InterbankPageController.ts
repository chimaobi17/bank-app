import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\InterbankPageController::create
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/banking/interbank',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::create
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::create
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::create
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::create
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::create
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::create
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
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
* @see \App\Http\Controllers\Banking\InterbankPageController::nameEnquiry
* @see Http/Controllers/Banking/InterbankPageController.php:41
* @route '/banking/interbank/name-enquiry'
*/
export const nameEnquiry = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: nameEnquiry.url(options),
    method: 'post',
})

nameEnquiry.definition = {
    methods: ["post"],
    url: '/banking/interbank/name-enquiry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::nameEnquiry
* @see Http/Controllers/Banking/InterbankPageController.php:41
* @route '/banking/interbank/name-enquiry'
*/
nameEnquiry.url = (options?: RouteQueryOptions) => {
    return nameEnquiry.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::nameEnquiry
* @see Http/Controllers/Banking/InterbankPageController.php:41
* @route '/banking/interbank/name-enquiry'
*/
nameEnquiry.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: nameEnquiry.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::nameEnquiry
* @see Http/Controllers/Banking/InterbankPageController.php:41
* @route '/banking/interbank/name-enquiry'
*/
const nameEnquiryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: nameEnquiry.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::nameEnquiry
* @see Http/Controllers/Banking/InterbankPageController.php:41
* @route '/banking/interbank/name-enquiry'
*/
nameEnquiryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: nameEnquiry.url(options),
    method: 'post',
})

nameEnquiry.form = nameEnquiryForm

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

const InterbankPageController = { create, nameEnquiry, store }

export default InterbankPageController