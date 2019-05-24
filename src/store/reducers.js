import { compose, toPairs, forEach } from 'ramda'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import authReducers from '../modules/Auth/reducers/highOrderReducers'
import snackbarReducer, { SNACKBAR_STATE } from '../components/Snackbar/reducer'
import pageLoadingReducer from '../components/PageLoading/reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    form: formReducer,
    routing: routerReducer,
    [SNACKBAR_STATE]: snackbarReducer(),
    pageLoading: pageLoadingReducer(),
    ...authReducers,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export const injectReducers = (store, reducers) => {
  compose(
    forEach(([key, reducer]) => injectReducer(store, { key, reducer })),
    toPairs,
  )(reducers)
}
