import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::nameEnquiry
* @see Http/Controllers/Api/V1/InterbankTransferController.php:22
* @route '/api/v1/interbank/name-enquiry'
*/
export const nameEnquiry = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: nameEnquiry.url(options),
    method: 'post',
})

nameEnquiry.definition = {
    methods: ["post"],
    url: '/api/v1/interbank/name-enquiry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::nameEnquiry
* @see Http/Controllers/Api/V1/InterbankTransferController.php:22
* @route '/api/v1/interbank/name-enquiry'
*/
nameEnquiry.url = (options?: RouteQueryOptions) => {
    return nameEnquiry.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::nameEnquiry
* @see Http/Controllers/Api/V1/InterbankTransferController.php:22
* @route '/api/v1/interbank/name-enquiry'
*/
nameEnquiry.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: nameEnquiry.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::nameEnquiry
* @see Http/Controllers/Api/V1/InterbankTransferController.php:22
* @route '/api/v1/interbank/name-enquiry'
*/
const nameEnquiryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: nameEnquiry.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::nameEnquiry
* @see Http/Controllers/Api/V1/InterbankTransferController.php:22
* @route '/api/v1/interbank/name-enquiry'
*/
nameEnquiryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: nameEnquiry.url(options),
    method: 'post',
})

nameEnquiry.form = nameEnquiryForm

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::sendTransfer
* @see Http/Controllers/Api/V1/InterbankTransferController.php:46
* @route '/api/v1/interbank/transfer'
*/
export const sendTransfer = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendTransfer.url(options),
    method: 'post',
})

sendTransfer.definition = {
    methods: ["post"],
    url: '/api/v1/interbank/transfer',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::sendTransfer
* @see Http/Controllers/Api/V1/InterbankTransferController.php:46
* @route '/api/v1/interbank/transfer'
*/
sendTransfer.url = (options?: RouteQueryOptions) => {
    return sendTransfer.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::sendTransfer
* @see Http/Controllers/Api/V1/InterbankTransferController.php:46
* @route '/api/v1/interbank/transfer'
*/
sendTransfer.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendTransfer.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::sendTransfer
* @see Http/Controllers/Api/V1/InterbankTransferController.php:46
* @route '/api/v1/interbank/transfer'
*/
const sendTransferForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendTransfer.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::sendTransfer
* @see Http/Controllers/Api/V1/InterbankTransferController.php:46
* @route '/api/v1/interbank/transfer'
*/
sendTransferForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sendTransfer.url(options),
    method: 'post',
})

sendTransfer.form = sendTransferForm

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::queryStatus
* @see Http/Controllers/Api/V1/InterbankTransferController.php:95
* @route '/api/v1/interbank/transfer/{sessionId}/status'
*/
export const queryStatus = (args: { sessionId: string | number } | [sessionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: queryStatus.url(args, options),
    method: 'get',
})

queryStatus.definition = {
    methods: ["get","head"],
    url: '/api/v1/interbank/transfer/{sessionId}/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::queryStatus
* @see Http/Controllers/Api/V1/InterbankTransferController.php:95
* @route '/api/v1/interbank/transfer/{sessionId}/status'
*/
queryStatus.url = (args: { sessionId: string | number } | [sessionId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sessionId: args }
    }

    if (Array.isArray(args)) {
        args = {
            sessionId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        sessionId: args.sessionId,
    }

    return queryStatus.definition.url
            .replace('{sessionId}', parsedArgs.sessionId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::queryStatus
* @see Http/Controllers/Api/V1/InterbankTransferController.php:95
* @route '/api/v1/interbank/transfer/{sessionId}/status'
*/
queryStatus.get = (args: { sessionId: string | number } | [sessionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: queryStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::queryStatus
* @see Http/Controllers/Api/V1/InterbankTransferController.php:95
* @route '/api/v1/interbank/transfer/{sessionId}/status'
*/
queryStatus.head = (args: { sessionId: string | number } | [sessionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: queryStatus.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::queryStatus
* @see Http/Controllers/Api/V1/InterbankTransferController.php:95
* @route '/api/v1/interbank/transfer/{sessionId}/status'
*/
const queryStatusForm = (args: { sessionId: string | number } | [sessionId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: queryStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::queryStatus
* @see Http/Controllers/Api/V1/InterbankTransferController.php:95
* @route '/api/v1/interbank/transfer/{sessionId}/status'
*/
queryStatusForm.get = (args: { sessionId: string | number } | [sessionId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: queryStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\V1\InterbankTransferController::queryStatus
* @see Http/Controllers/Api/V1/InterbankTransferController.php:95
* @route '/api/v1/interbank/transfer/{sessionId}/status'
*/
queryStatusForm.head = (args: { sessionId: string | number } | [sessionId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: queryStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

queryStatus.form = queryStatusForm

const InterbankTransferController = { nameEnquiry, sendTransfer, queryStatus }

export default InterbankTransferController