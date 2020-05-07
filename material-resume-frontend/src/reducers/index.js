import { combineReducers } from 'redux'

import { components } from './components';
import { dragAndDrop } from './dragAndDrop';

const reducer = combineReducers({
  components,
  dragAndDrop
});

export default reducer

