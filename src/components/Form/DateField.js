import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'material-ui-pickers'
import withStyles from '@material-ui/core/styles/withStyles'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import * as DATE from '../../constants/dateFormat'
import TextField from '../../components/Form/TextField'

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-end',
  }
})

const enhance = withStyles(styles)

const DateField = ({ classes, format, input, meta, ...props }) => {
  return (
    <div className={classes.root}>
      <DatePicker
        value={input.value || null}
        format={format}
        onChange={input.onChange}
        leftArrowIcon={<KeyboardArrowLeftIcon />}
        rightArrowIcon={<KeyboardArrowRightIcon />}
        animateYearScrolling={true}
        TextFieldComponent={({ InputProps, error, onChange, onFocus, onBlur, ...defaultProps }) => (
          <TextField
            meta={meta}
            input={{ onChange, onFocus, onBlur }}
            {...defaultProps}
          />
        )}
        {...props}
      />
    </div>
  )
}

DateField.defaultProps = {
  format: DATE.DEFAULT_DATE_ISO_FORMAT
}

DateField.propTypes = {
  classes: PropTypes.object.isRequired,
  format: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

export default enhance(DateField)
