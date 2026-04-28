import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import register702019 from './register'
/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::register
* @see Http/Controllers/Banking/PasskeysPageController.php:46
* @route '/banking/security/passkeys/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/banking/security/passkeys/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::register
* @see Http/Controllers/Banking/PasskeysPageController.php:46
* @route '/banking/security/passkeys/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::register
* @see Http/Controllers/Banking/PasskeysPageController.php:46
* @route '/banking/security/passkeys/register'
*/
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::register
* @see Http/Controllers/Banking/PasskeysPageController.php:46
* @route '/banking/security/passkeys/register'
*/
const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::register
* @see Http/Controllers/Banking/PasskeysPageController.php:46
* @route '/banking/security/passkeys/register'
*/
registerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: register.url(options),
    method: 'post',
})

register.form = registerForm

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::authenticate
* @see Http/Controllers/Banking/PasskeysPageController.php:85
* @route '/banking/security/passkeys/authenticate'
*/
export const authenticate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(options),
    method: 'post',
})

authenticate.definition = {
    methods: ["post"],
    url: '/banking/security/passkeys/authenticate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::authenticate
* @see Http/Controllers/Banking/PasskeysPageController.php:85
* @route '/banking/security/passkeys/authenticate'
*/
authenticate.url = (options?: RouteQueryOptions) => {
    return authenticate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::authenticate
* @see Http/Controllers/Banking/PasskeysPageController.php:85
* @route '/banking/security/passkeys/authenticate'
*/
authenticate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::authenticate
* @see Http/Controllers/Banking/PasskeysPageController.php:85
* @route '/banking/security/passkeys/authenticate'
*/
const authenticateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: authenticate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::authenticate
* @see Http/Controllers/Banking/PasskeysPageController.php:85
* @route '/banking/security/passkeys/authenticate'
*/
authenticateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: authenticate.url(options),
    method: 'post',
})

authenticate.form = authenticateForm

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::verify
* @see Http/Controllers/Banking/PasskeysPageController.php:96
* @route '/banking/security/passkeys/verify'
*/
export const verify = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/banking/security/passkeys/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::verify
* @see Http/Controllers/Banking/PasskeysPageController.php:96
* @route '/banking/security/passkeys/verify'
*/
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::verify
* @see Http/Controllers/Banking/PasskeysPageController.php:96
* @route '/banking/security/passkeys/verify'
*/
verify.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::verify
* @see Http/Controllers/Banking/PasskeysPageController.php:96
* @route '/banking/security/passkeys/verify'
*/
const verifyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::verify
* @see Http/Controllers/Banking/PasskeysPageController.php:96
* @route '/banking/security/passkeys/verify'
*/
verifyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: verify.url(options),
    method: 'post',
})

verify.form = verifyForm

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

const passkeys = {
    register: Object.assign(register, register702019),
    authenticate: Object.assign(authenticate, authenticate),
    verify: Object.assign(verify, verify),
    revoke: Object.assign(revoke, revoke),
}

export default passkeys