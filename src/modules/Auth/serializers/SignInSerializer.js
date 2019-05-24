import { prop } from 'ramda'

export const signInSerializer = (formValue) => {
  return {
    username: prop('username', formValue),
    password: prop('password', formValue),
  }
}

export const twitterSignInSerializer = (data) => {
  return {
    'oauth_token': prop('oauthToken', data),
    'oauth_verifier': prop('oauthVerifier', data),
  }
}
