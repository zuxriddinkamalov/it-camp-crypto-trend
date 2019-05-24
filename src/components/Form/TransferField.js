import React from 'react'
import PropTypes from 'prop-types'
import {
  pure,
  withState,
  mapPropsStream,
} from 'recompose'
import Checkbox from '@material-ui/core/Checkbox'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import SearchCircle from '@material-ui/icons/Search'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { compose, map, path, prop, equals, filter, propEq, not, isEmpty, findIndex, is, find } from 'ramda'
import withStyles from '@material-ui/core/styles/withStyles'
import FormHelperText from '@material-ui/core/FormHelperText'
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress'
import FormControl from '@material-ui/core/es/FormControl/FormControl'
import t from '../../helpers/translate'

const styles = theme => ({
  root: {
    position: 'relative'
  },
  search: {
    width: '100%',
    background: 'transparent',
    position: 'absolute',
    zIndex: 1
  },
  loading: {
    margin: '0 auto',
    width: '100%',
    textAlign: 'center',
    '& svg': {
      color: theme.components.tab.indicator
    }
  },
  list: {
    height: 200,
    overflowY: 'scroll',
    padding: '0 14px',
    marginTop: 45
  }
})

const enhance = compose(
  withStyles(styles),
  withState('target', 'setTarget', []),
  withState('checkedAll', 'setChecked', false),
  withState('list', 'setList', []),
  withState('data', 'setData', []),
  withState('status', 'setStatus', { loading: true }),
  mapPropsStream(props$ => {
    props$
      .first()
      .subscribe(({ setData, getSuggestions, setStatus, setList }) => {
        getSuggestions()
          .then(results => {
            const suggestions = prop('results', results) || results
            setStatus({ loading: false })
            setData(suggestions)
            setList(suggestions)
          })
      })

    props$
      .filter(compose(not, isEmpty, prop('list')))
      .filter(compose(JSON.stringify, path(['input', 'value'])))
      .first()
      .subscribe(({ input, setTarget, list }) => {
        const defaultList = prop('value', input)
        const targetKeys = map(item => {
          if (is(Object, item)) {
            return item
          }
          return find(propEq('id', item), list)
        }, defaultList)
        input.onChange(input.value)
        setTarget(targetKeys)
      })

    props$
      .distinctUntilChanged(null, prop('target'))
      .subscribe(({ list, target, setChecked }) => {
        if (list.length > 0 && list.length === target.length) {
          setChecked(true)
        } else {
          setChecked(false)
        }
      })
    return props$
  }),
  pure,
)

const TransferField = (props) => {
  const {
    target,
    setTarget,
    data,
    setData,
    list,
    status,
    classes,
    label,
    meta,
    margin,
    disabled,
    fullWidth,
    checkedAll,
    helperText
  } = props
  const handleChange = (event, targetKey) => {
    let newTarget = []
    if (event.target.checked) {
      newTarget = [...target]
      newTarget.push(targetKey)
      setTarget(newTarget)
    } else {
      newTarget = filter(item => !equals(item.id, targetKey.id), target)
      setTarget(newTarget)
    }
    props.input.onChange(newTarget)
  }

  const search = (event) => {
    let query = event.target.value.toLowerCase()
    let newData = filter(item => item.name.toLowerCase().indexOf(query) !== -1, list)
    setData(newData)
  }

  const checked = id => {
    let has = findIndex(propEq('id', parseInt(id)), target)
    return has >= 0
  }

  const checkAll = (event) => {
    if (event.target.checked) {
      setTarget(list)
      props.input.onChange(list)
    } else {
      setTarget([])
      props.input.onChange([])
    }
  }

  return (
    <div>
      {status.loading ? <div className={classes.loading}><CircularProgress /></div> : (
        <div className={classes.root}>
          <FormControl
            margin={margin}
            disabled={disabled}
            fullWidth={fullWidth}
            error={Boolean(meta.error)}>
            <div className={classes.search}>
              <TextField
                className={classes.margin}
                fullWidth={true}
                label={label}
                onChange={(event) => search(event)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchCircle />
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <Checkbox
                        color="primary"
                        tabIndex={-1}
                        checked={checkedAll}
                        disableRipple={true}
                        onClick={(event) => checkAll(event)}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={classes.list}>
              {data.map(value => (
                <div key={value.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        tabIndex={-1}
                        disableRipple={true}
                        value={value.id.toString()}
                        checked={checked(value.id)}
                        onClick={(event) => handleChange(event, value)}
                      />
                    }
                    label={t(value.name)}
                  />
                </div>
              ))}
            </div>
            <FormHelperText>{meta.error || helperText}</FormHelperText>
          </FormControl>
        </div>
      )}
    </div>
  )
}

TransferField.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  helperText: PropTypes.string,
  target: PropTypes.array,
  list: PropTypes.array,
  data: PropTypes.array,
  setTarget: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  checkedAll: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  setData: PropTypes.func
}

export default enhance(TransferField)
