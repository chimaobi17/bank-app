import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Banking\CardsPageController::index
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/banking/cards',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::index
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::index
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::index
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::index
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::index
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::index
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
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
* @see \App\Http\Controllers\Banking\CardsPageController::show
* @see Http/Controllers/Banking/CardsPageController.php:40
* @route '/banking/cards/{card}'
*/
export const show = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/banking/cards/{card}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::show
* @see Http/Controllers/Banking/CardsPageController.php:40
* @route '/banking/cards/{card}'
*/
show.url = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { card: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'card_id' in args) {
        args = { card: args.card_id }
    }

    if (Array.isArray(args)) {
        args = {
            card: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        card: typeof args.card === 'object'
        ? args.card.card_id
        : args.card,
    }

    return show.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::show
* @see Http/Controllers/Banking/CardsPageController.php:40
* @route '/banking/cards/{card}'
*/
show.get = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::show
* @see Http/Controllers/Banking/CardsPageController.php:40
* @route '/banking/cards/{card}'
*/
show.head = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::show
* @see Http/Controllers/Banking/CardsPageController.php:40
* @route '/banking/cards/{card}'
*/
const showForm = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::show
* @see Http/Controllers/Banking/CardsPageController.php:40
* @route '/banking/cards/{card}'
*/
showForm.get = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::show
* @see Http/Controllers/Banking/CardsPageController.php:40
* @route '/banking/cards/{card}'
*/
showForm.head = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Banking\CardsPageController::issueVirtual
* @see Http/Controllers/Banking/CardsPageController.php:49
* @route '/banking/cards/virtual'
*/
export const issueVirtual = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: issueVirtual.url(options),
    method: 'post',
})

issueVirtual.definition = {
    methods: ["post"],
    url: '/banking/cards/virtual',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::issueVirtual
* @see Http/Controllers/Banking/CardsPageController.php:49
* @route '/banking/cards/virtual'
*/
issueVirtual.url = (options?: RouteQueryOptions) => {
    return issueVirtual.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::issueVirtual
* @see Http/Controllers/Banking/CardsPageController.php:49
* @route '/banking/cards/virtual'
*/
issueVirtual.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: issueVirtual.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::issueVirtual
* @see Http/Controllers/Banking/CardsPageController.php:49
* @route '/banking/cards/virtual'
*/
const issueVirtualForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: issueVirtual.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::issueVirtual
* @see Http/Controllers/Banking/CardsPageController.php:49
* @route '/banking/cards/virtual'
*/
issueVirtualForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: issueVirtual.url(options),
    method: 'post',
})

issueVirtual.form = issueVirtualForm

/**
* @see \App\Http\Controllers\Banking\CardsPageController::setPin
* @see Http/Controllers/Banking/CardsPageController.php:61
* @route '/banking/cards/{card}/pin'
*/
export const setPin = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setPin.url(args, options),
    method: 'post',
})

setPin.definition = {
    methods: ["post"],
    url: '/banking/cards/{card}/pin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::setPin
* @see Http/Controllers/Banking/CardsPageController.php:61
* @route '/banking/cards/{card}/pin'
*/
setPin.url = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { card: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'card_id' in args) {
        args = { card: args.card_id }
    }

    if (Array.isArray(args)) {
        args = {
            card: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        card: typeof args.card === 'object'
        ? args.card.card_id
        : args.card,
    }

    return setPin.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::setPin
* @see Http/Controllers/Banking/CardsPageController.php:61
* @route '/banking/cards/{card}/pin'
*/
setPin.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setPin.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::setPin
* @see Http/Controllers/Banking/CardsPageController.php:61
* @route '/banking/cards/{card}/pin'
*/
const setPinForm = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setPin.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::setPin
* @see Http/Controllers/Banking/CardsPageController.php:61
* @route '/banking/cards/{card}/pin'
*/
setPinForm.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setPin.url(args, options),
    method: 'post',
})

setPin.form = setPinForm

/**
* @see \App\Http\Controllers\Banking\CardsPageController::setLimits
* @see Http/Controllers/Banking/CardsPageController.php:74
* @route '/banking/cards/{card}/limits'
*/
export const setLimits = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setLimits.url(args, options),
    method: 'post',
})

setLimits.definition = {
    methods: ["post"],
    url: '/banking/cards/{card}/limits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::setLimits
* @see Http/Controllers/Banking/CardsPageController.php:74
* @route '/banking/cards/{card}/limits'
*/
setLimits.url = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { card: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'card_id' in args) {
        args = { card: args.card_id }
    }

    if (Array.isArray(args)) {
        args = {
            card: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        card: typeof args.card === 'object'
        ? args.card.card_id
        : args.card,
    }

    return setLimits.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::setLimits
* @see Http/Controllers/Banking/CardsPageController.php:74
* @route '/banking/cards/{card}/limits'
*/
setLimits.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setLimits.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::setLimits
* @see Http/Controllers/Banking/CardsPageController.php:74
* @route '/banking/cards/{card}/limits'
*/
const setLimitsForm = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setLimits.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::setLimits
* @see Http/Controllers/Banking/CardsPageController.php:74
* @route '/banking/cards/{card}/limits'
*/
setLimitsForm.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setLimits.url(args, options),
    method: 'post',
})

