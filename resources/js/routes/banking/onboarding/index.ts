import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\OnboardingController::identity
* @see Http/Controllers/Banking/OnboardingController.php:45
* @route '/banking/onboarding/identity'
*/
export const identity = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: identity.url(options),
    method: 'post',
})

identity.definition = {
    methods: ["post"],
    url: '/banking/onboarding/identity',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\OnboardingController::identity
* @see Http/Controllers/Banking/OnboardingController.php:45
* @route '/banking/onboarding/identity'
*/
identity.url = (options?: RouteQueryOptions) => {
    return identity.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\OnboardingController::identity
* @see Http/Controllers/Banking/OnboardingController.php:45
* @route '/banking/onboarding/identity'
*/
identity.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: identity.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::identity
* @see Http/Controllers/Banking/OnboardingController.php:45
* @route '/banking/onboarding/identity'
*/
const identityForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: identity.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::identity
* @see Http/Controllers/Banking/OnboardingController.php:45
* @route '/banking/onboarding/identity'
*/
identityForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: identity.url(options),
    method: 'post',
})

identity.form = identityForm

/**
* @see \App\Http\Controllers\Banking\OnboardingController::address
* @see Http/Controllers/Banking/OnboardingController.php:76
* @route '/banking/onboarding/address'
*/
export const address = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: address.url(options),
    method: 'post',
})

address.definition = {
    methods: ["post"],
    url: '/banking/onboarding/address',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\OnboardingController::address
* @see Http/Controllers/Banking/OnboardingController.php:76
* @route '/banking/onboarding/address'
*/
address.url = (options?: RouteQueryOptions) => {
    return address.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\OnboardingController::address
* @see Http/Controllers/Banking/OnboardingController.php:76
* @route '/banking/onboarding/address'
*/
address.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: address.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::address
* @see Http/Controllers/Banking/OnboardingController.php:76
* @route '/banking/onboarding/address'
*/
const addressForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: address.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::address
* @see Http/Controllers/Banking/OnboardingController.php:76
* @route '/banking/onboarding/address'
*/
addressForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: address.url(options),
    method: 'post',
})

address.form = addressForm

const onboarding = {
    identity: Object.assign(identity, identity),
    address: Object.assign(address, address),
}

export default onboarding