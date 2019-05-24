import React from 'react'
import PropTypes from 'prop-types'
import { is } from 'ramda'
import { TimePicker } from 'material-ui-pickers'
import withStyles from '@material-ui/core/styles/withStyles'
import { compose, mapPropsStream } from 'recompose'
import moment from 'moment'
import * as DATE from '../../constants/dateFormat'
import TextField from '../../components/Form/TextField'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
  }
})

const enhance = compose(
  withStyles(styles),
  mapPropsStream(props$ => {
    props$
      .subscribe(props => {
        const { input } = props
        if (is(String, input.value)) {
          input.onChange(moment(input.value, 'HH:mm:ss'))
        }
      })
    return props$.combineLatest(props => props)
  }),
)

const TimeField = ({ classes, format, input, meta, ...props }) => {
  return (
    <div className={classes.root}>
      <TimePicker
        value={input.value || null}
        format={format}
        onChange={input.onChange}
        TextFieldComponent={({ InputProps, error, onChange, onFocus, onBlur, ...defaultProps }) => (
          <TextField
            meta={meta}
            input={{ onChange, onFocus, onBlur }}
            inputProps={InputProps}
            {...defaultProps}
          />
        )}
        {...props}
      />
    </div>
  )
}

TimeField.defaultProps = {
  format: DATE.DEFAULT_TIME_ISO_FORMAT
}

TimeField.propTypes = {
  classes: PropTypes.object.isRequired,
  format: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

export default enhance(TimeField)
