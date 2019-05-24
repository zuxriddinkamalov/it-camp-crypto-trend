import { union, prop, map } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'
import Downshift from 'downshift'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'

function renderInput (inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      autoComplete="off"
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  )
}

function renderSuggestion ({ suggestion, classes, index, itemProps, highlightedIndex, selectedItem, input }) {
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1
  const onClick = (event) => {
    input.onChange(input.value ? union(input.value, [suggestion.id]) : [suggestion.id])
    itemProps.onClick(event)
  }

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      component="div"
      className={isSelected ? classes.isSelected : ''}
      onClick={onClick}
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.name}
    </MenuItem>
  )
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  input: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
}

class DownshiftMultiple extends React.Component {
  state = {
    inputValue: '',
    selectedItem: [],
    suggestions: [],
    isMenuOpen: false,
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      })
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value })
    this.props
      .getSuggestionByKeyword(event.target.value)
      .then(suggestions => {
        this.setState({ suggestions, isMenuOpen: true })
      })
  }

  handleChange = item => {
    let { selectedItem } = this.state

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item]
    }

    this.setState({
      inputValue: '',
      selectedItem,
    })
  }

  handleInputBlur = () => {
    this.setState({ isMenuOpen: false })
  }

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem]
      selectedItem.splice(selectedItem.indexOf(item), 1)
      return { selectedItem }
    })
  }

  render () {
    const { classes, margin, fullWidth, label } = this.props
    const { inputValue, selectedItem, isMenuOpen } = this.state
    const suggestions = prop('suggestions', this.state) || []
    return (
      <Downshift
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
            {renderInput({
              autoComplete: 'off',
              fullWidth: fullWidth,
              margin: margin,
              label: label,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onFocus: this.handleInputChange,
                onBlur: this.handleInputBlur,
                onKeyDown: this.handleKeyDown
              }),
            })}
            {isOpen || isMenuOpen ? (
              <Paper className={classes.paper} square={true}>
                {map((suggestion, index) =>
                  renderSuggestion({
                    classes,
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.name }),
                    highlightedIndex,
                    input: this.props.input,
                    selectedItem: selectedItem2,
                  }), suggestions)}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}

DownshiftMultiple.propTypes = {
  getSuggestionByKeyword: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  margin: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  input: PropTypes.object.isRequired,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    background: theme.table.backgroundColor,
    maxHeight: 200,
    overflowY: 'scroll',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    background: theme.table.hoverBackgroundColor,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  isSelected: {
    background: theme.table.hoverBackgroundColor,
    position: 'relative',
    '&:after': {
      position: 'absolute',
      right: '0',
      top: 0,
      bottom: 0,
      margin: 'auto',
      content: '\\2713',
      color: '#fff'
    }
  }
})

function MultiAutoCompleteField (props) {
  const { classes, input, getById, getSuggestionByKeyword } = props
  return (
    <div className={classes.root}>
      <DownshiftMultiple
        classes={classes}
        getById={getById}
        input={input}
        getSuggestionByKeyword={getSuggestionByKeyword}
        {...props}
      />
    </div>
  )
}

MultiAutoCompleteField.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  getById: PropTypes.func.isRequired,
  getSuggestionByKeyword: PropTypes.func.isRequired,
}

export default withStyles(styles)(MultiAutoCompleteField)
