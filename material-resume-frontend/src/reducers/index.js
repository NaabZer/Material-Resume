import { combineReducers } from 'redux'

import { components } from './components';
import { dragAndDrop } from './dragAndDrop';
import { entries } from './entries';
import { user } from './user';

const reducer = combineReducers({
  components,
  dragAndDrop,
  entries,
  user
});

export default reducer

