export const SELECTED_ACCOUNTS = 'SELECTED_ACCOUNTS';
export const AVAILABLE_ACCOUNTS = 'AVAILABLE_ACCOUNTS';
export const PLATFORMS = 'PLATFORMS';
export const DROPDOWN_LIST = 'DROPDOWN_LIST';
export const CREATE_PAGE_SELECTED_ACCOUNTS = 'CREATE_PAGE_SELECTED_ACCOUNTS';
export const SOCIAL_ICON = 'SOCIAL_ICON';
export const SELECTED_PINTEREST_BOARD = 'SELECTED_PINTEREST_BOARD';
export const CUSTOMIZATION = 'CUSTOMIZATION';
export const MEDIA_CATEGORY_LIST = 'MEDIA_CATEGORY_LIST';
export const ACTIVE_MEDIA_CATEGORY = 'ACTIVE_MEDIA_CATEGORY';
export const SOURCE = 'SOURCE';
export const FILE_LIST = 'FILE_LIST';
export const DYNAMIC_UPLOAD = 'DYNAMIC_UPLOAD';
export const CHARACTER_LIMIT = 'CHARACTER_LIMIT';
export const FEED_DESCRIPTION = 'FEED_DESCRIPTION';
export const REMOVE_ID = 'REMOVE_ID';
export const REMOVE_INDEX_ID = 'REMOVE_INDEX_ID';
export const OPEN_MEDIA_IMPORT = 'OPEN_MEDIA_IMPORT';
export const FILE_TYPE = 'FILE_TYPE';
export const FILE_RESTRICTION = 'FILE_RESTRICTION';
export const MEDIA_POPUP_OPEN = 'MEDIA_POPUP_OPEN';
export const PREVIEW_POPUP = 'PREVIEW_POPUP';
export const MEDIA_LOADER = 'MEDIA_LOADER';
export const UNSPLASH_FILELIST = 'UNSPLASH_FILELIST';
export const COMMENT = 'COMMENT';
export const PINTEREST_TITLE = 'PINTEREST_TITLE';
export const BOARD_LIST = 'BOARD_LIST';
export const PINTEREST_LINK = 'PINTEREST_LINK';
export const MULTIPLE_POST = 'MULTIPLE_POST';
export const SOCIAL_MODAL_POPUP = 'SOCIAL_MODAL_POPUP';
export const SOCIAL_MODAL_POPUP_NAME = 'SOCIAL_MODAL_POPUP_NAME';
export const CAPTURE_BEFORE_CUSTOMIZATION = 'CAPTURE_BEFORE_CUSTOMIZATION';
export const SELECTED_DATA_FOR_POPUP = 'SELECTED_DATA_FOR_POPUP';
export const SET_MINUTES_HOURS = 'SET_MINUTES_HOURS';
export const SET_TIME_DATE = 'SET_TIME_DATE';

export const updateSelectedAccounts = accounts => ({
  type: SELECTED_ACCOUNTS,
  accounts,
});
export const updateAvailableAccounts = accounts => ({
  type: AVAILABLE_ACCOUNTS,
  accounts,
});
export const updatePlatforms = accounts => ({
  type: PLATFORMS,
  accounts,
});
export const updateDropdownList = list => ({
  type: DROPDOWN_LIST,
  list,
});
export const updateCreateSelectedAccounts = list => ({
  type: CREATE_PAGE_SELECTED_ACCOUNTS,
  list,
});
export const updateSocialIcon = icon => ({
  type: SOCIAL_ICON,
  icon,
});
export const updateSelectedPinterestBoard = board => ({
  type: SELECTED_PINTEREST_BOARD,
  board,
});
export const updateCustomization = boolean => ({
  type: CUSTOMIZATION,
  boolean,
});
export const updateMediaCategoryList = list => ({
  type: MEDIA_CATEGORY_LIST,
  list,
});
export const updateActiveMediaCategory = prop => ({
  type: ACTIVE_MEDIA_CATEGORY,
  prop,
});
export const updateSource = prop => ({
  type: SOURCE,
  prop,
});
export const updateFileList = prop => ({
  type: FILE_LIST,
  prop,
});
export const updateDynamicUpload = prop => ({
  type: DYNAMIC_UPLOAD,
  prop,
});
export const updateSetCharacterLimit = prop => ({
  type: CHARACTER_LIMIT,
  prop,
});
export const updateFeedDescription = prop => ({
  type: FEED_DESCRIPTION,
  prop,
});
export const updateSetRemoveId = prop => ({
  type: REMOVE_ID,
  prop,
});
export const updateSetRemoveIndexId = prop => ({
  type: REMOVE_INDEX_ID,
  prop,
});
export const openImportMedia = prop => ({
  type: OPEN_MEDIA_IMPORT,
  prop,
});
export const openFileType = prop => ({
  type: FILE_TYPE,
  prop,
});
export const updateFileRestriction = prop => ({
  type: FILE_RESTRICTION,
  prop,
});
export const mediaPopupOpen = prop => ({
  type: MEDIA_POPUP_OPEN,
  prop,
});
//
export const previewPopupToggle = prop => ({
  type: PREVIEW_POPUP,
  prop,
});
//
export const updateMediaLoader = prop => ({
  type: MEDIA_LOADER,
  prop,
});
export const updateUnsplashFileList = prop => ({
  type: UNSPLASH_FILELIST,
  prop,
});
export const updateComments = prop => ({
  type: COMMENT,
  prop,
});
export const updatePinterestTitle = prop => ({
  type: PINTEREST_TITLE,
  prop,
});
export const updateBoardList = prop => ({
  type: BOARD_LIST,
  prop,
});
export const updatePinterestLink = prop => ({
  type: PINTEREST_LINK,
  prop,
});
export const updateMultiplePost = prop => ({
  type: MULTIPLE_POST,
  prop,
});
export const socialMediaPopupToggle = prop => ({
  type: SOCIAL_MODAL_POPUP,
  prop,
});
export const socialMediaPopupName = prop => ({
  type: SOCIAL_MODAL_POPUP_NAME,
  prop,
});
export const captureCustomization = prop => ({
  type: CAPTURE_BEFORE_CUSTOMIZATION,
  prop,
});
export const setSelectedDataForPopup = prop => ({
  type: SELECTED_DATA_FOR_POPUP,
  prop,
});
export const updateMinutesHours = prop => ({
  type: SET_MINUTES_HOURS,
  prop,
});
export const updateTimeDate = prop => ({
  type: SET_TIME_DATE,
  prop,
});
