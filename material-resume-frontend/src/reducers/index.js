import { combineReducers } from 'redux'

import { components } from './components';
import { dragAndDrop } from './dragAndDrop';
import { entries } from './entries';
import { user } from './user';
import { resumes } from './resumes';

const reducer = combineReducers({
  components,
  dragAndDrop,
  entries,
  user,
  resumes,
});

export default reducer

