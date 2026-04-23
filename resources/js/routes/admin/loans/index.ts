import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminLoansController::approve
* @see Http/Controllers/Admin/AdminLoansController.php:43
* @route '/admin/loans/{id}/approve'
*/
export const approve = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/loans/{id}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::approve
* @see Http/Controllers/Admin/AdminLoansController.php:43
* @route '/admin/loans/{id}/approve'
*/
approve.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return approve.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::approve
* @see Http/Controllers/Admin/AdminLoansController.php:43
* @route '/admin/loans/{id}/approve'
*/
approve.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::approve
* @see Http/Controllers/Admin/AdminLoansController.php:43
* @route '/admin/loans/{id}/approve'
*/
const approveForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::approve
* @see Http/Controllers/Admin/AdminLoansController.php:43
* @route '/admin/loans/{id}/approve'
*/
approveForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::reject
* @see Http/Controllers/Admin/AdminLoansController.php:51
* @route '/admin/loans/{id}/reject'
*/
export const reject = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/loans/{id}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::reject
* @see Http/Controllers/Admin/AdminLoansController.php:51
* @route '/admin/loans/{id}/reject'
*/
reject.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return reject.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::reject
* @see Http/Controllers/Admin/AdminLoansController.php:51
* @route '/admin/loans/{id}/reject'
*/
reject.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::reject
* @see Http/Controllers/Admin/AdminLoansController.php:51
* @route '/admin/loans/{id}/reject'
*/
const rejectForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::reject
* @see Http/Controllers/Admin/AdminLoansController.php:51
* @route '/admin/loans/{id}/reject'
*/
rejectForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::disburse
* @see Http/Controllers/Admin/AdminLoansController.php:59
* @route '/admin/loans/{id}/disburse'
*/
export const disburse = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disburse.url(args, options),
    method: 'post',
})

disburse.definition = {
    methods: ["post"],
    url: '/admin/loans/{id}/disburse',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::disburse
* @see Http/Controllers/Admin/AdminLoansController.php:59
* @route '/admin/loans/{id}/disburse'
*/
disburse.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return disburse.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::disburse
* @see Http/Controllers/Admin/AdminLoansController.php:59
* @route '/admin/loans/{id}/disburse'
*/
disburse.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disburse.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::disburse
* @see Http/Controllers/Admin/AdminLoansController.php:59
* @route '/admin/loans/{id}/disburse'
*/
const disburseForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: disburse.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminLoansController::disburse
* @see Http/Controllers/Admin/AdminLoansController.php:59
* @route '/admin/loans/{id}/disburse'
*/
disburseForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: disburse.url(args, options),
    method: 'post',
})

disburse.form = disburseForm

const loans = {
    approve: Object.assign(approve, approve),
    reject: Object.assign(reject, reject),
    disburse: Object.assign(disburse, disburse),
}

export default loans