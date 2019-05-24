import axios, { getPayloadFromSuccess, getPayloadFromError } from '../../../helpers/axios'
import * as actionsTypes from '../constants/actionTypes'
import { CRYPTOCOMPARE_API_HOST, CRYPTOCOMPARE_API_TOKEN } from '../constants/cryptocompare'

// ------------------------------------
// Action fetch User list
// ------------------------------------
export const API_CRYPTO_TRADING_LIST_URL = `${CRYPTOCOMPARE_API_HOST}/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD&
api_key=${CRYPTOCOMPARE_API_TOKEN}`

export const getCryptoTradingListAction = (params) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(API_CRYPTO_TRADING_LIST_URL, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.CRYPTO_TRADING_LIST,
      payload
    })
  }
}

export default {
  getCryptoTradingListAction
}
