import api from '../api';

export const RESUME_START_TRANSACTION = "RESUME_START_TRANSACTION"
export const RESUME_LOAD_SUCCESS = "RESUME_LOAD_SUCCESS"
export const RESUME_FAIL = "RESUME_FAIL"
export const RESUME_RESET = "RESUME_RESET"

export const resumeStartTransaction = () => ({
  type: RESUME_START_TRANSACTION
})

export const resumeLoadSuccess = (values) => ({
  type: RESUME_LOAD_SUCCESS,
  values
})

export const resumeFail = (error) => ({
  type: RESUME_FAIL,
  error
})

export const resumeReset = () => ({
  type: RESUME_RESET,
})

export function loadResumes(){
  return dispatch => {
    dispatch(resumeStartTransaction());
    return api.get('components/resume')
      .then(response => response.data)
      .then(json => {
        dispatch(resumeLoadSuccess(json));
      })
      .catch(error => {
        dispatch(resumeFail(error));
      })
      
  }
}
