import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, mapPropsStream } from 'recompose'
import { push } from 'react-router-redux'
import { path } from 'ramda'
import * as ROUTES from '../../../constants/routes'
import * as STATES from '../../../constants/states'
import { getToken, clearToken } from '../../../helpers/token'
import { setTokenAction, clearTokenAction } from '../actions/token'
import { signOutAction } from '../actions/signOut'

const mapStateToProps = (state) => ({
  token: path([STATES.SING_IN, 'data', 'token'], state),
})

const mapDispatchToProps = dispatch => {
  return {
    setTokenAction: bindActionCreators(setTokenAction, dispatch),
    clearTokenAction: bindActionCreators(clearTokenAction, dispatch),
    push: bindActionCreators(push, dispatch),
    logout: () => {
      dispatch(signOutAction())
        .then(() => {
          clearToken()
          dispatch(clearTokenAction())
        })
        .catch(() => {
          clearToken()
          dispatch(clearTokenAction())
        })
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(props => {
        const token = getToken()
        token && props.setTokenAction(token)
      })

    return props$
  })
)
