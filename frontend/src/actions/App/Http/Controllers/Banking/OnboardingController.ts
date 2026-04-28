import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\OnboardingController::show
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/banking/onboarding',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\OnboardingController::show
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\OnboardingController::show
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::show
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::show
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::show
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::show
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Banking\OnboardingController::submitIdentity
* @see Http/Controllers/Banking/OnboardingController.php:45
* @route '/banking/onboarding/identity'
*/
export const submitIdentity = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitIdentity.url(options),
    method: 'post',
})

submitIdentity.definition = {
    methods: ["post"],
    url: '/banking/onboarding/identity',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\OnboardingController::submitIdentity
* @see Http/Controllers/Banking/OnboardingController.php:45
* @route '/banking/onboarding/identity'
*/
submitIdentity.url = (options?: RouteQueryOptions) => {
    return submitIdentity.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\OnboardingController::submitIdentity
* @see Http/Controllers/Banking/OnboardingController.php:45
* @route '/banking/onboarding/identity'
*/
submitIdentity.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitIdentity.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::submitIdentity
* @see Http/Controllers/Banking/OnboardingController.php:45
* @route '/banking/onboarding/identity'
*/
const submitIdentityForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitIdentity.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::submitIdentity
* @see Http/Controllers/Banking/OnboardingController.php:45
* @route '/banking/onboarding/identity'
*/
submitIdentityForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitIdentity.url(options),
    method: 'post',
})

submitIdentity.form = submitIdentityForm

/**
* @see \App\Http\Controllers\Banking\OnboardingController::submitAddressProof
* @see Http/Controllers/Banking/OnboardingController.php:76
* @route '/banking/onboarding/address'
*/
export const submitAddressProof = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitAddressProof.url(options),
    method: 'post',
})

submitAddressProof.definition = {
    methods: ["post"],
    url: '/banking/onboarding/address',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\OnboardingController::submitAddressProof
* @see Http/Controllers/Banking/OnboardingController.php:76
* @route '/banking/onboarding/address'
*/
submitAddressProof.url = (options?: RouteQueryOptions) => {
    return submitAddressProof.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\OnboardingController::submitAddressProof
* @see Http/Controllers/Banking/OnboardingController.php:76
* @route '/banking/onboarding/address'
*/
submitAddressProof.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitAddressProof.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::submitAddressProof
* @see Http/Controllers/Banking/OnboardingController.php:76
* @route '/banking/onboarding/address'
*/
const submitAddressProofForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitAddressProof.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::submitAddressProof
* @see Http/Controllers/Banking/OnboardingController.php:76
* @route '/banking/onboarding/address'
*/
submitAddressProofForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitAddressProof.url(options),
    method: 'post',
})

submitAddressProof.form = submitAddressProofForm

const OnboardingController = { show, submitIdentity, submitAddressProof }

export default OnboardingController