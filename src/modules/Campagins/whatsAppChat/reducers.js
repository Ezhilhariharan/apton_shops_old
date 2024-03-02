import { CHAT_HISTORY, CONVERSATION_LIST,OVER_VIEW_STATUS,BACK_PAGE } from './actions'

const initialState = {
    conversationList: [],
    chatHistory:[],
    overviewStatus:'',
    backtoprevious:{}
  }

  export default (state = initialState, action) => {
    switch (action.type) {
      case CONVERSATION_LIST:
        return {
          ...state,
          conversationList: action.list,
        }
       case  CHAT_HISTORY:
        return {
            ...state,
            chatHistory: action.list
        }
       case OVER_VIEW_STATUS:
        return {
            ...state,
            overviewStatus: action.info
        }
      case BACK_PAGE:
        return {
          ...state,
          backtoprevious:action.info
        }
      default:
        return state
    }
  }