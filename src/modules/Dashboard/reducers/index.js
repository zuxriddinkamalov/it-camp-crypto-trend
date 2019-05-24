import thunkReducer from '../../../helpers/thunkReducer'
import * as STATES from '../../../constants/states'
import * as actionTypes from '../constants/actionTypes'

export default {
  [STATES.CRYPTO_TRADING_LIST]: thunkReducer(actionTypes.CRYPTO_TRADING_LIST)
}
