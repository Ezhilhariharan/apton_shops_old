import {
  NODE_LIST,
  SURVEY_TEMPLATE,
  UPDATE_NODE_EDGES,
  SURVEY_CSV_FILE,
  EXISTING_SURVEY_CSV_LIST,
  SURVEY_INFO,
  SURVEY_BOT_DETAILS_INFO,
  SURVEY_CREATE_MODE,
  HEADER_MEDIA_VALUE,
  OPEN_BOT_DRAWER,
  DRAWER_TITLE,
  DELETE_NODE
} from './actions';

const initialState = {
  nodeList: [],
  nodeEdgs: [],
  surveyTempaltes: [],
  surveyCSVFile: null,
  exisitingSurveyCSVFile: [],
  surveyInfo: null,
  surveyBotDetails:null,
  surveyMode: null,
  headerMedia: "",
  openBotDrawer: false,
  drawerTitle: '',
  deleteNodeId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NODE_LIST:
      return {
        ...state,
        nodeList: action.nodeList,
      };
    case UPDATE_NODE_EDGES:
      return {
        ...state,
        nodeEdgs: action.edges,
      };
    case SURVEY_TEMPLATE:
      return {
        ...state,
        surveyTempaltes: action.templates,
      };
    case SURVEY_CSV_FILE:
      return {
        ...state,
        surveyCSVFile: action.file,
      };
    case EXISTING_SURVEY_CSV_LIST:
      return {
        ...state,
        exisitingSurveyCSVFile: action.list,
      };
    case SURVEY_INFO:{
      return{
        ...state,
        surveyInfo:action.info
      }
    }
    case SURVEY_BOT_DETAILS_INFO:{
      return{
        ...state,
        surveyBotDetails: action.details
      }
    }
    case SURVEY_CREATE_MODE: {
      return {
        ...state,
        surveyMode: action.mode
      }
    }
    case HEADER_MEDIA_VALUE: {
      return {
        ...state,
        headerMedia: action.value
      }
    }
    case OPEN_BOT_DRAWER: {
      return {
        ...state,
        openBotDrawer: action.value
      }
    }
    case DRAWER_TITLE:{
      return {
        ...state,
        drawerTitle: action.title
      }
    }
    case DELETE_NODE:{
      return {
        ...state,
        deleteNodeId: action.nodeId
      }
    }
    default:
      return state;
  }
};
