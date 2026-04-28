import DashboardController from './DashboardController'
import AccountsPageController from './AccountsPageController'
import TransfersPageController from './TransfersPageController'
import LoansPageController from './LoansPageController'
import PaymentsPageController from './PaymentsPageController'
import NotificationsPageController from './NotificationsPageController'
import OnboardingController from './OnboardingController'
import CardsPageController from './CardsPageController'
import StatementsController from './StatementsController'
import InterbankPageController from './InterbankPageController'
import PasskeysPageController from './PasskeysPageController'

const Banking = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    AccountsPageController: Object.assign(AccountsPageController, AccountsPageController),
    TransfersPageController: Object.assign(TransfersPageController, TransfersPageController),
    LoansPageController: Object.assign(LoansPageController, LoansPageController),
    PaymentsPageController: Object.assign(PaymentsPageController, PaymentsPageController),
    NotificationsPageController: Object.assign(NotificationsPageController, NotificationsPageController),
    OnboardingController: Object.assign(OnboardingController, OnboardingController),
    CardsPageController: Object.assign(CardsPageController, CardsPageController),
    StatementsController: Object.assign(StatementsController, StatementsController),
    InterbankPageController: Object.assign(InterbankPageController, InterbankPageController),
    PasskeysPageController: Object.assign(PasskeysPageController, PasskeysPageController),
}

export default Banking