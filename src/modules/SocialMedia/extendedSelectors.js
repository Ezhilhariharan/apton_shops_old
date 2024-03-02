const getAvailableplatforms = state =>
  state.socialMedialExtended.availablePlatforms;
const getBoardlList = state => state.socialMedialExtended.boardList;
const getSelectedAccounts = state =>
  state.socialMedialExtended.selectedAccounts;
const getPlatform = state => state.socialMedialExtended.availablePlatforms;

const selectors = {
  getAvailableplatforms,
  getBoardlList,
  getSelectedAccounts,
  getPlatform,
};

export default selectors;
