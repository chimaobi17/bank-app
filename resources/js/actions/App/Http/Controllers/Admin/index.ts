import AdminDashboardController from './AdminDashboardController'
import AdminUsersController from './AdminUsersController'
import AdminAccountsController from './AdminAccountsController'
import AdminLoansController from './AdminLoansController'
import AdminAuditController from './AdminAuditController'

const Admin = {
    AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
    AdminUsersController: Object.assign(AdminUsersController, AdminUsersController),
    AdminAccountsController: Object.assign(AdminAccountsController, AdminAccountsController),
    AdminLoansController: Object.assign(AdminLoansController, AdminLoansController),
    AdminAuditController: Object.assign(AdminAuditController, AdminAuditController),
}

export default Admin