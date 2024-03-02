import { DASHBOARD_CAMPAIGN,RECENT_POSTS,RECENT_CAMPAIGNS,POST_LIST, TRANSACTION_LIMIT,RECENT_SURVEYS_LIST,DASHBOARD_GRAPH } from "./actions";

const initialState={
    dashboardCampaignDetails:{},
    dashboardPostsList:{},
    dashboardCampaignsList:{},
    postListStatus:{},
    transactions:{},
    surveysList:{},
    dashboardGrapDetails:{}
}   


export default (state = initialState, action) => {
    switch (action.type) {
      case DASHBOARD_CAMPAIGN:
        return {
          ...state,
          dashboardCampaignDetails: action.details,
        }
      case RECENT_POSTS:
        return {
          ...state,
          dashboardPostsList: action.details,
        }
      case RECENT_CAMPAIGNS:
          return {
            ...state,
            dashboardCampaignsList: action.details,
          }
      case POST_LIST :
        return{
          ...state,
          postListStatus:action.details,
        }
      case TRANSACTION_LIMIT:
        return{
          ...state,
          transactions:action.details,
        }
      case RECENT_SURVEYS_LIST:
        return{
         ...state,
          surveysList:action.details,
        }
        case DASHBOARD_GRAPH:
          return{
           ...state,
            dashboardGrapDetails:action.details,
          }
        
      default:
        return state
    }
  }