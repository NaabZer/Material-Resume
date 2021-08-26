import axios from 'axios';
import api from '../api';
import { entryReset } from './entries';
import { componentReset } from './components';

export const USER_TRANSACTION_START = "USER_TRANSACTION_START"
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
    return api.post('api-token-auth/',
                  JSON.stringify({'email': email, 'password': password}))
      .then(response => response.data)
      .then(json => {
        const token = json['token']
        const email = json['email']
        api.defaults.headers.common['Authorization'] = 'Token ' + token;
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        dispatch(setToken(token))

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

export function register(args){
  return dispatch => {
    dispatch(submitTransactionStart())
    if(args.password !== args.password2){
      throw new Error("passwords doesn't match");
    }
    return api.post('user/signup',
                  JSON.stringify(args))
      .then(response => response.data)
      .then(json => {
        const token = json['token']
        const email = json['email']
        api.defaults.headers.common['Authorization'] = 'Token ' + token;

        dispatch(setToken(token))

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
    api.defaults.headers.common['Authorization'] = ''
    dispatch(resetUser());
    dispatch(entryReset())
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
