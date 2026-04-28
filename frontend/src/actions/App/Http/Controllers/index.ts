import Api from './Api'
import LandingPageController from './LandingPageController'
import Auth from './Auth'
import Banking from './Banking'
import Admin from './Admin'
import Settings from './Settings'

const Controllers = {
    Api: Object.assign(Api, Api),
    LandingPageController: Object.assign(LandingPageController, LandingPageController),
    Auth: Object.assign(Auth, Auth),
    Banking: Object.assign(Banking, Banking),
    Admin: Object.assign(Admin, Admin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers