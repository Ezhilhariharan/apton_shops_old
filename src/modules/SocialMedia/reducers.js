import {
  FB_POST_PUBLISHED_LIST,
  FB_POST_SCHEDULED_LIST,
  FB_POST_FAILED_LIST,
  SOCIAL_MEDIA_COUNT,
  FB_SCHEDULED_POST,
  FB_SCHEDULED_REEL,
  FILE_UPLOAD,
  INST_FILE_UPLOAD,
  FB_INST_ACTION,
  PRESEND,
  BUTTON_STATE,
  FILE_UPLOAD_LOADER,
  DYNAMIC_COMMENT,
  LOADER,
  PINTEREST_BOARD_LIST,
  NESTED_LINKDIN_COMMENT,
  UNSPLASH,
  IMAGE_STATUS,
} from './actions';

const initialState = {
  FbPublishedList: [],
  FbPostList: [],
  FbFailedList: [],
  fbschedulePost: {},
  fbscheduleReel: {},
  fileUrl: '',
  file: '',
  postActions: {},
  fileUploadLoader: false,
  dynamicComment: '',
  loader: true,
  PinterestBoardList: {},
  LinkdinNestedComment: [],
  SocialMediaCount: {},
  images: {},
  senUrl: {},
  buttons: 'Create',
  imgStatus: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FB_POST_PUBLISHED_LIST:
      return {
        ...state,
        FbPublishedList: action.list,
      };
    case FB_POST_SCHEDULED_LIST:
      return {
        ...state,
        FbPostList: action.list,
      };
    case FB_POST_FAILED_LIST:
      return {
        ...state,
        FbFailedList: action.list,
      };
    case FB_SCHEDULED_POST:
      return {
        ...state,
        fbschedulePost: action.value,
      };
    case FB_SCHEDULED_REEL:
      return {
        ...state,
        fbscheduleReel: action.value,
      };
    case FILE_UPLOAD:
      return {
        ...state,
        fileUrl: action.fileUrl,
      };
    case INST_FILE_UPLOAD:
      return {
        ...state,
        file: action.value,
      };
    case FB_INST_ACTION:
      return {
        ...state,
        postActions: action.value,
      };
    case FILE_UPLOAD_LOADER:
      return {
        ...state,
        fileUploadLoader: action.value,
      };
    case DYNAMIC_COMMENT:
      return {
        ...state,
        dynamicComment: action.value,
      };
    case LOADER:
      return {
        ...state,
        loader: action.value,
      };
    case PINTEREST_BOARD_LIST:
      return {
        ...state,
        PinterestBoardList: action.value,
      };
    case NESTED_LINKDIN_COMMENT:
      return {
        ...state,
        LinkdinNestedComment: action.value,
      };
    case SOCIAL_MEDIA_COUNT:
      return {
        ...state,
        SocialMediaCount: action.value,
      };
    case UNSPLASH:
      return {
        ...state,
        images: action.image,
      };
    case PRESEND:
      return {
        ...state,
        sendUrl: action.url,
      };
    case BUTTON_STATE:
      return {
        ...state,
        buttons: action.list,
      };
    case IMAGE_STATUS:
      return {
        ...state,
        imgStatus: action.value,
      };

    default:
      return state;
  }
};
