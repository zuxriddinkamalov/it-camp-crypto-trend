import withStyles from '@material-ui/core/styles/withStyles'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from '../../../components/Form/TextField'
import PasswordViewField from '../../../components/Form/PasswordViewField'
import Checkbox from '../../../components/Form/Checkbox'
import Button from '../../../components/Button'
import validate from '../../../helpers/validate'
import t from '../../../helpers/translate'
import T from '../../../components/T'

export const FORM = 'SignInForm'

const styles = theme => ({
  error: {
    textAlign: 'center',
    color: theme.error.color,
  },

  remember: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: '0px',
  },

  submit: {
    marginTop: '40px',
    marginBottom: '10px',
    minHeight: '44px !important',
    '& span': {
      color: '#fff'
    }
  },
})

const enhance = compose(
  reduxForm({ form: FORM }),
  withStyles(styles)
)

export const SignIn = ({ classes, error, handleSubmit, ...props }) => (
  <form onSubmit={handleSubmit(() => props.onSubmit().catch(validate))}>
    {error && <div className={classes.error}>{error}</div>}

    <Field
      name="username"
      component={TextField}
      label={t('Username')}
      placeholder={t('Enter Username')}
      fullWidth={true}
      margin="normal"
    /><br />

    <Field
      name="password"
      type="password"
      component={PasswordViewField}
      label={t('Password')}
      placeholder={t('Enter Password')}
      fullWidth={true}
      margin="normal"
    /><br />

    <div className={classes.remember}>
      <Field
        name="rememberMe"
        component={Checkbox}
        color="primary"
        label={t('Remember me')}
      />
    </div>

    <Button
      type="submit"
      color="primary"
      variant="contained"
      className={classes.submit}>
      <T>Sign In</T>
    </Button>
  </form>
)

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default enhance(SignIn)
