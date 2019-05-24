import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, setDisplayName } from 'recompose'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from './TextField'

const styles = {
  root: {
    position: 'relative'
  },
  input: {
    '& input': {
      height: '1.1875em',
    }
  }
}

const enhance = compose(
  withStyles(styles),
  withState('visibility', 'setVisibility', false),
  setDisplayName('PasswordViewField')
)

const PasswordViewField = ({ classes, visibility, setVisibility, ...props }) => {
  return (
    <div className={classes.root}>
      <TextField
        {...props}
        className={classes.input}
        type={visibility ? 'text' : 'password'}
      />
      <IconButton
        onMouseDown={() => setVisibility(true)}
        onMouseUp={() => setVisibility(false)}
        onMouseLeave={() => setVisibility(false)}

        onKeyPress={(event) => (event.key === 'Enter' || event.key === ' ') && setVisibility(true)}
        onKeyUp={() => setVisibility(false)}

        onTouchStart={() => setVisibility(true)}
        onTouchEnd={() => setVisibility(false)}
        style={{ position: 'absolute', top: '25px', right: '-10px' }}>
        {visibility ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </div>
  )
}

PasswordViewField.propTypes = {
  classes: PropTypes.object.isRequired,
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired
}

export default enhance(PasswordViewField)
