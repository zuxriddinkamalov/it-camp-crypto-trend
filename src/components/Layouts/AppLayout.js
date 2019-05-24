import { compose } from 'recompose'
import BaseLayout from '../Layouts/BaseLayout'
import AuthWrapper from '../../modules/Auth/wrappers/AuthWrapper'

const AppLayout = compose(
  AuthWrapper,
)(BaseLayout)

export default AppLayout
