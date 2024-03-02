import {SELECTED_WHATSAPP_SURVEY_CAMPAGIN, SURVEY_LIST,BOTS_OVERVIEW_CARD} from './actions';
  
  const initialState = {
    whatsAppSurveyList:[],
    selectedSurvey: null,
    botsOverview: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SURVEY_LIST:
        return {
          ...state,
          whatsAppSurveyList: action.whatsAppSurveyList,
        };
    case SELECTED_WHATSAPP_SURVEY_CAMPAGIN:
        return {
            ...state,
            selectedSurvey: action.survey
        }
    case BOTS_OVERVIEW_CARD:
        return {
            ...state,
            botsOverview: action.overView
        }
      default:
        return state;
    }
  };