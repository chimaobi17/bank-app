import AuthController from './AuthController'
import ProfileController from './ProfileController'
import AccountController from './AccountController'
import TransferController from './TransferController'
import LoanController from './LoanController'
import PaymentController from './PaymentController'
import NotificationController from './NotificationController'
import WebAuthnController from './WebAuthnController'
import IdentityVerificationController from './IdentityVerificationController'
import InterbankTransferController from './InterbankTransferController'
import AdminController from './AdminController'

const V1 = {
    AuthController: Object.assign(AuthController, AuthController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    AccountController: Object.assign(AccountController, AccountController),
    TransferController: Object.assign(TransferController, TransferController),
    LoanController: Object.assign(LoanController, LoanController),
    PaymentController: Object.assign(PaymentController, PaymentController),
    NotificationController: Object.assign(NotificationController, NotificationController),
    WebAuthnController: Object.assign(WebAuthnController, WebAuthnController),
    IdentityVerificationController: Object.assign(IdentityVerificationController, IdentityVerificationController),
    InterbankTransferController: Object.assign(InterbankTransferController, InterbankTransferController),
    AdminController: Object.assign(AdminController, AdminController),
}

export default V1