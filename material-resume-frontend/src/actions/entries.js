import api from '../api';

export const ENTRY_TRANSACTION_START = "ENTRY_TRANSACTION_START"
export const ENTRY_LOAD_SUCCESS = "ENTRY_LOAD_SUCCESS"
export const ENTRY_CREATE_SUCCESS = "ENTRY_CREATE_SUCCESS"
export const ENTRY_EDIT_SUCCESS = "ENTRY_EDIT_SUCCESS"
export const ENTRY_REMOVE_SUCCESS = "ENTRY_REMOVE_SUCCESS"
export const ENTRY_TRANSACTION_FAIL = "ENTRY_START_TRANSACTION"

export const entryTransactionStart = () => ({
  type: ENTRY_TRANSACTION_START,
})

export const loadEntrySuccess = (entryType, entries) => ({
  type: ENTRY_LOAD_SUCCESS,
  entryType,
  entries
})

export const createEntrySuccess = (entryType, values) => ({
  type: ENTRY_CREATE_SUCCESS,
  entryType,
  values
})

export const editEntrySuccess = (entryId, entryType, values) => ({
  type: ENTRY_EDIT_SUCCESS,
  id: entryId,
  entryType,
  values
})

export const removeEntrySuccess = (entryId, entryType) => ({
  type: ENTRY_REMOVE_SUCCESS,
  id: entryId,
  entryType
})

export function loadEntries(entryType){
  return dispatch => {
    dispatch(entryTransactionStart);
    api.get('entries/experiences/')
      .then(response => response.data)
      .then(json => {
        const refactored_json = Object.assign({}, ...json.map(json_e => {
          let entries = Object.assign({}, ...json_e.entries.map((x) => ({[x.lang]: x})));
          return {[json_e.id]: {...json_e, entries}}
        }));
        dispatch(loadEntrySuccess(entryType, refactored_json));
      })
      .catch(err => {
      });
  }
}

export function createEntry(entryType, values){
  return dispatch => {
  };
};
