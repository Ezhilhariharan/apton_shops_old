import {
  CREATE_CAMP_STEPS,
  EXISTING_CSV_LIST,
  WHATSAPP_CAMP_SETP1,
  WHATSAPP_CAMP_SETP2,
  WHATSAPP_CSV_URL,
  WHATSAPP_TEMPLATE,
  CAMPAIGN_NAME,
  CAMPAIGN_ERROR,
  CSV_ERROR_MESSAGE
} from './actions'

const initialState = {
  createCapmStep: 0,
  whatsapptempList: [],
  whatsApp_CSV_Url: '',
  sheduleSteeings: {},
  sheduleStep2: {},
  existingCSVList:[],
  campName:{},
  campaignError:{},
  csvError:{},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CAMP_STEPS:
      return {
        ...state,
        createCapmStep: action.value,
      }
    case WHATSAPP_TEMPLATE:
      return {
        ...state,
        whatsapptempList: action.list,
      }
    case WHATSAPP_CSV_URL:
      return {
        ...state,
        whatsApp_CSV_Url: action.url,
      }
    case WHATSAPP_CAMP_SETP1:
      return {
        ...state,
        sheduleSteeings: action.values,
      }
    case WHATSAPP_CAMP_SETP2:
      return {
        ...state,
        sheduleStep2: action.value,
      }
    case EXISTING_CSV_LIST:
    return {
      ... state,
      existingCSVList : action.list
    }
    case CAMPAIGN_NAME:
      return{
        ...state,
        campName:action.value,
      }
    case CAMPAIGN_ERROR:
      return{
        ...state,
        campaignError:action.value
      }
      case CSV_ERROR_MESSAGE:
        return{
          ...state,
          csvError:action.value
        }
    default:
      return state
  }
}
