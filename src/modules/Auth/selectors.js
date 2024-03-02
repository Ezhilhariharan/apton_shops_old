const getAuthToken = state => state.authSelector.authToken;
const getOnboardingStep = state => state.authSelector.onboardingStep;
const getSignUpStatus = state => state.authSelector.signUpStatus;
const getOnboardingStepOneValues = state =>
  state.authSelector.onboardingStepOneValues;
const getOnboardingStepTwoValues = state =>
  state.authSelector.onboardingStepTwoValues;
const getBrandCategoryList = state => state.authSelector.brandCategoryList;
const getCountryList = state => state.authSelector.countryList;
const getCurentUser = state => state.authSelector.cusrentUser;
const getBrandProfile = state => state.authSelector.brandProfile;
const getSelectedBrand = state => state.authSelector.selectedBrand;
const getPricingValidation = state => state.authSelector.pricingValidationObj;
const getResetEmail = state => state.authSelector.getEmail;

const selectors = {
  getAuthToken,
  getOnboardingStep,
  getSignUpStatus,
  getOnboardingStepOneValues,
  getOnboardingStepTwoValues,
  getBrandCategoryList,
  getCountryList,
  getCurentUser,
  getBrandProfile,
  getSelectedBrand,
  getPricingValidation,
  getResetEmail,
};

export default selectors;
