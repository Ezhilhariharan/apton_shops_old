import { CAMPAGAIN_DETAILS, PROSPECTS_DETAILS,UPDATE_CAMPAGAIN_DETAILS,SELECTED_ROW } from './actions'

const initialState = {
  campaginDetails: '',
  prospectsList: [],
  updateCampaignDetails:{},
  selectedRow:{}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CAMPAGAIN_DETAILS:
      return {
        ...state,
        campaginDetails: action.details,
      }
    case PROSPECTS_DETAILS:
      return {
        ...state,
        prospectsList: action.list,
      }
    case UPDATE_CAMPAGAIN_DETAILS:
      return {
        ...state,
        updateCampaignDetails: action.value,
      }
    case SELECTED_ROW:
      return{
        ...state,
        selectedRow:action.details
      }

    default:
      return state
  }
}
