// import { REHYDRATE } from 'redux-persist/lib/constants'
// import authSelector from '@modules/Auth/selectors'
// import initializeApp from '@utils/initializeApp'

// // const authMiddleware = () => next => action => {
// //   if (action.type === REHYDRATE && action.payload) {
// //     const persistedState = action.payload
// //     if (persistedState.auth) {
// //     const token = authSelector.getAuthToken(persistedState)
// //     console.log("token",token)
// //      if (token) initializeApp(token)
// //     }
// //   }
// //   next(action)
// // }

// // export default authMiddleware


import { REHYDRATE } from 'redux-persist/lib/constants'
import authSelector from '../../modules/Auth/selectors'

import initializeApp from '../../utils/initializeApp'

const authMiddleware = () => next => action => {
  if (action.type === REHYDRATE && action.payload) {
    const persistedState = action.payload

    if (persistedState.authSelector) {
      const token = authSelector.getAuthToken(persistedState)
      if (token) {
        initializeApp(token)
      }
    }
  }

  next(action)
}

export default authMiddleware