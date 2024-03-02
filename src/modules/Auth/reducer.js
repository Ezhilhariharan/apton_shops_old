import {
  UPDATE_ONBOARDING_STEPS,
  UPDATE_AUTH_TOKEN,
  UPDATE_SIGNUP_STATUS,
  ONBOARTING_STEP1,
  ONBOARTING_STEP2,
  BRAND_CATEGORY_LIST,
  COUNTRY_LIST,
  UPDATE_USER_INFO,
  UPDATE_BRAND_INFO,
  SELECT_BRAND,
  UPDATE_PRICING_VALIDATION,
  ESET_EMAIL,
  RESET_EMAIL,
} from './actions';

const initialState = {
  onboardingStep: 0,
  authToken: null,
  signUpStatus: {},
  onboardingStepOneValues: {},
  onboardingStepTwoValues: {},
  brandCategoryList: [],
  countryList: [],
  cusrentUser: '',
  brandProfile: {},
  selectedBrand: '',
  pricingValidationObj: {},
  getEmail: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ONBOARDING_STEPS:
      return {
        ...state,
        onboardingStep: action.value,
      };
    case UPDATE_PRICING_VALIDATION:
      return { ...state, pricingValidationObj: action.value };
    case UPDATE_AUTH_TOKEN:
      return { ...state, authToken: action.token };
    case UPDATE_SIGNUP_STATUS:
      return { ...state, signUpStatus: action.value };
    case ONBOARTING_STEP1:
      return { ...state, onboardingStepOneValues: action.value };
    case ONBOARTING_STEP2:
      return { ...state, onboardingStepTwoValues: action.value };
    case BRAND_CATEGORY_LIST:
      return { ...state, brandCategoryList: action.list };
    case COUNTRY_LIST:
      return { ...state, countryList: action.countryList };
    case UPDATE_USER_INFO:
      return { ...state, cusrentUser: action.userInfo };
    case UPDATE_BRAND_INFO:
      return { ...state, brandProfile: action.brandInfo };
    case SELECT_BRAND:
      return { ...state, selectedBrand: action.brand };
    case RESET_EMAIL:
      return { ...state, getEmail: action.value };
    default:
      return state;
  }
};
