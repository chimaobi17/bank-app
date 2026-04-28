import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
* @see \App\Http\Controllers\Banking\CardsPageController::virtual
* @see Http/Controllers/Banking/CardsPageController.php:49
* @route '/banking/cards/virtual'
*/
export const virtual = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: virtual.url(options),
    method: 'post',
})

virtual.definition = {
    methods: ["post"],
    url: '/banking/cards/virtual',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::virtual
* @see Http/Controllers/Banking/CardsPageController.php:49
* @route '/banking/cards/virtual'
*/
virtual.url = (options?: RouteQueryOptions) => {
    return virtual.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::virtual
* @see Http/Controllers/Banking/CardsPageController.php:49
* @route '/banking/cards/virtual'
*/
virtual.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: virtual.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::virtual
* @see Http/Controllers/Banking/CardsPageController.php:49
* @route '/banking/cards/virtual'
*/
const virtualForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: virtual.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::virtual
* @see Http/Controllers/Banking/CardsPageController.php:49
* @route '/banking/cards/virtual'
*/
virtualForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: virtual.url(options),
    method: 'post',
})

virtual.form = virtualForm

/**
* @see \App\Http\Controllers\Banking\CardsPageController::pin
* @see Http/Controllers/Banking/CardsPageController.php:61
* @route '/banking/cards/{card}/pin'
*/
export const pin = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pin.url(args, options),
    method: 'post',
})

pin.definition = {
    methods: ["post"],
    url: '/banking/cards/{card}/pin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::pin
* @see Http/Controllers/Banking/CardsPageController.php:61
* @route '/banking/cards/{card}/pin'
*/
pin.url = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions) => {
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

    return pin.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::pin
* @see Http/Controllers/Banking/CardsPageController.php:61
* @route '/banking/cards/{card}/pin'
*/
pin.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pin.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::pin
* @see Http/Controllers/Banking/CardsPageController.php:61
* @route '/banking/cards/{card}/pin'
*/
const pinForm = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pin.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::pin
* @see Http/Controllers/Banking/CardsPageController.php:61
* @route '/banking/cards/{card}/pin'
*/
pinForm.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pin.url(args, options),
    method: 'post',
})

pin.form = pinForm

/**
* @see \App\Http\Controllers\Banking\CardsPageController::limits
* @see Http/Controllers/Banking/CardsPageController.php:74
* @route '/banking/cards/{card}/limits'
*/
export const limits = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: limits.url(args, options),
    method: 'post',
})

limits.definition = {
    methods: ["post"],
    url: '/banking/cards/{card}/limits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::limits
* @see Http/Controllers/Banking/CardsPageController.php:74
* @route '/banking/cards/{card}/limits'
*/
limits.url = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions) => {
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

    return limits.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::limits
* @see Http/Controllers/Banking/CardsPageController.php:74
* @route '/banking/cards/{card}/limits'
*/
limits.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: limits.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::limits
* @see Http/Controllers/Banking/CardsPageController.php:74
* @route '/banking/cards/{card}/limits'
*/
const limitsForm = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: limits.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::limits
* @see Http/Controllers/Banking/CardsPageController.php:74
* @route '/banking/cards/{card}/limits'
*/
limitsForm.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: limits.url(args, options),
    method: 'post',
})

limits.form = limitsForm

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
* @see \App\Http\Controllers\Banking\CardsPageController::replace
* @see Http/Controllers/Banking/CardsPageController.php:112
* @route '/banking/cards/{card}/replace'
*/
export const replace = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: replace.url(args, options),
    method: 'post',
})

replace.definition = {
    methods: ["post"],
    url: '/banking/cards/{card}/replace',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::replace
* @see Http/Controllers/Banking/CardsPageController.php:112
* @route '/banking/cards/{card}/replace'
*/
replace.url = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions) => {
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

    return replace.definition.url
            .replace('{card}', parsedArgs.card.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::replace
* @see Http/Controllers/Banking/CardsPageController.php:112
* @route '/banking/cards/{card}/replace'
*/
replace.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: replace.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::replace
* @see Http/Controllers/Banking/CardsPageController.php:112
* @route '/banking/cards/{card}/replace'
*/
const replaceForm = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: replace.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::replace
* @see Http/Controllers/Banking/CardsPageController.php:112
* @route '/banking/cards/{card}/replace'
*/
replaceForm.post = (args: { card: number | { card_id: number } } | [card: number | { card_id: number } ] | number | { card_id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: replace.url(args, options),
    method: 'post',
})

replace.form = replaceForm

const cards = {
    show: Object.assign(show, show),
    virtual: Object.assign(virtual, virtual),
    pin: Object.assign(pin, pin),
    limits: Object.assign(limits, limits),
    freeze: Object.assign(freeze, freeze),
    unfreeze: Object.assign(unfreeze, unfreeze),
    replace: Object.assign(replace, replace),
}

export default cards