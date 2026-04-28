import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::complete
* @see Http/Controllers/Banking/PasskeysPageController.php:57
* @route '/banking/security/passkeys/register/complete'
*/
export const complete = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/banking/security/passkeys/register/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::complete
* @see Http/Controllers/Banking/PasskeysPageController.php:57
* @route '/banking/security/passkeys/register/complete'
*/
complete.url = (options?: RouteQueryOptions) => {
    return complete.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::complete
* @see Http/Controllers/Banking/PasskeysPageController.php:57
* @route '/banking/security/passkeys/register/complete'
*/
complete.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::complete
* @see Http/Controllers/Banking/PasskeysPageController.php:57
* @route '/banking/security/passkeys/register/complete'
*/
const completeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: complete.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::complete
* @see Http/Controllers/Banking/PasskeysPageController.php:57
* @route '/banking/security/passkeys/register/complete'
*/
completeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: complete.url(options),
    method: 'post',
})

complete.form = completeForm

const register = {
    complete: Object.assign(complete, complete),
}

export default register