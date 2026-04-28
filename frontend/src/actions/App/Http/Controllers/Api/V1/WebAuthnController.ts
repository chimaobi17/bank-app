import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::list
* @see Http/Controllers/Api/V1/WebAuthnController.php:120
* @route '/api/v1/webauthn/passkeys'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/v1/webauthn/passkeys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::list
* @see Http/Controllers/Api/V1/WebAuthnController.php:120
* @route '/api/v1/webauthn/passkeys'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::list
* @see Http/Controllers/Api/V1/WebAuthnController.php:120
* @route '/api/v1/webauthn/passkeys'
*/
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::list
* @see Http/Controllers/Api/V1/WebAuthnController.php:120
* @route '/api/v1/webauthn/passkeys'
*/
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::list
* @see Http/Controllers/Api/V1/WebAuthnController.php:120
* @route '/api/v1/webauthn/passkeys'
*/
const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::list
* @see Http/Controllers/Api/V1/WebAuthnController.php:120
* @route '/api/v1/webauthn/passkeys'
*/
listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::list
* @see Http/Controllers/Api/V1/WebAuthnController.php:120
* @route '/api/v1/webauthn/passkeys'
*/
listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

list.form = listForm

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::beginRegistration
* @see Http/Controllers/Api/V1/WebAuthnController.php:21
* @route '/api/v1/webauthn/register'
*/
export const beginRegistration = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: beginRegistration.url(options),
    method: 'post',
})

beginRegistration.definition = {
    methods: ["post"],
    url: '/api/v1/webauthn/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::beginRegistration
* @see Http/Controllers/Api/V1/WebAuthnController.php:21
* @route '/api/v1/webauthn/register'
*/
beginRegistration.url = (options?: RouteQueryOptions) => {
    return beginRegistration.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::beginRegistration
* @see Http/Controllers/Api/V1/WebAuthnController.php:21
* @route '/api/v1/webauthn/register'
*/
beginRegistration.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: beginRegistration.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::beginRegistration
* @see Http/Controllers/Api/V1/WebAuthnController.php:21
* @route '/api/v1/webauthn/register'
*/
const beginRegistrationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: beginRegistration.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::beginRegistration
* @see Http/Controllers/Api/V1/WebAuthnController.php:21
* @route '/api/v1/webauthn/register'
*/
beginRegistrationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: beginRegistration.url(options),
    method: 'post',
})

beginRegistration.form = beginRegistrationForm

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::completeRegistration
* @see Http/Controllers/Api/V1/WebAuthnController.php:38
* @route '/api/v1/webauthn/register/complete'
*/
export const completeRegistration = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeRegistration.url(options),
    method: 'post',
})

completeRegistration.definition = {
    methods: ["post"],
    url: '/api/v1/webauthn/register/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::completeRegistration
* @see Http/Controllers/Api/V1/WebAuthnController.php:38
* @route '/api/v1/webauthn/register/complete'
*/
completeRegistration.url = (options?: RouteQueryOptions) => {
    return completeRegistration.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::completeRegistration
* @see Http/Controllers/Api/V1/WebAuthnController.php:38
* @route '/api/v1/webauthn/register/complete'
*/
completeRegistration.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeRegistration.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::completeRegistration
* @see Http/Controllers/Api/V1/WebAuthnController.php:38
* @route '/api/v1/webauthn/register/complete'
*/
const completeRegistrationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: completeRegistration.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::completeRegistration
* @see Http/Controllers/Api/V1/WebAuthnController.php:38
* @route '/api/v1/webauthn/register/complete'
*/
completeRegistrationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: completeRegistration.url(options),
    method: 'post',
})

completeRegistration.form = completeRegistrationForm

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::beginAuthentication
* @see Http/Controllers/Api/V1/WebAuthnController.php:73
* @route '/api/v1/webauthn/authenticate'
*/
export const beginAuthentication = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: beginAuthentication.url(options),
    method: 'post',
})

