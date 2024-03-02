import {
  UPDATE_SELECTED_TEXT,
  SAVE_IMAGE_URL,
  UPDATE_COUNTRY,
  UPDATE_PROVINCE,
  UPDATE_CITY,
  ACCOUNT_COUNTRTY,
  ACCOUNT_PROVINCE,
  ACCOUNT_CITY,
  SELECTED_CURRENT_USER,
  UPDATE_FIELDS,
  PLANS_LIST,
  PLANS_INFO,
  PAY_NOW,
  PAYMENT_INFO,
  BILLING_HISTORY
} from './actions';

const params = new URLSearchParams(window.location.search);
const status = params.get('payment');
const initialState = {
  selectedText: status?'Billing':'Account',
  imageUrl: '',
  country: '',
  province: '',
  city: '',
  accountCountry: '',
  accountProvince: '',
  accountCity: '',
  selectedUser: [],
  billingInfo: {},
  plansList: {},
  PlanInfo: {},
  payNow: {},
  paymentInformation:{},
  historyDetails:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_TEXT:
      return { ...state, selectedText: action.selectedText };
    case SAVE_IMAGE_URL:
      return { ...state, imageUrl: action.imageUrl };
    case UPDATE_COUNTRY:
      return { ...state, country: action.country };
    case UPDATE_PROVINCE:
      return { ...state, province: action.province };
    case UPDATE_CITY:
      return { ...state, city: action.city };
    case ACCOUNT_COUNTRTY:
      return { ...state, accountCountry: action.accountCountry };
    case ACCOUNT_PROVINCE:
      return { ...state, accountProvince: action.accountProvince };
    case ACCOUNT_CITY:
      return { ...state, accountCity: action.accountCity };
    case SELECTED_CURRENT_USER:
      return { ...state, selectedUser: action.selectedUser };
    case UPDATE_FIELDS:
      return { ...state, billingInfo: action.details };
    case PLANS_LIST:
      return {
        ...state,
        plansList: action.details,
      };
    case PLANS_INFO:
      return {
        ...state,
        planInfo: action.details,
      };
      case PAY_NOW:
        return {
          ...state,
          payNow: action.details,
        };
      case PAYMENT_INFO:
        return{
          ...state,
          paymentInformation:action.details
        }
      case BILLING_HISTORY:
        return{
          ...state,
          historyDetails:action.details
        }
    default:
      return state;
  }
};
