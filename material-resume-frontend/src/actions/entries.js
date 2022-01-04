import api from '../api';

export const ENTRY_TRANSACTION_START = "ENTRY_TRANSACTION_START"
export const ENTRY_LOAD_SUCCESS = "ENTRY_LOAD_SUCCESS"
export const ENTRY_RESET = "ENTRY_RESET"
export const ENTRY_CREATE_SUCCESS = "ENTRY_CREATE_SUCCESS"
export const ENTRY_EDIT_SUCCESS = "ENTRY_EDIT_SUCCESS"
export const ENTRY_REMOVE_SUCCESS = "ENTRY_REMOVE_SUCCESS"
export const ENTRY_TRANSACTION_FAIL = "ENTRY_START_TRANSACTION"
export const ENTRIES_SET = "ENTRIES_SET"

export const entryTransactionStart = () => ({
  type: ENTRY_TRANSACTION_START,
})

export const entryReset = () => ({
  type: ENTRY_RESET
});

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
export const setEntries = (entries) => ({
  type: ENTRIES_SET,
  entries
})

function refactorJsonWithLang(json){
  const refactored_json = Object.assign({}, ...json.map(json_e => {
    let entries = Object.assign(
      {}, ...json_e.entries.map((x) => (
        {[x.lang.language]: {
          ...x,
          lang: x.lang.language
        }})
      )
    );
    return {[json_e.id]: {...json_e, entries}}
  }));
  return refactored_json
}

const entryTypes = ['text', 'experience'];
export function loadAllEntries(){
  return dispatch => {
    entryTypes.forEach(entryType => {
      dispatch(loadEntries(entryType));
    });
  }
}

export function loadEntries(entryType){
  return dispatch => {
    dispatch(entryTransactionStart());
    api.get('entries/' + entryType + 's/')
      .then(response => response.data)
      .then(json => {
        dispatch(loadEntrySuccess(entryType, refactorJsonWithLang(json)));
      })
      .catch(err => {
      });
  }
}

export function createEntry(entryType, values){
  return dispatch => {
    dispatch(entryTransactionStart());

    var entries_with_lang = Object.keys(values.entries).flatMap((key, index) =>{
      return {lang: key, ...values.entries[key]}
    });
    const refactored_values = {...values, 'entries': entries_with_lang}

    api.post('entries/' + entryType + 's/', JSON.stringify(refactored_values))
      .then(response => response.data)
      .then(json => {
        dispatch(createEntrySuccess(entryType, refactorJsonWithLang([json])))
      })
      .catch(err =>{
        console.log(err);
      });
  };
};

export function removeEntry(entryId, entryType){
  return dispatch => {
    dispatch(entryTransactionStart())

    api.delete('entries/' + entryType + 's/' + entryId)
      .then(response => response.data)
      .then(json => {
        dispatch(removeEntrySuccess(entryId, entryType));
      })
      .catch(err => {
        console.log(err)
      });
  }
}

export function editEntry(entryId, entryType, values){
  return dispatch => {
    dispatch(entryTransactionStart());

    var entries_with_lang = Object.keys(values.entries).flatMap((key, index) =>{
      return {lang: key, ...values.entries[key]}
    });
    const refactored_values = {...values, 'entries': entries_with_lang}
    console.log(refactored_values)

    api.patch('entries/' + entryType + 's/' + entryId, JSON.stringify(refactored_values))
      .then(response => response.data)
      .then(json => {
        console.log(json)
        console.log(refactorJsonWithLang([json]))
        dispatch(editEntrySuccess(entryId, entryType, refactorJsonWithLang([json])))
      })
      .catch(err =>{
        console.log(err.response);
      });
  }
}
