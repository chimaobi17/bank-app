import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::index
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/banking/security/passkeys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::index
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::index
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::index
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::index
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::index
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::index
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
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
* @see \App\Http\Controllers\Banking\PasskeysPageController::beginRegistration
* @see Http/Controllers/Banking/PasskeysPageController.php:46
* @route '/banking/security/passkeys/register'
*/
export const beginRegistration = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: beginRegistration.url(options),
    method: 'post',
})

beginRegistration.definition = {
    methods: ["post"],
    url: '/banking/security/passkeys/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::beginRegistration
* @see Http/Controllers/Banking/PasskeysPageController.php:46
* @route '/banking/security/passkeys/register'
*/
beginRegistration.url = (options?: RouteQueryOptions) => {
    return beginRegistration.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::beginRegistration
* @see Http/Controllers/Banking/PasskeysPageController.php:46
* @route '/banking/security/passkeys/register'
*/
beginRegistration.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: beginRegistration.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::beginRegistration
* @see Http/Controllers/Banking/PasskeysPageController.php:46
* @route '/banking/security/passkeys/register'
*/
const beginRegistrationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: beginRegistration.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::beginRegistration
* @see Http/Controllers/Banking/PasskeysPageController.php:46
* @route '/banking/security/passkeys/register'
*/
beginRegistrationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: beginRegistration.url(options),
    method: 'post',
})

beginRegistration.form = beginRegistrationForm

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::completeRegistration
* @see Http/Controllers/Banking/PasskeysPageController.php:57
* @route '/banking/security/passkeys/register/complete'
*/
export const completeRegistration = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeRegistration.url(options),
    method: 'post',
})

completeRegistration.definition = {
    methods: ["post"],
    url: '/banking/security/passkeys/register/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::completeRegistration
* @see Http/Controllers/Banking/PasskeysPageController.php:57
* @route '/banking/security/passkeys/register/complete'
*/
completeRegistration.url = (options?: RouteQueryOptions) => {
    return completeRegistration.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::completeRegistration
* @see Http/Controllers/Banking/PasskeysPageController.php:57
* @route '/banking/security/passkeys/register/complete'
*/
completeRegistration.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: completeRegistration.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::completeRegistration
* @see Http/Controllers/Banking/PasskeysPageController.php:57
* @route '/banking/security/passkeys/register/complete'
*/
const completeRegistrationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: completeRegistration.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::completeRegistration
* @see Http/Controllers/Banking/PasskeysPageController.php:57
* @route '/banking/security/passkeys/register/complete'
*/
completeRegistrationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: completeRegistration.url(options),
    method: 'post',
})

completeRegistration.form = completeRegistrationForm

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::beginAuthentication
* @see Http/Controllers/Banking/PasskeysPageController.php:85
* @route '/banking/security/passkeys/authenticate'
*/
export const beginAuthentication = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: beginAuthentication.url(options),
    method: 'post',
})

beginAuthentication.definition = {
    methods: ["post"],
    url: '/banking/security/passkeys/authenticate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::beginAuthentication
* @see Http/Controllers/Banking/PasskeysPageController.php:85
* @route '/banking/security/passkeys/authenticate'
*/
beginAuthentication.url = (options?: RouteQueryOptions) => {
    return beginAuthentication.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::beginAuthentication
* @see Http/Controllers/Banking/PasskeysPageController.php:85
* @route '/banking/security/passkeys/authenticate'
*/
beginAuthentication.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: beginAuthentication.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::beginAuthentication
* @see Http/Controllers/Banking/PasskeysPageController.php:85
* @route '/banking/security/passkeys/authenticate'
*/
const beginAuthenticationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: beginAuthentication.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::beginAuthentication
* @see Http/Controllers/Banking/PasskeysPageController.php:85
* @route '/banking/security/passkeys/authenticate'
*/
beginAuthenticationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: beginAuthentication.url(options),
    method: 'post',
})

beginAuthentication.form = beginAuthenticationForm

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::verifyAssertion
* @see Http/Controllers/Banking/PasskeysPageController.php:96
* @route '/banking/security/passkeys/verify'
*/
export const verifyAssertion = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyAssertion.url(options),
    method: 'post',
})

verifyAssertion.definition = {
    methods: ["post"],
    url: '/banking/security/passkeys/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::verifyAssertion
* @see Http/Controllers/Banking/PasskeysPageController.php:96
* @route '/banking/security/passkeys/verify'
*/
verifyAssertion.url = (options?: RouteQueryOptions) => {
    return verifyAssertion.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::verifyAssertion
* @see Http/Controllers/Banking/PasskeysPageController.php:96
* @route '/banking/security/passkeys/verify'
*/
verifyAssertion.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyAssertion.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::verifyAssertion
* @see Http/Controllers/Banking/PasskeysPageController.php:96
* @route '/banking/security/passkeys/verify'
*/
const verifyAssertionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verifyAssertion.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::verifyAssertion
* @see Http/Controllers/Banking/PasskeysPageController.php:96
* @route '/banking/security/passkeys/verify'
*/
verifyAssertionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verifyAssertion.url(options),
    method: 'post',
})

verifyAssertion.form = verifyAssertionForm

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::revoke
* @see Http/Controllers/Banking/PasskeysPageController.php:118
* @route '/banking/security/passkeys/{credentialId}/revoke'
*/
export const revoke = (args: { credentialId: string | number } | [credentialId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

revoke.definition = {
    methods: ["post"],
    url: '/banking/security/passkeys/{credentialId}/revoke',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::revoke
* @see Http/Controllers/Banking/PasskeysPageController.php:118
* @route '/banking/security/passkeys/{credentialId}/revoke'
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
* @see \App\Http\Controllers\Banking\PasskeysPageController::revoke
* @see Http/Controllers/Banking/PasskeysPageController.php:118
* @route '/banking/security/passkeys/{credentialId}/revoke'
*/
revoke.post = (args: { credentialId: string | number } | [credentialId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::revoke
* @see Http/Controllers/Banking/PasskeysPageController.php:118
* @route '/banking/security/passkeys/{credentialId}/revoke'
*/
const revokeForm = (args: { credentialId: string | number } | [credentialId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revoke.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::revoke
* @see Http/Controllers/Banking/PasskeysPageController.php:118
* @route '/banking/security/passkeys/{credentialId}/revoke'
*/
revokeForm.post = (args: { credentialId: string | number } | [credentialId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revoke.url(args, options),
    method: 'post',
})

revoke.form = revokeForm

const PasskeysPageController = { index, beginRegistration, completeRegistration, beginAuthentication, verifyAssertion, revoke }

export default PasskeysPageController