beginAuthentication.definition = {
    methods: ["post"],
    url: '/api/v1/webauthn/authenticate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::beginAuthentication
* @see Http/Controllers/Api/V1/WebAuthnController.php:73
* @route '/api/v1/webauthn/authenticate'
*/
beginAuthentication.url = (options?: RouteQueryOptions) => {
    return beginAuthentication.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::beginAuthentication
* @see Http/Controllers/Api/V1/WebAuthnController.php:73
* @route '/api/v1/webauthn/authenticate'
*/
beginAuthentication.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: beginAuthentication.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::beginAuthentication
* @see Http/Controllers/Api/V1/WebAuthnController.php:73
* @route '/api/v1/webauthn/authenticate'
*/
const beginAuthenticationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: beginAuthentication.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::beginAuthentication
* @see Http/Controllers/Api/V1/WebAuthnController.php:73
* @route '/api/v1/webauthn/authenticate'
*/
beginAuthenticationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: beginAuthentication.url(options),
    method: 'post',
})

beginAuthentication.form = beginAuthenticationForm

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::verifyAssertion
* @see Http/Controllers/Api/V1/WebAuthnController.php:89
* @route '/api/v1/webauthn/verify'
*/
export const verifyAssertion = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyAssertion.url(options),
    method: 'post',
})

verifyAssertion.definition = {
    methods: ["post"],
    url: '/api/v1/webauthn/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::verifyAssertion
* @see Http/Controllers/Api/V1/WebAuthnController.php:89
* @route '/api/v1/webauthn/verify'
*/
verifyAssertion.url = (options?: RouteQueryOptions) => {
    return verifyAssertion.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::verifyAssertion
* @see Http/Controllers/Api/V1/WebAuthnController.php:89
* @route '/api/v1/webauthn/verify'
*/
verifyAssertion.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyAssertion.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::verifyAssertion
* @see Http/Controllers/Api/V1/WebAuthnController.php:89
* @route '/api/v1/webauthn/verify'
*/
const verifyAssertionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verifyAssertion.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::verifyAssertion
* @see Http/Controllers/Api/V1/WebAuthnController.php:89
* @route '/api/v1/webauthn/verify'
*/
verifyAssertionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verifyAssertion.url(options),
    method: 'post',
})

verifyAssertion.form = verifyAssertionForm

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::revoke
* @see Http/Controllers/Api/V1/WebAuthnController.php:139
* @route '/api/v1/webauthn/passkeys/{credentialId}'
*/
export const revoke = (args: { credentialId: string | number } | [credentialId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revoke.url(args, options),
    method: 'delete',
})

revoke.definition = {
    methods: ["delete"],
    url: '/api/v1/webauthn/passkeys/{credentialId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::revoke
* @see Http/Controllers/Api/V1/WebAuthnController.php:139
* @route '/api/v1/webauthn/passkeys/{credentialId}'
*/
revoke.url = (args: { credentialId: string | number } | [credentialId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credentialId: args }
    }

    if (Array.isArray(args)) {
        args = {
            credentialId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credentialId: args.credentialId,
    }

    return revoke.definition.url
            .replace('{credentialId}', parsedArgs.credentialId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::revoke
* @see Http/Controllers/Api/V1/WebAuthnController.php:139
* @route '/api/v1/webauthn/passkeys/{credentialId}'
*/
revoke.delete = (args: { credentialId: string | number } | [credentialId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revoke.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::revoke
* @see Http/Controllers/Api/V1/WebAuthnController.php:139
* @route '/api/v1/webauthn/passkeys/{credentialId}'
*/
const revokeForm = (args: { credentialId: string | number } | [credentialId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revoke.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\WebAuthnController::revoke
* @see Http/Controllers/Api/V1/WebAuthnController.php:139
* @route '/api/v1/webauthn/passkeys/{credentialId}'
*/
revokeForm.delete = (args: { credentialId: string | number } | [credentialId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revoke.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

revoke.form = revokeForm

const WebAuthnController = { list, beginRegistration, completeRegistration, beginAuthentication, verifyAssertion, revoke }

export default WebAuthnController