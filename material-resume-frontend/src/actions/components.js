import api from '../api';
import axios from 'axios';

import { 
  getComponentFromType
} from '../creator/components/ComponentFactory';

import { THEME_BASELINE } from '../utility/Themes';

export const COMPONENT_TRANSACTION_START = "COMPONENT_TRANSACTION_START"
export const COMPONENT_LOAD_SUCCESS = "COMPONENT_LOAD_SUCCESS"
export const COMPONENT_SAVE_SUCCESS = "COMPONENT_SAVE_SUCCESS"
export const COMPONENT_REMOVE_SUCCESS = "COMPONENT_REMOVE_SUCCESS"
export const COMPONENT_FAIL = "COMPONENT_FAIL"
export const COMPONENT_RESET = "COMPONENT_RESET"
export const COMPONENT_ADD = "COMPONENT_ADD"
export const COMPONENT_MOVE = "COMPONENT_MOVE"
export const COMPONENT_RESIZE = "COMPONENT_RESIZE"
export const COMPONENT_DELETE = "COMPONENT_DELETE"
export const PAGE_ADD = "PAGE_ADD"
export const PAGE_REMOVE = "PAGE_REMOVE"
export const COMPONENT_SETTINGS_CHANGE = "COMPONENT_SETTINGS_CHANGE"
export const RESUME_SETTINGS_CHANGE = "RESUME_SETTINGS_CHANGE"
export const PAGES_SETTINGS_CHANGE = 'PAGES_SETTINGS_CHANGE'


export const componentTransactionStart = () => ({
  type: COMPONENT_TRANSACTION_START
})

export const componentLoadSuccess = (values, resumeId) => ({
  type: COMPONENT_LOAD_SUCCESS,
  values, resumeId
})

export const componentSaveSuccess = () => ({
  type: COMPONENT_SAVE_SUCCESS,
})

export const componentRemoveSuccess = () => ({
  type: COMPONENT_REMOVE_SUCCESS,
})

export const componentFail = (error) => ({
  type: COMPONENT_FAIL,
  error
})

export const componentReset = () => ({
  type: COMPONENT_RESET
})

let nextCompId = -1;
export const addComponent = (componentType, containerId, col, row, width, height) => ({
  type: COMPONENT_ADD,
  id: Number(nextCompId--),
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
  id: Number(nextCompId--)
})

export const removePage = id => ({
  type: PAGE_REMOVE,
  id
})

export const changeComponentSettings = (id, settings) => ({
  type: COMPONENT_SETTINGS_CHANGE,
  id, settings
})

export const changePageSettings = (pageid, settings) => ({
  type: PAGES_SETTINGS_CHANGE,
  pageid, settings
})

export const changeResumeSettings = (settings) => ({
  type: RESUME_SETTINGS_CHANGE,
  settings
})


export const defaultResumeSettings = {
  theme: THEME_BASELINE
}

export const defaultPageSettings = {
  cols: 12,
  rows: 12,
  gap: '8px'
}

function isPageId(id){
  return ("" + id)[0] === 'p';
}

function idAndPageIdToInt(id){
  if(isPageId(id)){
    return id.substr(1) * 1
  } else{
    return id * 1
  }
}

function flattenComponents(componentList, parentId){
  let components = {}
  let componentSettings = {}
  let grids = {}
  let child_ids = []

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
    let componentSetting = Object.assign({},getComponentFromType(component.component_type).defaultSettings);

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
  let components = {}
  let pages = []
  let componentSettings = {}
  let grids = {}
  let pageSettings = {}

  pageList.forEach(page => {
    pages = [...pages, "p" + page.id]
    pageSettings["p" + page.id] = Object.assign({}, defaultPageSettings)
    page.settings.forEach(setting => {
      pageSettings["p" + page.id][setting.setting] = setting.value;
    });

    const flatComp = flattenComponents(page.child_components, "p" + page.id)
    components = {...components, ...flatComp.components}
    componentSettings = {...componentSettings, ...flatComp.componentSettings}
    grids = {...grids, ...flatComp.grids}
    if(flatComp.child_ids.length > 0){
      grids = {...grids, ["p" + page.id]: flatComp.child_ids}
    }
  })

  return {components, pages, componentSettings, grids, pageSettings}
}

