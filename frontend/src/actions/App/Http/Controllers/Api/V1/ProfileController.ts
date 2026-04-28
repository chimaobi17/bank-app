import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\ProfileController::show
* @see Http/Controllers/Api/V1/ProfileController.php:16
* @route '/api/v1/profile'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::show
* @see Http/Controllers/Api/V1/ProfileController.php:16
* @route '/api/v1/profile'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::show
* @see Http/Controllers/Api/V1/ProfileController.php:16
* @route '/api/v1/profile'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::show
* @see Http/Controllers/Api/V1/ProfileController.php:16
* @route '/api/v1/profile'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::show
* @see Http/Controllers/Api/V1/ProfileController.php:16
* @route '/api/v1/profile'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::show
* @see Http/Controllers/Api/V1/ProfileController.php:16
* @route '/api/v1/profile'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::show
* @see Http/Controllers/Api/V1/ProfileController.php:16
* @route '/api/v1/profile'
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
* @see \App\Http\Controllers\Api\V1\ProfileController::update
* @see Http/Controllers/Api/V1/ProfileController.php:21
* @route '/api/v1/profile'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/api/v1/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::update
* @see Http/Controllers/Api/V1/ProfileController.php:21
* @route '/api/v1/profile'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::update
* @see Http/Controllers/Api/V1/ProfileController.php:21
* @route '/api/v1/profile'
*/
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::update
* @see Http/Controllers/Api/V1/ProfileController.php:21
* @route '/api/v1/profile'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::update
* @see Http/Controllers/Api/V1/ProfileController.php:21
* @route '/api/v1/profile'
*/
updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::changePassword
* @see Http/Controllers/Api/V1/ProfileController.php:46
* @route '/api/v1/profile/change-password'
*/
export const changePassword = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: changePassword.url(options),
    method: 'post',
})

changePassword.definition = {
    methods: ["post"],
    url: '/api/v1/profile/change-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::changePassword
* @see Http/Controllers/Api/V1/ProfileController.php:46
* @route '/api/v1/profile/change-password'
*/
changePassword.url = (options?: RouteQueryOptions) => {
    return changePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::changePassword
* @see Http/Controllers/Api/V1/ProfileController.php:46
* @route '/api/v1/profile/change-password'
*/
changePassword.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: changePassword.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::changePassword
* @see Http/Controllers/Api/V1/ProfileController.php:46
* @route '/api/v1/profile/change-password'
*/
const changePasswordForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: changePassword.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\ProfileController::changePassword
* @see Http/Controllers/Api/V1/ProfileController.php:46
* @route '/api/v1/profile/change-password'
*/
changePasswordForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: changePassword.url(options),
    method: 'post',
})

changePassword.form = changePasswordForm

const ProfileController = { show, update, changePassword }

export default ProfileController