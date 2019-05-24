import React from 'react'
import PropTypes from 'prop-types'
import MUIRadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import withStyles from '@material-ui/core/styles/withStyles'
import { FormControl, FormLabel, Radio } from '@material-ui/core/es/index'

const styles = {
  root: {
    marginTop: '16px'
  },
  label: {
    fontSize: 16,
    marginBottom: 10
  },
  radio: {
    marginLeft: 0,
    '& span': {
      fontSize: 15,
      fontWeight: 500
    },
    '&>span:first-child': {
      height: 35
    }
  }
}

const enhance = withStyles(styles)

const RadioGroup = ({ classes, input, meta, label, items, ...defaultProps }) => (
  <FormControl className={classes.root}>
    <FormLabel className={classes.label} component="legend">{label}</FormLabel>
    <MUIRadioGroup
      value={input.value}
      onChange={input.onChange}
      {...defaultProps}
    >
      {items.map((item, index) => (
        <FormControlLabel key={index} value={item.value}
          className={classes.radio} control={<Radio {...defaultProps} />} label={item.label} />
      ))}
    </MUIRadioGroup>
  </FormControl>
)

RadioGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
}

export default enhance(RadioGroup)