export function loadComponents(resumeId){
  return dispatch => {
    dispatch(componentTransactionStart());
    api.get('components/resume/' + resumeId)
      .then(response => response.data)
      .then(json => {
        let values = flattenComponentStructure(json.pages)

        let resumeSettings = Object.assign({}, defaultResumeSettings);
        console.log(resumeSettings)
        json.settings.forEach(setting => {
          resumeSettings[setting.setting] = setting.value;
        });
        values.resumeSettings = resumeSettings;
        console.log(values.resumeSettings)
        dispatch(componentLoadSuccess(values, resumeId));
      })
      .catch(error => {
        dispatch(componentFail(error))
      });
  }
}

function resumeSettingsObjToList(resumeSettings){
  return Object.keys(resumeSettings).reduce((acc, key) => {
    const settingsObj = {
      'setting': key,
      'value': resumeSettings[key]
    }
    return [...acc, settingsObj];
  }, [])

}
function componentSettingsObjToList(id, componentSettings){
  if(id in componentSettings){
    return Object.keys(componentSettings[id]).reduce((acc, key) => {
      const settingsObj = {
        'setting': key,
        'value': componentSettings[id][key]
      }
      return [...acc, settingsObj];
    }, [])
  }
  return [];
}

function nestComponent(grid, reduxComponents){
  let { components, componentSettings, grids} = reduxComponents
  let list = []

  grid.forEach(componentId => {
    let children = [];
    if( componentId in grids){
      children = nestComponent(grids[componentId], reduxComponents);
    } else {
      children = [];
    }

    let compObject = {
      'settings': componentSettingsObjToList(componentId, componentSettings),
      'component_type': components[componentId].componentType,
      'row': components[componentId].row,
      'col': components[componentId].col,
      'height': components[componentId].height,
      'width': components[componentId].width,
      'child_components': children,
    }

    if(componentId >= 0){
      compObject.id = componentId;
    }
    list.push(compObject);
  });

  return list;
}

function nestComponentStructure(reduxComponents){
  let { componentSettings, grids, pages, resumeSettings, pageSettings} = reduxComponents;
  let object = {
    'pages': [],
    'settings': resumeSettingsObjToList(resumeSettings)
  }

  pages.forEach((pageId, i) => {
    //TODO: add page_num

    const children = nestComponent(grids[pageId], reduxComponents);
    let pageObject = {
      'settings': componentSettingsObjToList(pageId, pageSettings),
      'child_components': children,
      'page_num': i,
    }

    if(pageId.substring(1) * 1 >= 0){
      pageObject.id = pageId.substring(1) * 1;
    }

    object.pages.push(pageObject);
  });
  return object;
};

export function saveResume(resumeId, reduxComponents){
  return dispatch => {
    dispatch(componentTransactionStart());
    const nestedComponents = nestComponentStructure(reduxComponents)
    let deleteCalls = [];
    reduxComponents.removedComponents.forEach(id => {
      if(isPageId(id)){
        deleteCalls.push(axios.delete('components/page/' + idAndPageIdToInt(id)))
      } else{
        deleteCalls.push(axios.delete('components/component/' + idAndPageIdToInt(id)))
      }
    })
    if(deleteCalls.length > 0){
    axios.all(deleteCalls)
      .then(axios.spread((...responses) => {
        dispatch(componentRemoveSuccess());
        api.patch('components/resume/' + resumeId, JSON.stringify(nestedComponents))
          .then(response => response.data)
          .then(json => {
            dispatch(componentSaveSuccess())
          })
          .catch(error => {
            dispatch(componentFail(error))
          });
      }))
      .catch(errors => {
        console.log(errors)
      })
    } else {
      api.patch('components/resume/' + resumeId, JSON.stringify(nestedComponents))
        .then(response => response.data)
        .then(json => {
          dispatch(componentSaveSuccess())
        })
        .catch(error => {
          dispatch(componentFail(error))
        });
    }
  }
}
