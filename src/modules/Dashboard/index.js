import AppLayout from '../../components/Layouts/AppLayout'
import { AsyncComponent } from '../../components/Layouts/RouterLayout'
import * as ROUTES from '../../constants/routes'
import { injectReducers } from '../../store/reducers'

const getDashboardContainer = store =>
  import(/* webpackChunkName: "news" */ './reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "dashboard" */ './containers/DashboardContainer'))
    .then(module => module.default)

export default (store) => ([
  {
    layout: AppLayout,
    exact: true,
    path: ROUTES.ROOT_PATH,
    component: AsyncComponent(() => getDashboardContainer(store))
  }
])
