import api from '../api';
import { entryReset } from './entries';

export const USER_LOG_IN = "LOG_IN"
export const USER_SET_TOKEN = "SET_TOKEN"
export const USER_LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const USER_LOG_IN_FAIL = "LOG_IN_FAIL"
export const USER_RESET = "RESET"

export const submitLogIn = () => ({
  type: USER_LOG_IN
})

export const setToken = (token) => ({
  type: USER_SET_TOKEN,
  token
})

export const logInSuccess = (user) => ({
  type: USER_LOG_IN_SUCCESS,
  user
})

export const logInFail = (errorObj) => ({
  type: USER_LOG_IN_FAIL,
  errorObj
})

export const resetUser = () => ({
  type: USER_RESET
})

export function logIn(email, password){
  return dispatch => {
    dispatch(submitLogIn())
    return api.post('api-token-auth/',
                  JSON.stringify({'email': email, 'password': password}))
      .then(response => response.data)
      .then(json => {
        const token = json['token']
        api.defaults.headers.common['Authorization'] = 'Token ' + token;

        dispatch(setToken(token))

        api.get('user/')
          .then(response => response.data)
          .then(json => {
            dispatch(logInSuccess(json))
            dispatch(entryReset())
          })
      })
      .catch(error=> {
        dispatch(logInFail(error))
        throw error
      })
  }
}

export function register(args){
  return dispatch => {
    dispatch(submitLogIn())
    if(args.password !== args.password2){
      throw new Error("passwords doesn't match");
    }
    return api.post('user/signup',
                  JSON.stringify(args))
      .then(response => response.data)
      .then(json => {
        const token = json['token']
        api.defaults.headers.common['Authorization'] = 'Token ' + token;

        dispatch(setToken(token))

        api.get('user/')
          .then(response => response.data)
          .then(json => {
            dispatch(logInSuccess(json))
            dispatch(entryReset())
          })
      })
      .catch(error=> {
        dispatch(logInFail(error))
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
