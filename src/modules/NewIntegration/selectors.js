const getWhatsAppAuthStatus = state =>
  state.integrationSelector.whatsAppAuthStatus;
const getBrandSocialMediaList = state =>
  state.integrationSelector.socialMediaList;
const getWhatsAppBusinessList = state =>
  state.integrationSelector.whatsAppBusinessList;
const getWhatsAppBusinessAccounts = state =>
  state.integrationSelector.whatsAppBusinessAccounts;
const getWhatsAppBusinessNumber = state =>
  state.integrationSelector.whatsAppBusinessNumber;
const getAccessToken = state => state.integrationSelector.wpAccessToken;
const getfbGroupList = state => state.integrationSelector.fbGroupList;
const getLinkedinSignup = state => state.integrationSelector.linkedinStep1;
const getTwitterDetails = state => state.integrationSelector.twitterAuth;
const getPinterestDetails = state => state.integrationSelector.pinterestAuth;
const getYoutubeAuth = state => state.integrationSelector.youTubeAuth;
const getYoutubeChannels = state => state.integrationSelector.youtubeChannels;
const getYoutubeconnection = state =>
  state.integrationSelector.youtubeConnection;
const getLinkedinpageSignup = state =>
  state.integrationSelector.linkedinPageStep1;
const getLinkedinPages = state => state.integrationSelector.linkedinPages;
const getLinkedinpageDetails = state => state.integrationSelector.linkedinSave;
const getActiveButton = state => state.integrationSelector.active;
const getFbAccountsList = state => state.integrationSelector.fbAccountsList;
const saveAccount = state => state.integrationSelector.saveAccount;
const getFbBusinessList = state => state.integrationSelector.fbBusinessList;
const getPageLoadingStatus = state => state.integrationSelector.loadPageStatus;
const getTwitterActiveStatus = state => state.integrationSelector.activeStatus;

const selectors = {
  getWhatsAppAuthStatus,
  getBrandSocialMediaList,
  getWhatsAppBusinessList,
  getWhatsAppBusinessAccounts,
  getWhatsAppBusinessNumber,
  getAccessToken,
  getfbGroupList,
  getLinkedinSignup,
  getTwitterDetails,
  getPinterestDetails,
  getYoutubeAuth,
  getYoutubeChannels,
  getYoutubeconnection,
  getLinkedinpageSignup,
  getLinkedinPages,
  getLinkedinpageDetails,
  getActiveButton,
  getFbAccountsList,
  saveAccount,
  getFbBusinessList,
  getPageLoadingStatus,
  getTwitterActiveStatus,
};

export default selectors;
