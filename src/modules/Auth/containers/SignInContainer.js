import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose, withHandlers, withPropsOnChange } from 'recompose'
import { path } from 'ramda'
import * as STATES from '../../../constants/states'
import { watchAuthToken } from '../helpers'
import SignIn from '../components/SignIn'
import actions from '../actions/signIn'

const mapStateToProps = (state) => ({
  loading: (
    path([STATES.SING_IN, 'loading'], state)
  ),
  token: path([STATES.SING_IN, 'data', 'token'], state),
  error: path([STATES.SING_IN, 'error'], state),
  formValues: path(['form', 'SignInForm', 'values'], state)
})

const enhance = compose(
  connect(mapStateToProps, { ...actions, push }),
  withPropsOnChange(['token'], watchAuthToken),
  withHandlers({
    onSubmit: props => () => props.signInAction(props.formValues),
  })
)

export default enhance(SignIn)
