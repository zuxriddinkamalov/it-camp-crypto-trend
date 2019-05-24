import { path, prop } from 'ramda'
import { setToken } from '../../helpers/token'
import * as ROUTES from '../../constants/routes'

export const watchAuthToken = ({ token, formValues, location, push }) => {
  if (token) {
    setToken(token, prop('rememberMe', formValues))
    push(path(['query', 'redirect'], location) || ROUTES.ROOT_PATH)
  }
}
