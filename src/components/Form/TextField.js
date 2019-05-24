import React from 'react'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

const TextField = ({
  input, meta, disabled, fullWidth, max,
  helperText, label, margin, ...props
}) => {
  const onKeyPress = event => {
    if (max && event.target.value.length === parseInt(max) &&
      event.keyCode !== 8 &&
      event.keyCode !== 9 &&
      event.keyCode !== 17 &&
      event.keyCode !== 86 &&
      event.keyCode !== 65 &&
      event.keyCode !== 67) event.preventDefault()
  }
  const onPaste = e => {
    e.clipboardData.getData('text/plain').slice(0, max)
  }
  return (
    <FormControl
      margin={margin}
      disabled={disabled}
      fullWidth={fullWidth}
      onKeyDown={onKeyPress}
      onPaste={onPaste}
      error={Boolean(meta.error)}>
      <InputLabel>{label}</InputLabel>
      <Input {...input} {...props} />
      <FormHelperText>{meta.error || helperText}</FormHelperText>
    </FormControl>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  margin: PropTypes.string,
  max: PropTypes.number,
  inputProps: PropTypes.object,
}

export default TextField
