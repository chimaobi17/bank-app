import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import accountsDb024e from './accounts'
import transfersB7d45c from './transfers'
import loans1385a5 from './loans'
import payments4e2b3d from './payments'
import notifications1ce82a from './notifications'
import onboardingC947a0 from './onboarding'
import cards9f8a72 from './cards'
import statementsF5cd7f from './statements'
import interbankEa5654 from './interbank'
import passkeys9fabbc from './passkeys'
/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/banking/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\DashboardController::__invoke
* @see Http/Controllers/Banking/DashboardController.php:25
* @route '/banking/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::accounts
* @see Http/Controllers/Banking/AccountsPageController.php:20
* @route '/banking/accounts'
*/
export const accounts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accounts.url(options),
    method: 'get',
})

accounts.definition = {
    methods: ["get","head"],
    url: '/banking/accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::accounts
* @see Http/Controllers/Banking/AccountsPageController.php:20
* @route '/banking/accounts'
*/
accounts.url = (options?: RouteQueryOptions) => {
    return accounts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::accounts
* @see Http/Controllers/Banking/AccountsPageController.php:20
* @route '/banking/accounts'
*/
accounts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accounts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::accounts
* @see Http/Controllers/Banking/AccountsPageController.php:20
* @route '/banking/accounts'
*/
accounts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: accounts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::accounts
* @see Http/Controllers/Banking/AccountsPageController.php:20
* @route '/banking/accounts'
*/
const accountsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: accounts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::accounts
* @see Http/Controllers/Banking/AccountsPageController.php:20
* @route '/banking/accounts'
*/
accountsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: accounts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\AccountsPageController::accounts
* @see Http/Controllers/Banking/AccountsPageController.php:20
* @route '/banking/accounts'
*/
accountsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: accounts.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

accounts.form = accountsForm

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::transfers
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
export const transfers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transfers.url(options),
    method: 'get',
})

transfers.definition = {
    methods: ["get","head"],
    url: '/banking/transfers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::transfers
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
transfers.url = (options?: RouteQueryOptions) => {
    return transfers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::transfers
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
transfers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transfers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::transfers
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
transfers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transfers.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::transfers
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
const transfersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transfers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::transfers
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
transfersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transfers.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\TransfersPageController::transfers
* @see Http/Controllers/Banking/TransfersPageController.php:23
* @route '/banking/transfers'
*/
transfersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: transfers.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

transfers.form = transfersForm

/**
* @see \App\Http\Controllers\Banking\LoansPageController::loans
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
export const loans = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loans.url(options),
    method: 'get',
})

loans.definition = {
    methods: ["get","head"],
    url: '/banking/loans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\LoansPageController::loans
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
loans.url = (options?: RouteQueryOptions) => {
    return loans.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\LoansPageController::loans
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
loans.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: loans.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::loans
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
loans.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: loans.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::loans
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
const loansForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: loans.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::loans
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
loansForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: loans.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\LoansPageController::loans
* @see Http/Controllers/Banking/LoansPageController.php:21
* @route '/banking/loans'
*/
loansForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: loans.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

loans.form = loansForm

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payments
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
export const payments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payments.url(options),
    method: 'get',
})

payments.definition = {
    methods: ["get","head"],
    url: '/banking/payments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payments
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
payments.url = (options?: RouteQueryOptions) => {
    return payments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payments
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
payments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payments.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payments
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
payments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: payments.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payments
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
const paymentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: payments.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payments
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
paymentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: payments.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PaymentsPageController::payments
* @see Http/Controllers/Banking/PaymentsPageController.php:23
* @route '/banking/payments'
*/
paymentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: payments.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

payments.form = paymentsForm

/**
* @see \App\Http\Controllers\Banking\NotificationsPageController::notifications
* @see Http/Controllers/Banking/NotificationsPageController.php:19
* @route '/banking/notifications'
*/
export const notifications = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})

