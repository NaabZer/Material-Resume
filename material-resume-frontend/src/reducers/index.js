import { combineReducers } from 'redux'

import { components } from './components';
import { dragAndDrop } from './dragAndDrop';
import { entries } from './entries';

const reducer = combineReducers({
  components,
  dragAndDrop,
  entries
});

export default reducer

