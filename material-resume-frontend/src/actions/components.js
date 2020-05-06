export const COMPONENT_ADD = "COMPONENT_ADD"
export const COMPONENT_MOVE = "COMPONENT_MOVE"
export const COMPONENT_RESIZE = "COMPONENT_RESIZE"
export const COMPONENT_DELETE = "COMPONENT_DELETE"

let nextCompId = 2;
export const addComponent = (componentType, containerId, col, row, width, height) => ({
  type: COMPONENT_ADD,
  id: nextCompId++,
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
