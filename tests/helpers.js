import { curry, map, range } from 'ramda'

export const timeout = () =>
  new Promise(resolve => setImmediate(() => resolve()))

export const generateFixture = curry((func, start, end) =>
  map(func, range(start, end))
)
