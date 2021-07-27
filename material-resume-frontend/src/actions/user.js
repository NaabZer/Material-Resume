import api from '../api';

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
    dispatch(submitLogIn(email, password))
    return api.post('api-token-auth/',
                  JSON.stringify({'email': email, 'password': password}))
      .then(response => response.data)
      .then(json => {
        const token = json['token']
        api.defaults.headers.common['Authorization'] = 'Token ' + token;

        dispatch(setToken(token))

        api.get('user/')
          .then(response => response.data)
          .then(json => dispatch(logInSuccess(json)))
      })
      .catch(error=> {
        dispatch(logInFail(error))
        throw error
      })
  }
}

export function logOut(){
  return dispatch => {
    dispatch(resetUser());
  }
}
