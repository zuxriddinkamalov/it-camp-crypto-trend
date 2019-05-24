import { prop } from 'ramda'

export const getDefaultProps = (props) => ({
  logout: prop('logout', props),
})
