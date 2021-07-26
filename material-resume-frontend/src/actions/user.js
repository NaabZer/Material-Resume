import api from '../api';

export const USER_SUBMIT_LOG_IN = "LOG_IN"
export const USER_GET_TOKEN = "GET_TOKEN"
export const USER_GET_USER = "GET_USER"

export const submitLogIn = () => ({
  type: USER_SUBMIT_LOG_IN
})

export const getToken = (token) => ({
  type: USER_GET_TOKEN,
  token
})

export const getUser = (user) => ({
  type: USER_GET_USER,
  user
})

export function logIn(username, password){
  return dispatch => {
    dispatch(submitLogIn(username, password))

    return api.post('api-token-auth/',
                  JSON.stringify({'username': username, 'password': password}))
      .then(response => response.data)
      .then(json => {
        const token = json['token']
        api.defaults.headers.common['Authorization'] = 'Token ' + token;

        dispatch(getToken(token))

        api.get('user/')
          .then(response => response.data)
          .then(json => dispatch(getUser(json)))
      })
  }
}
