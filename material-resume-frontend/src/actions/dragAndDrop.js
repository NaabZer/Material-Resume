export const DRAG_START = "DRAG_START"
export const DRAG_END = "DRAG_END"

export const startDrag = (componentType, width, height, grab_x, grab_y) => ({
  type: DRAG_START,
  width, componentType, height, grab_x, grab_y
});

export const endDrag = () => ({
  type: DRAG_END
})
