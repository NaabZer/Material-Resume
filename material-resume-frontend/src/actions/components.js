export const COMPONENT_ADD = "COMPONENT_ADD"
export const COMPONENT_RESIZE = "COMPONENT_RESIZE"
export const COMPONENT_DELETE = "COMPONENT_DELETE"

let nextCompId = 0;
export const addComponent = (componentType, containerId, row, col, width, height) => ({
  type: 'COMPONENT_ADD',
  id: nextCompId++,
  componentType, containerId, row, col, width, height
})

export const resizeComponent = (id, width, height) => ({
  type: 'COMPONENT_RESIZE',
  width, height
})

export const deleteComponent = (id) => ({
  type: 'COMPONENT_DELETE',
  id
})