notifications.definition = {
    methods: ["get","head"],
    url: '/banking/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\NotificationsPageController::notifications
* @see Http/Controllers/Banking/NotificationsPageController.php:19
* @route '/banking/notifications'
*/
notifications.url = (options?: RouteQueryOptions) => {
    return notifications.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\NotificationsPageController::notifications
* @see Http/Controllers/Banking/NotificationsPageController.php:19
* @route '/banking/notifications'
*/
notifications.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\NotificationsPageController::notifications
* @see Http/Controllers/Banking/NotificationsPageController.php:19
* @route '/banking/notifications'
*/
notifications.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: notifications.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\NotificationsPageController::notifications
* @see Http/Controllers/Banking/NotificationsPageController.php:19
* @route '/banking/notifications'
*/
const notificationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notifications.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\NotificationsPageController::notifications
* @see Http/Controllers/Banking/NotificationsPageController.php:19
* @route '/banking/notifications'
*/
notificationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notifications.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\NotificationsPageController::notifications
* @see Http/Controllers/Banking/NotificationsPageController.php:19
* @route '/banking/notifications'
*/
notificationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: notifications.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

notifications.form = notificationsForm

/**
* @see \App\Http\Controllers\Banking\OnboardingController::onboarding
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
export const onboarding = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: onboarding.url(options),
    method: 'get',
})

onboarding.definition = {
    methods: ["get","head"],
    url: '/banking/onboarding',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\OnboardingController::onboarding
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
onboarding.url = (options?: RouteQueryOptions) => {
    return onboarding.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\OnboardingController::onboarding
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
onboarding.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: onboarding.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::onboarding
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
onboarding.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: onboarding.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::onboarding
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
const onboardingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: onboarding.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::onboarding
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
onboardingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: onboarding.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\OnboardingController::onboarding
* @see Http/Controllers/Banking/OnboardingController.php:21
* @route '/banking/onboarding'
*/
onboardingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: onboarding.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

onboarding.form = onboardingForm

/**
* @see \App\Http\Controllers\Banking\CardsPageController::cards
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
export const cards = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cards.url(options),
    method: 'get',
})

cards.definition = {
    methods: ["get","head"],
    url: '/banking/cards',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\CardsPageController::cards
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
cards.url = (options?: RouteQueryOptions) => {
    return cards.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\CardsPageController::cards
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
cards.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cards.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::cards
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
cards.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cards.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::cards
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
const cardsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cards.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::cards
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
cardsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cards.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\CardsPageController::cards
* @see Http/Controllers/Banking/CardsPageController.php:22
* @route '/banking/cards'
*/
cardsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: cards.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

cards.form = cardsForm

/**
* @see \App\Http\Controllers\Banking\StatementsController::statements
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
export const statements = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statements.url(args, options),
    method: 'get',
})

statements.definition = {
    methods: ["get","head"],
    url: '/banking/statements/{account}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\StatementsController::statements
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
statements.url = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { account: args }
    }

    if (Array.isArray(args)) {
        args = {
            account: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        account: args.account,
    }

    return statements.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\StatementsController::statements
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
statements.get = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statements.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::statements
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
statements.head = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statements.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::statements
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
const statementsForm = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statements.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::statements
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
statementsForm.get = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statements.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\StatementsController::statements
* @see Http/Controllers/Banking/StatementsController.php:26
* @route '/banking/statements/{account}'
*/
statementsForm.head = (args: { account: string | number } | [account: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: statements.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

statements.form = statementsForm

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::interbank
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
export const interbank = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: interbank.url(options),
    method: 'get',
})

interbank.definition = {
    methods: ["get","head"],
    url: '/banking/interbank',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::interbank
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
interbank.url = (options?: RouteQueryOptions) => {
    return interbank.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::interbank
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
interbank.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: interbank.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::interbank
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
interbank.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: interbank.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::interbank
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
const interbankForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: interbank.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::interbank
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
interbankForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: interbank.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\InterbankPageController::interbank
* @see Http/Controllers/Banking/InterbankPageController.php:30
* @route '/banking/interbank'
*/
interbankForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: interbank.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

interbank.form = interbankForm

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::passkeys
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
export const passkeys = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: passkeys.url(options),
    method: 'get',
})

passkeys.definition = {
    methods: ["get","head"],
    url: '/banking/security/passkeys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::passkeys
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
passkeys.url = (options?: RouteQueryOptions) => {
    return passkeys.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::passkeys
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
passkeys.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: passkeys.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::passkeys
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
passkeys.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: passkeys.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::passkeys
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
const passkeysForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: passkeys.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::passkeys
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
passkeysForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: passkeys.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Banking\PasskeysPageController::passkeys
* @see Http/Controllers/Banking/PasskeysPageController.php:23
* @route '/banking/security/passkeys'
*/
passkeysForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: passkeys.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

passkeys.form = passkeysForm

const banking = {
    dashboard: Object.assign(dashboard, dashboard),
    accounts: Object.assign(accounts, accountsDb024e),
    transfers: Object.assign(transfers, transfersB7d45c),
    loans: Object.assign(loans, loans1385a5),
    payments: Object.assign(payments, payments4e2b3d),
    notifications: Object.assign(notifications, notifications1ce82a),
    onboarding: Object.assign(onboarding, onboardingC947a0),
    cards: Object.assign(cards, cards9f8a72),
    statements: Object.assign(statements, statementsF5cd7f),
    interbank: Object.assign(interbank, interbankEa5654),
    passkeys: Object.assign(passkeys, passkeys9fabbc),
}

export default banking