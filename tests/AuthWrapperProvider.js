import React from 'react'
import PropTypes from 'prop-types'
import { createBrowserHistory as createHistory } from 'history'
import createStore from '../src/store/createStore'
import { setTokenAction } from '../src/modules/Auth/actions/token'
import { API_ME_URL } from '../src/modules/Auth/actions/me'
import WrapperProvider from './WrapperProvider'

const AuthWrapperProvider = ({ mock, ...props }) => {
  const history = props.history || createHistory()
  const store = props.store || createStore(history)
  store.dispatch(setTokenAction('test_token'))
  mock.onGet(API_ME_URL).reply(200, { username: 'Admin' })

  return (
    <WrapperProvider store={store} history={history}>
      {props.children}
    </WrapperProvider>
  )
}

AuthWrapperProvider.propTypes = {
  mock: PropTypes.object.isRequired,
  store: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.node.isRequired
}

export default AuthWrapperProvider
