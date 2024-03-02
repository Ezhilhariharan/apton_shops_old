import {
  BRAND_SOCIAL_MEDIA_LIST,
  CONNECT_WHATSAPP_STATUS,
  FB_GROUP_LIST,
  WHATSAPP_BUSINESS_ACCOUNTS,
  WHATSAPP_BUSINESS_LIST,
  WHATSAPP_BUSINESS_NUMBER,
  WP_ACCESS_TOKEN,
  LINKEDIN_STEP1,
  TWITTER_SIGNUP,
  PINTEREST_SIGNUP,
  PINTEREST_BOARD_LIST,
  PINTEREST_DETAILS,
  YOUTUBE_SIGNUP,
  CONNECT_YOUTUBE_CHANNEL,
  YOUTUBE_CHANNEL_LIST,
  LINKEDIN_SIGNUP,
  LINKEDIN_PAGES_LIST,
  LINKEDIN_PAGE_DETAILS,
  ACTIVE_BUTTONS,
  FB_ACCOUNTS_LIST,
  CONNECT_AD_ACCOUNT,
  FB_BUSINESS_LIST,
  LOAD_PAGES,
  TWITTER_STATUS,
} from './actions';

const initialState = {
  whatsAppAuthStatus: false,
  socialMediaList: [],
  whatsAppBusinessList: [],
  whatsAppBusinessAccounts: [],
  whatsAppBusinessNumber: [],
  wpAccessToken: null,
  fbGroupList: [],
  linkedinStep1: {},
  twitterAuth: {},
  pinterestAuth: {},
  youTubeAuth: {},
  youtubeChannels: {},
  youtubeConnection: {},
  linkedinPageStep1: {},
  linkedinPages: {},
  linkedinSave: {},
  active: localStorage.getItem('activeButton')
    ? localStorage.getItem('activeButton')
    : 'Facebook',
  fbAccountsList: {},
  saveAdAccount: {},
  fbBusinessList: {},
  loadPageStatus: true,
  activeStatus: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_WHATSAPP_STATUS:
      return {
        ...state,
        whatsAppAuthStatus: action.authStatus,
      };
    case BRAND_SOCIAL_MEDIA_LIST:
      return {
        ...state,
        socialMediaList: action.list,
      };
    case WHATSAPP_BUSINESS_LIST:
      return {
        ...state,
        whatsAppBusinessList: action.business_list,
      };
    case WHATSAPP_BUSINESS_ACCOUNTS:
      return {
        ...state,
        whatsAppBusinessAccounts: action.business_accounts,
      };
    case WHATSAPP_BUSINESS_NUMBER:
      return {
        ...state,
        whatsAppBusinessNumber: action.business_number,
      };
    case WP_ACCESS_TOKEN:
      return {
        ...state,
        wpAccessToken: action.accessToken,
      };
    case FB_GROUP_LIST:
      return {
        ...state,
        fbGroupList: action.list,
      };
    case LINKEDIN_STEP1:
      return {
        ...state,
        linkedinStep1: action.details,
      };
    case TWITTER_SIGNUP:
      return {
        ...state,
        twitterAuth: action.details,
      };
    case PINTEREST_SIGNUP:
      return {
        ...state,
        pinterestAuth: action.details,
      };
    case YOUTUBE_SIGNUP:
      return {
        ...state,
        youTubeAuth: action.details,
      };
    case YOUTUBE_CHANNEL_LIST:
      return {
        ...state,
        youtubeChannels: action.details,
      };
    case CONNECT_YOUTUBE_CHANNEL:
      return {
        ...state,
        youtubeConnection: action.details,
      };
    case LINKEDIN_SIGNUP:
      return {
        ...state,
        linkedinPageStep1: action.details,
      };
    case LINKEDIN_PAGES_LIST:
      return {
        ...state,
        linkedinPages: action.details,
      };
    case LINKEDIN_PAGE_DETAILS:
      return {
        ...state,
        linkedinSave: action.details,
      };
    case ACTIVE_BUTTONS:
      return { ...state, active: action.active };
    case FB_ACCOUNTS_LIST:
      return { ...state, fbAccountsList: action.fbAccountsList };
    case CONNECT_AD_ACCOUNT:
      return {
        ...state,
        saveAdAccount: action.details,
      };
    case FB_BUSINESS_LIST:
      return { ...state, fbBusinessList: action.fbBusinessList };
    case LOAD_PAGES:
      return { ...state, loadPageStatus: action.list };
    case TWITTER_STATUS:
      return { ...state, activeStatus: action.active };
    default:
      return state;
  }
};
