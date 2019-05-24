import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import {
  withFetchList
} from '../../../components/HOC'
import * as STATES from '../../../constants/states'
import UserIsAuthenticated from '../../../permissions/UserIsAuthenticated'
import { getCryptoTradingListAction } from '../actions/crypto'

export default compose(
  UserIsAuthenticated,
  withFetchList({
    stateName: STATES.CRYPTO_TRADING_LIST,
    action: getCryptoTradingListAction,
    key: 'cryptoTradingList'
  }),
  withRouter
)(Dashboard)
