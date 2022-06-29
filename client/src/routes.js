import DashboardContainer from './containers/dashboard'
import LoginContainer from './containers/login'
import CreateUserContainer from './containers/createuser'
import UpdateUserContainer from './containers/updateuser'
import NotFound from './components/404'
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
    path: '/edit',
    isProtected: true,
    component: UpdateUserContainer
  },
  {
    path: '/',
    isProtected: false,
    component: Home
  },
  {
    path: '*',
    isProtected: false,
    component: NotFound
  }
]

export default routes
