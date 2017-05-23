import { createStore, applyMiddleware, compose } from 'redux'
import Reactotron from 'reactotron-react-native'

//import { persistStore, autoRehydrate } from 'redux-persist'

// Thunk middleware allows actions to be chained and waited on by returning
// a function from that action
import thunk from 'redux-thunk'

// Logs all actions going through redux into console
import { createLogger } from 'redux-logger'
import { reducer } from '../redux'

const middleware = [ thunk ]
let store_type = createStore

// Use the NODE_ENV to include logging and debugging tools
// in development environment. They will be compiled out of
// the production build.
if (process.env.NODE_ENV === 'development'){
  middleware.push(createLogger())
  // Turns on Reactotron debugging tool ??
  require('../config/ReactotronConfig')
  store_type = Reactotron.createStore
}

export default (initialState) => {
  const store = store_type(
    reducer,
    initialState,
    applyMiddleware(...middleware),
    // autoRehydrate()
  )
  // https://github.com/rt2zz/redux-persist
  // persistStore(store)
  return store
}

