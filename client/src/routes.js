import DashboardContainer from './containers/dashboard'
import LoginContainer from './containers/login'
import CreateUserContainer from './containers/createuser'
import Home from './components/home'

const routes = [
  {
    path: '/login',
    isProtected: false,
    component: LoginContainer
  },
  {
    path: '/dashboard',
    isProtected: true,
    component: DashboardContainer
  },
  {
    path: '/create',
    isProtected: true,
    component: CreateUserContainer
  },
  {
    path: '/',
    isProtected: false,
    component: Home
  }
]

export default routes
