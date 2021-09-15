import api from '../api';
import { entryReset } from './entries';
import { componentReset } from './components';

export const USER_TRANSACTION_START = "USER_TRANSACTION_START"
export const USER_AUTH_START = "USER_AUTH_START"
export const USER_SET_TOKEN = "SET_TOKEN"
export const USER_LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const USER_SAVE_SUCCESS = "USER_SAVE_SUCCESS"
export const USER_FAIL = "USER_FAIL"
export const USER_RESET = "RESET"
export const USER_CHANGE_VALUE = "USER_CHANGE_VALUE"
export const USER_RESET_CHANGES = "USER_RESET_CHANGES"

export const submitTransactionStart = () => ({
  type: USER_TRANSACTION_START
})

export const submitAuthenticationStart = () => ({
  type: USER_AUTH_START
})

export const setToken = (token) => ({
  type: USER_SET_TOKEN,
  token
})

export const logInSuccess = (user) => ({
  type: USER_LOG_IN_SUCCESS,
  user
})
export const userSaveSuccess = () => ({
  type: USER_SAVE_SUCCESS
})

export const userFail = (errorObj) => ({
  type: USER_FAIL,
  errorObj
})

export const userChangeValue = (key, value) => ({
  type: USER_CHANGE_VALUE,
  key, value
})

export const resetUser = () => ({
  type: USER_RESET
})

export const resetUserChanges = () => ({
  type: USER_RESET_CHANGES
})

export function logIn(email, password){
  return dispatch => {
    dispatch(submitTransactionStart())
      return api.post('login',
        JSON.stringify({'email': email, 'password': password}))
      .then(response => response.data)
      .then(json => {
        api.get('user/' + email)
          .then(response => response.data)
          .then(json => {
            dispatch(entryReset())
            dispatch(componentReset())
            dispatch(logInSuccess(json))
            dispatch(getUser())
          })
      })
      .catch(error=> {
        dispatch(userFail(error))
        throw error
      })
  }
}

export function getUser(){
  return dispatch => {
    dispatch(submitAuthenticationStart())
      api.get('user')
      .then(response => response.data)
      .then(json => {
        dispatch(logInSuccess(json))
      })
      .catch( error => {
        dispatch(userFail(error))
        throw error
      });
  }
}

export function register(args){
  return dispatch => {
    if(args.password !== args.password2){
      throw new Error("passwords doesn't match");
    }
    dispatch(submitTransactionStart())
    return api.post('signup',
                  JSON.stringify(args))
      .then(response => response.data)
      .then(json => {
        const email = json['email']

        api.get('user/' + email)
          .then(response => response.data)
          .then(json => {
            dispatch(entryReset())
            dispatch(componentReset())
            dispatch(logInSuccess(json))
          })
      })
      .catch(error=> {
        dispatch(userFail(error))
        throw error
      })
  }
}

export function logOut(){
  return dispatch => {
    return api.post('logout')
      .then(response => response.data)
      .then(json => {
        dispatch(resetUser());
        dispatch(entryReset())
      });
  }
}

export function saveUser(user){
  return dispatch => {
    dispatch(submitTransactionStart())
    return api.patch('user/' + user.email, JSON.stringify(user))
      .then(response => response.data)
      .then(json => {
        dispatch(userSaveSuccess())
      })
      .catch(error => {
        dispatch(userFail(error))
        throw error

      });
  }
}

export function getCSRFToken(){
  return dispatch => {
    return api.get('csrf')
  }
}
