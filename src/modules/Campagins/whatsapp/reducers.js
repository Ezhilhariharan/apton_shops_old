import {WHASTAPP_CAMP_LIST, WHASTAPP_CAMP_OVERVIEW,SELECTED_CAMPAGIN} from './actions'

const initialState = {
  campOverViewCard: [],
  whatsCampaginList: [],
  selectedWhatsAppCampagin:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case WHASTAPP_CAMP_OVERVIEW:
      return {
        ...state,
        campOverViewCard: action.list,
      }
    case WHASTAPP_CAMP_LIST:
      return {
        ...state,
        whatsCampaginList: action.campList,
      }
    case SELECTED_CAMPAGIN:
      return {...state,selectedWhatsAppCampagin: action.campagin}
    default:
      return state
  }
}
