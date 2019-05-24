import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import AppLayout from '../src/components/Layouts/AppLayout'

Route.propTypes = {
  computedMatch: PropTypes.object,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  sensitive: PropTypes.bool,
  component: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  location: PropTypes.object
}

const RouteAppLayout = ({ component, ...props }) => {
  return (
    <Route {...props} render={props =>
      React.createElement(AppLayout, props, React.createElement(component, props))
    } />
  )
}

RouteAppLayout.propTypes = {
  component: PropTypes.any
}

export default RouteAppLayout