setLimits.form = setLimitsForm

/**
* @see \App\Http\Controllers\Banking\CardsPageController::freeze
* @see Http/Controllers/Banking/CardsPageController.php:96
* @route '/banking/cards/{card}/freeze'
*/
export const freeze = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: freeze.url(args, options),
    method: 'post',
})

freeze.definition = {
    methods: ["post"],
    url: '/banking/cards/{card}/freeze',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::freeze
* @see Http/Controllers/Banking/CardsPageController.php:96
* @route '/banking/cards/{card}/freeze'
*/
freeze.url = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { card: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'card_id' in args) {
        args = { card: args.card_id }
    }

    if (Array.isArray(args)) {
        args = {
            card: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        card: typeof args.card === 'object'
        ? args.card.card_id
        : args.card,
    }

    return freeze.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::freeze
* @see Http/Controllers/Banking/CardsPageController.php:96
* @route '/banking/cards/{card}/freeze'
*/
freeze.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: freeze.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::freeze
* @see Http/Controllers/Banking/CardsPageController.php:96
* @route '/banking/cards/{card}/freeze'
*/
const freezeForm = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: freeze.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::freeze
* @see Http/Controllers/Banking/CardsPageController.php:96
* @route '/banking/cards/{card}/freeze'
*/
freezeForm.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: freeze.url(args, options),
    method: 'post',
})

freeze.form = freezeForm

/**
* @see \App\Http\Controllers\Banking\CardsPageController::unfreeze
* @see Http/Controllers/Banking/CardsPageController.php:104
* @route '/banking/cards/{card}/unfreeze'
*/
export const unfreeze = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unfreeze.url(args, options),
    method: 'post',
})

unfreeze.definition = {
    methods: ["post"],
    url: '/banking/cards/{card}/unfreeze',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::unfreeze
* @see Http/Controllers/Banking/CardsPageController.php:104
* @route '/banking/cards/{card}/unfreeze'
*/
unfreeze.url = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { card: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'card_id' in args) {
        args = { card: args.card_id }
    }

    if (Array.isArray(args)) {
        args = {
            card: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        card: typeof args.card === 'object'
        ? args.card.card_id
        : args.card,
    }

    return unfreeze.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::unfreeze
* @see Http/Controllers/Banking/CardsPageController.php:104
* @route '/banking/cards/{card}/unfreeze'
*/
unfreeze.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unfreeze.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::unfreeze
* @see Http/Controllers/Banking/CardsPageController.php:104
* @route '/banking/cards/{card}/unfreeze'
*/
const unfreezeForm = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: unfreeze.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::unfreeze
* @see Http/Controllers/Banking/CardsPageController.php:104
* @route '/banking/cards/{card}/unfreeze'
*/
unfreezeForm.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: unfreeze.url(args, options),
    method: 'post',
})

unfreeze.form = unfreezeForm

/**
* @see \App\Http\Controllers\Banking\CardsPageController::requestReplacement
* @see Http/Controllers/Banking/CardsPageController.php:112
* @route '/banking/cards/{card}/replace'
*/
export const requestReplacement = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestReplacement.url(args, options),
    method: 'post',
})

requestReplacement.definition = {
    methods: ["post"],
    url: '/banking/cards/{card}/replace',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::requestReplacement
* @see Http/Controllers/Banking/CardsPageController.php:112
* @route '/banking/cards/{card}/replace'
*/
requestReplacement.url = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { card: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'card_id' in args) {
        args = { card: args.card_id }
    }

    if (Array.isArray(args)) {
        args = {
            card: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        card: typeof args.card === 'object'
        ? args.card.card_id
        : args.card,
    }

    return requestReplacement.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::requestReplacement
* @see Http/Controllers/Banking/CardsPageController.php:112
* @route '/banking/cards/{card}/replace'
*/
requestReplacement.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestReplacement.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::requestReplacement
* @see Http/Controllers/Banking/CardsPageController.php:112
* @route '/banking/cards/{card}/replace'
*/
const requestReplacementForm = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: requestReplacement.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::requestReplacement
* @see Http/Controllers/Banking/CardsPageController.php:112
* @route '/banking/cards/{card}/replace'
*/
requestReplacementForm.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: requestReplacement.url(args, options),
    method: 'post',
})

requestReplacement.form = requestReplacementForm

const CardsPageController = { index, show, issueVirtual, setPin, setLimits, freeze, unfreeze, requestReplacement }

export default CardsPageController