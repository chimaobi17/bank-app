import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\IdentityVerificationController::verify
* @see Http/Controllers/Api/V1/IdentityVerificationController.php:22
* @route '/api/v1/identity/verify'
*/
export const verify = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/api/v1/identity/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\IdentityVerificationController::verify
* @see Http/Controllers/Api/V1/IdentityVerificationController.php:22
* @route '/api/v1/identity/verify'
*/
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\IdentityVerificationController::verify
* @see Http/Controllers/Api/V1/IdentityVerificationController.php:22
* @route '/api/v1/identity/verify'
*/
verify.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\IdentityVerificationController::verify
* @see Http/Controllers/Api/V1/IdentityVerificationController.php:22
* @route '/api/v1/identity/verify'
*/
const verifyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\IdentityVerificationController::verify
* @see Http/Controllers/Api/V1/IdentityVerificationController.php:22
* @route '/api/v1/identity/verify'
*/
verifyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(options),
    method: 'post',
})

verify.form = verifyForm

const IdentityVerificationController = { verify }

export default IdentityVerificationController