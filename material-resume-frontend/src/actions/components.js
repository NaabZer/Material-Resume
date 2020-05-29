export const COMPONENT_ADD = "COMPONENT_ADD"
export const COMPONENT_MOVE = "COMPONENT_MOVE"
export const COMPONENT_RESIZE = "COMPONENT_RESIZE"
export const COMPONENT_DELETE = "COMPONENT_DELETE"
export const PAGE_ADD = "PAGE_ADD"
export const PAGE_REMOVE = "PAGE_REMOVE"
export const SETTINGS_CHANGE = "SETTINGS_CHANGE"

let nextCompId = 0;
export const addComponent = (componentType, containerId, col, row, width, height) => ({
  type: COMPONENT_ADD,
  id: Number(nextCompId++),
  componentType, containerId, col, row, width, height
})

export const moveComponent = (id, containerId, col, row) => ({
  type: COMPONENT_MOVE,
  id, containerId, col, row
})

export const resizeComponent = (id, width, height) => ({
  type: COMPONENT_RESIZE,
  id, width, height
})

export const deleteComponent = (id) => ({
  type: COMPONENT_DELETE,
  id
})

export const addPage = () => ({
  type: PAGE_ADD,
  id: Number(nextCompId++)
})

export const removePage = id => ({
  type: PAGE_REMOVE,
  id
})

export const changeSettings = (id, settings) => ({
  type: SETTINGS_CHANGE,
  id, settings
})
