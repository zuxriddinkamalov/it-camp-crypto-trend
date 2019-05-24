import { any, equals, prop } from 'ramda'

export const isCompanyActive = company => {
  return any(equals(prop('status', company)), ['active', 'less_30'])
}
