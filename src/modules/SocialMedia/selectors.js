const getFbPostPublishedList = state =>
  state.socialMedialIntegration.fbPublishedList;
const getFBPostScheduledList = state =>
  state.socialMedialIntegration.fbScheduledList;
const getFBPostFailedList = state => state.socialMedialIntegration.fbFailedList;
const getFbSchedulePost = state => state.socialMedialIntegration.fbschedulePost;
const getFbScheduleReel = state => state.socialMedialIntegration.fbscheduleReel;
const getFileupload = state => state.socialMedialIntegration.fileUrl;
const getInstFileupload = state => state.socialMedialIntegration.file;
const getPostActions = state => state.socialMedialIntegration.postActions;
const getFileUploadLoader = state =>
  state.socialMedialIntegration.fileUploadLoader;
const getDynamicComment = state => state.socialMedialIntegration.dynamicComment;
const getLoader = state => state.socialMedialIntegration.loader;
const getBoardList = state => state.socialMedialIntegration.PinterestBoardList;
const getNestedCommentList = state =>
  state.socialMedialIntegration.LinkdinNestedComment;
const getSocialMediaCount = state =>
  state.socialMedialIntegration.SocialMediaCount;
const getUnsplash = state => state.socialMedialIntegration.images;
const getPresendFilepath = state => state.socialMedialIntegration.sendUrl;
const getButtonState = state => state.socialMedialIntegration.buttons;
const getImageStatus = state => state.socialMedialIntegration.imgStatus;

const getSelectedAccounts = state => state.socialMedialIntegration.selectedAccounts;
const getAvailableAccounts = state => state.socialMedialIntegration.availableAccounts;
const getAvailableplatforms = state => state.socialMedialIntegration.availablePlatforms;

const selectors = {
  getFbPostPublishedList,
  getFBPostScheduledList,
  getFBPostFailedList,
  getFbSchedulePost,
  getFbScheduleReel,
  getFileupload,
  getInstFileupload,
  getPostActions,
  getFileUploadLoader,
  getDynamicComment,
  getLoader,
  getBoardList,
  getNestedCommentList,
  getSocialMediaCount,
  getUnsplash,
  getPresendFilepath,
  getButtonState,
  getImageStatus,
  getSelectedAccounts,
  getAvailableAccounts,
  getAvailableplatforms
};

export default selectors;
