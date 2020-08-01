export const ENTRY_CREATE = "ENTRY_CREATE"
export const ENTRY_EDIT = "ENTRY_EDIT"
export const ENTRY_REMOVE = "ENTRY_REMOVE"

export const createEntry = (entryType, values) => ({
  type: ENTRY_CREATE,
  entryType,
  values
})

export const editEntry = (entryId, entryType, values) => ({
  type: ENTRY_EDIT,
  id: entryId,
  entryType,
  values
})

export const removeEntry = (entryId, entryType) => ({
  type: ENTRY_REMOVE,
  id: entryId,
  entryType
})
