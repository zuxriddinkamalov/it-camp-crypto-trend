import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import AutoCompleteField from './AutoCompleteField'

const styles = {
  adornment: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const renderInputComponent = (inputProps) => {
  const {
    classes,
    autoFocus,
    value,
    meta,
    label,
    disabled,
    margin,
    fullWidth,
    ref,
    loading,
    ...other
  } = inputProps

  const onClick = () => {
    inputProps.input.onChange(null)
    other.onChange({ target: { value: '' } })
  }

  return (
    <FormControl
      margin={margin}
      disabled={disabled}
      fullWidth={fullWidth}
      error={Boolean(meta.error)}>
      <TextField
        classes={{ input: classes.input }}
        label={label}
        autoFocus={autoFocus}
        value={value}
        inputRef={ref}
        fullWidth={fullWidth}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {loading && <div style={styles.adornment}>
                <CircularProgress size={20} />
              </div>}
              {Boolean(!loading && value) && (
                <IconButton onClick={onClick}>
                  <ClearIcon />
                </IconButton>
              )}
              {Boolean(!loading && !value) && <div style={styles.adornment}>
                <SearchIcon />
              </div>}
            </InputAdornment>
          )
        }}
        {...other}
      />
    </FormControl>
  )
}

const AutoCompleteWithClearField = props => {
  return (
    <AutoCompleteField
      renderInputComponent={renderInputComponent}
      {...props}
    />
  )
}

export default AutoCompleteWithClearField
