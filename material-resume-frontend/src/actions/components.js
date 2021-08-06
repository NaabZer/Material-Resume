import api from '../api';

import { 
  getComponentFromType
} from '../creator/components/ComponentFactory';

export const COMPONENT_TRANSACTION_START = "COMPONENT_TRANSACTION_START"
export const COMPONENT_LOAD_SUCCESS = "COMPONENT_LOAD_SUCCESS"
export const COMPONENT_FAIL = "COMPONENT_FAIL"
export const COMPONENT_ADD = "COMPONENT_ADD"
export const COMPONENT_MOVE = "COMPONENT_MOVE"
export const COMPONENT_RESIZE = "COMPONENT_RESIZE"
export const COMPONENT_DELETE = "COMPONENT_DELETE"
export const PAGE_ADD = "PAGE_ADD"
export const PAGE_REMOVE = "PAGE_REMOVE"
export const SETTINGS_CHANGE = "SETTINGS_CHANGE"


export const componentTransactionStart = () => ({
  type: COMPONENT_TRANSACTION_START
})

export const componentLoadSuccess = (values) => ({
  type: COMPONENT_LOAD_SUCCESS,
  values
})

export const componentFail = (error) => ({
  type: COMPONENT_FAIL,
  error
})

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

function flattenComponents(componentList, parentId){
  var components = {}
  var componentSettings = {}
  var grids = {}
  var child_ids = []

  componentList.forEach(component =>{
    const componentObj = {
      'componentType': component.component_type,
      'row': component.row,
      'col': component.col,
      'width': component.width,
      'height': component.height,
      'containerId': parentId,
    }

    components = {...components, [component.id]: componentObj}
    child_ids.push(component.id)
    var componentSetting = getComponentFromType(component.component_type).defaultSettings;

    component.settings.forEach(setting => {
      componentSetting[setting.setting] = setting.value;
    });
    componentSettings = {...componentSettings, [component.id]: componentSetting}

    const flatComp = flattenComponents(component.child_components, component.id)
    components = {...components, ...flatComp.components}
    componentSettings = {...componentSettings, ...flatComp.componentSettings}
    grids = {...grids, ...flatComp.grids}
    if(flatComp.child_ids.length > 0){
      grids = {...grids, [component.id]: flatComp.child_ids}
    }
  });
  return {components, componentSettings, grids, child_ids}
}

function flattenComponentStructure(pageList){
  var components = {}
  var pages = []
  var componentSettings = {}
  var grids = {}

  pageList.forEach(page => {
    pages = [...pages, "p" + page.id]

    const flatComp = flattenComponents(page.child_components, "p" + page.id)
    components = {...components, ...flatComp.components}
    componentSettings = {...componentSettings, ...flatComp.componentSettings}
    grids = {...grids, ...flatComp.grids}
    if(flatComp.child_ids.length > 0){
      grids = {...grids, ["p" + page.id]: flatComp.child_ids}
    }
  })
  return {components, pages, componentSettings, grids}
}

export function loadComponents(resumeId){
  return dispatch => {
    dispatch(componentTransactionStart);
    api.get('components/resume/' + resumeId)
      .then(response => response.data)
      .then(json => {
        const values = flattenComponentStructure(json.pages)
        dispatch(componentLoadSuccess(values));
      })
      .catch(error => {
        console.log(error)
      });
  }
}
