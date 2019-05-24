import React from 'react'
import { create } from 'jss'
import { Provider } from 'react-redux'
import ConnectedRouter from 'react-router-redux/ConnectedRouter'
import PropTypes from 'prop-types'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import JssProvider from 'react-jss/lib/JssProvider'

import { createGenerateClassName, jssPreset } from '@material-ui/styles'
import { muiTheme } from '../styles/themes'

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())

class App extends React.Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={this.props.store}>
          <MuiThemeProvider theme={muiTheme}>
            <ConnectedRouter history={this.props.history}>
              {this.props.renderRoute(this.props.store)}
            </ConnectedRouter>
          </MuiThemeProvider>
        </Provider>
      </JssProvider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  renderRoute: PropTypes.func.isRequired,
}

export default App
