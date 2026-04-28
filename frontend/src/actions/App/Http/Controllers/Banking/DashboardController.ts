import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/dashboard'
*/
const DashboardController42a740574ecbfbac32f8cc353fc32db9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DashboardController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

DashboardController42a740574ecbfbac32f8cc353fc32db9.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/dashboard'
*/
DashboardController42a740574ecbfbac32f8cc353fc32db9.url = (options?: RouteQueryOptions) => {
    return DashboardController42a740574ecbfbac32f8cc353fc32db9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/dashboard'
*/
DashboardController42a740574ecbfbac32f8cc353fc32db9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DashboardController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/dashboard'
*/
DashboardController42a740574ecbfbac32f8cc353fc32db9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: DashboardController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/dashboard'
*/
const DashboardController42a740574ecbfbac32f8cc353fc32db9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DashboardController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/dashboard'
*/
DashboardController42a740574ecbfbac32f8cc353fc32db9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DashboardController42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/dashboard'
*/
DashboardController42a740574ecbfbac32f8cc353fc32db9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DashboardController42a740574ecbfbac32f8cc353fc32db9.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

DashboardController42a740574ecbfbac32f8cc353fc32db9.form = DashboardController42a740574ecbfbac32f8cc353fc32db9Form
/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
const DashboardController9f76abbf23c25cbc2198df6ba3b945b4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DashboardController9f76abbf23c25cbc2198df6ba3b945b4.url(options),
    method: 'get',
})

DashboardController9f76abbf23c25cbc2198df6ba3b945b4.definition = {
    methods: ["get","head"],
    url: '/banking/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
DashboardController9f76abbf23c25cbc2198df6ba3b945b4.url = (options?: RouteQueryOptions) => {
    return DashboardController9f76abbf23c25cbc2198df6ba3b945b4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
DashboardController9f76abbf23c25cbc2198df6ba3b945b4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: DashboardController9f76abbf23c25cbc2198df6ba3b945b4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
DashboardController9f76abbf23c25cbc2198df6ba3b945b4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: DashboardController9f76abbf23c25cbc2198df6ba3b945b4.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
const DashboardController9f76abbf23c25cbc2198df6ba3b945b4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DashboardController9f76abbf23c25cbc2198df6ba3b945b4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
DashboardController9f76abbf23c25cbc2198df6ba3b945b4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DashboardController9f76abbf23c25cbc2198df6ba3b945b4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
DashboardController9f76abbf23c25cbc2198df6ba3b945b4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: DashboardController9f76abbf23c25cbc2198df6ba3b945b4.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

DashboardController9f76abbf23c25cbc2198df6ba3b945b4.form = DashboardController9f76abbf23c25cbc2198df6ba3b945b4Form

const DashboardController = {
    '/dashboard': DashboardController42a740574ecbfbac32f8cc353fc32db9,
    '/banking/dashboard': DashboardController9f76abbf23c25cbc2198df6ba3b945b4,
}

export default DashboardController