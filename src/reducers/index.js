import {combineReducers} from 'redux'

import notifications from './notifications.js'
import user from './user'

export default combineReducers({
  notifications,
  user
})