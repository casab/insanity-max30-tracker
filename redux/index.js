import { combineReducers } from 'redux'

import * as mainRedux from './mainRedux'

export const reducer = combineReducers({
  main: mainRedux.reducer,
})

export const ActionCreators = mainRedux.actionCreators