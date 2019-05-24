import {
  curry,
  compose,
  prop,
  defaultTo,
  path,
  pick,
  filter,
  keys,
  equals,
  length,
  findIndex,
  pathOr
} from 'ramda'
import { parseParams } from './urls'
import { mapParamsToRequest, mapStrToBoolean, decodeURLParams } from './mapper'

export const getIdFromProps = compose(parseInt, pathOr(0, ['match', 'params', 'id']))
export const getParamsFormHistory = compose(
  parseParams,
  path(['location', 'search']),
)
export const getParamsCountFromHistory = curry((fields, history) => compose(
  length,
  keys,
  filter(Boolean),
  pick(fields),
  parseParams,
  path(['location', 'search']),
)(history))

export const getDataFromState = curry((name, state) => ({
  loading: path([name, 'loading'], state),
  data: path([name, 'data'], state),
}))

export const getBooleanFromHistory = curry((name, history) => compose(
  mapStrToBoolean,
  defaultTo('false'),
  prop(name),
  parseParams,
  path(['location', 'search']),
)(history))

export const getListParamsFromProps = compose(
  mapParamsToRequest,
  decodeURLParams,
  getParamsFormHistory,
  prop('history')
)

export const getIndexByTabName = curry((tabs, tabName) => findIndex(equals(tabName), tabs))
export const getCurrentTabIndex = curry((tabs, match) =>
  findIndex(equals(path(['params', 'tab'], match)), tabs) || 0
)
