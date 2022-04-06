import DashboardContainer from './containers/dashboard'
import LoginContainer from './containers/login'
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
    path: '/',
    isProtected: false,
    component: Home
  }
]

export default routes
