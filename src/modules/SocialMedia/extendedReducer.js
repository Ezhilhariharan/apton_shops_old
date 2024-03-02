import {
  SELECTED_ACCOUNTS,
  AVAILABLE_ACCOUNTS,
  PLATFORMS,
  DROPDOWN_LIST,
  CREATE_PAGE_SELECTED_ACCOUNTS,
  SOCIAL_ICON,
  SELECTED_PINTEREST_BOARD,
  CUSTOMIZATION,
  MEDIA_CATEGORY_LIST,
  ACTIVE_MEDIA_CATEGORY,
  SOURCE,
  FILE_LIST,
  DYNAMIC_UPLOAD,
  CHARACTER_LIMIT,
  FEED_DESCRIPTION,
  REMOVE_INDEX_ID,
  REMOVE_ID,
  OPEN_MEDIA_IMPORT,
  FILE_TYPE,
  FILE_RESTRICTION,
  MEDIA_POPUP_OPEN,
  PREVIEW_POPUP,
  MEDIA_LOADER,
  UNSPLASH_FILELIST,
  COMMENT,
  PINTEREST_TITLE,
  BOARD_LIST,
  PINTEREST_LINK,
  MULTIPLE_POST,
  SOCIAL_MODAL_POPUP,
  SOCIAL_MODAL_POPUP_NAME,
  CAPTURE_BEFORE_CUSTOMIZATION,
  SELECTED_DATA_FOR_POPUP,
  SET_MINUTES_HOURS,
  SET_TIME_DATE,
} from './extendedAction';

const initialState = {
  selectedAccounts: [],
  availableAccounts: [],
  availablePlatforms: {},
  dropdownList: [],
  createSelectedAccount: [],
  socialIcon: null,
  selectedBoard: null,
  customizeStatus: false,
  mediaCategoryList: ['Feed', 'Reels'],
  activeMediaCategory: 'Feed',
  source: '',
  fileList: [],
  dynamicUpload: [],
  characterLimit: '',
  feedDescription: '',
  removeId: null,
  removeIndexId: null,
  mediaImport: null,
  fileType: 'image',
  fileRestriction: '.jpeg,.jpg,.png,.mp4',
  mediaPopupOpen: false,
  previewPopup: false,
  mediaLoader: false,
  unsplashFileList: [],
  Comment: '',
  pinterestTitle: '',
  boardList: [],
  pinterestLink: {
    link: '',
    error: '',
  },
  multiplePost: [{ id: 1, minimize: false }],
  modalPopupName: '',
  modalPopupToggle: false,
  captureCustomization: {},
  selectedPopupData: {},
  setMinutesOrHours: {
    minute: '',
    apiMinute: '',
    hour: '',
    apiHour: '',
  },
  setTimeAndDate: {
    time: '',
    date: '',
    apiDate: '',
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_ACCOUNTS:
      return {
        ...state,
        selectedAccounts: action.accounts,
      };
    case AVAILABLE_ACCOUNTS:
      return {
        ...state,
        availableAccounts: action.accounts,
      };
    case PLATFORMS:
      return {
        ...state,
        availablePlatforms: action.accounts,
      };
    case DROPDOWN_LIST:
      return {
        ...state,
        dropdownList: action.list,
      };
    case CREATE_PAGE_SELECTED_ACCOUNTS:
      return {
        ...state,
        createSelectedAccount: action.list,
      };
    case SOCIAL_ICON:
      return {
        ...state,
        socialIcon: action.icon,
      };
    case SELECTED_PINTEREST_BOARD:
      return {
        ...state,
        selectedBoard: action.board,
      };
    case CUSTOMIZATION:
      return {
        ...state,
        customizeStatus: action.boolean,
      };
    case MEDIA_CATEGORY_LIST:
      return {
        ...state,
        mediaCategoryList: action.list,
      };
    case ACTIVE_MEDIA_CATEGORY:
      return {
        ...state,
        activeMediaCategory: action.prop,
      };
    case SOURCE:
      return {
        ...state,
        source: action.prop,
      };
    case FILE_LIST:
      return {
        ...state,
        fileList: action.prop,
      };
    case DYNAMIC_UPLOAD:
      return {
        ...state,
        dynamicUpload: action.prop,
      };
    case CHARACTER_LIMIT:
      return {
        ...state,
        characterLimit: action.prop,
      };
    case FEED_DESCRIPTION:
      return {
        ...state,
        feedDescription: action.prop,
      };
    case REMOVE_ID:
      return {
        ...state,
        removeId: action.prop,
      };
    case REMOVE_INDEX_ID:
      return {
        ...state,
        removeIndexId: action.prop,
      };
    case OPEN_MEDIA_IMPORT:
      return {
        ...state,
        mediaImport: action.prop,
      };
    case FILE_TYPE:
      return {
        ...state,
        fileType: action.prop,
      };
    case FILE_RESTRICTION:
      return {
        ...state,
        fileRestriction: action.prop,
      };
    case MEDIA_POPUP_OPEN:
      return {
        ...state,
        mediaPopupOpen: action.prop,
      };
    case PREVIEW_POPUP:
      return {
        ...state,
        previewPopup: action.prop,
      };
    case MEDIA_LOADER:
      return {
        ...state,
        mediaLoader: action.prop,
      };
    case UNSPLASH_FILELIST:
      return {
        ...state,
        unsplashFileList: action.prop,
      };
    case COMMENT:
      return {
        ...state,
        Comment: action.prop,
      };
    case PINTEREST_TITLE:
      return {
        ...state,
        pinterestTitle: action.prop,
      };
    case BOARD_LIST:
      return {
        ...state,
        boardList: action.prop,
      };
    case PINTEREST_LINK:
      return {
        ...state,
        pinterestLink: action.prop,
      };
    case MULTIPLE_POST:
      return {
        ...state,
        multiplePost: action.prop,
      };
    case SOCIAL_MODAL_POPUP_NAME:
      return {
        ...state,
        modalPopupName: action.prop,
      };
    case SOCIAL_MODAL_POPUP:
      return {
        ...state,
        modalPopupToggle: action.prop,
      };
    case CAPTURE_BEFORE_CUSTOMIZATION:
      return {
        ...state,
        captureCustomization: action.prop,
      };
    case SELECTED_DATA_FOR_POPUP:
      return {
        ...state,
        selectedPopupData: action.prop,
      };
    case SET_MINUTES_HOURS:
      return {
        ...state,
        setMinutesOrHours: action.prop,
      };
    case SET_TIME_DATE:
      return {
        ...state,
        setTimeAndDate: action.prop,
      };
    default:
      return state;
  }
};
