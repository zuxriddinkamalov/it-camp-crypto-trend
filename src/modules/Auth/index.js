import { injectReducers } from '../../store/reducers'
import AppLayout from '../../components/Layouts/AppLayout'
import { AsyncComponent } from '../../components/Layouts/RouterLayout'
import * as ROUTES from '../../constants/routes'

const getSignInContainer = store =>
  import(/* webpackChunkName: "auth" */ './reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "auth" */ './containers/SignInContainer'))
    .then(module => module.default)

export default (store) => ([
  {
    layout: AppLayout,
    path: ROUTES.SIGN_IN_URL,
    component: AsyncComponent(() => getSignInContainer(store))
  }
])
