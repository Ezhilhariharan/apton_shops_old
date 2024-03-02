import {
  LIST_INBOX_NUMBER,
  CONVERSATION_STATUS,
  UPLOADED_FILE,
} from './actions';

const initialState = {
  inboxList: {},
  conversationStatus: {},
  uploadedFile: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_INBOX_NUMBER:
      return {
        ...state,
        inboxList: action.details,
      };
    case CONVERSATION_STATUS:
      return {
        ...state,
        conversationStatus: action.details,
      };
    case UPLOADED_FILE:
      return { ...state, uploadedFile: action.props };
    default:
      return state;
  }
};
