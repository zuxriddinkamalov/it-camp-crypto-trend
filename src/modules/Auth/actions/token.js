import { SIGN_IN } from '../constants/actionTypes'

// ------------------------------------
// Action set token to store
// ------------------------------------
export const setTokenAction = (data) => ({
  type: `${SIGN_IN}_FULFILLED`,
  payload: { token: data }
})

// ------------------------------------
// Action clear token form store
// ------------------------------------
export const clearTokenAction = () => ({
  type: `${SIGN_IN}_CLEAR`
})

export const actions = {
  setTokenAction,
  clearTokenAction
}
