import { Switch } from 'react-router'
import React from 'react'
import RouteWithLayout from '../components/Layouts/RouterLayout'
import Dashboard from './Dashboard'
import Auth from './Auth'

export default (store) => {
  const routes = [
    ...Auth(store),
    ...Dashboard(store)
  ]

  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithLayout key={i} {...route} />
      ))}
    </Switch>
  )
}
