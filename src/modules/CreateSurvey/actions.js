import request from '@utils/request';
import authSelector from '../Auth/selectors';
import parentSelectors from '../../selectors'
import createSurveySelector from '../CreateSurvey/selectors'
import surveyCampaginSelector from '../SurveyCampagin/selectors'
import { notification } from 'antd';


export const NODE_LIST = 'NODE_LIST';
export const UPDATE_NODE_EDGES = 'UPDATE_NODE_EDGES';
export const SURVEY_TEMPLATE = 'SURVEY_TEMPLATE';
export const EXISTING_SURVEY_CSV_LIST = 'EXISTING_SURVEY_CSV_LIST'
export const SURVEY_CSV_FILE = 'SURVEY_CSV_FILE'
export const SURVEY_INFO = "SURVEY_INFO"
export const SURVEY_BOT_DETAILS_INFO = "SURVEY_BOT_DETAILS_INFO"
export const SURVEY_CREATE_MODE = "SURVEY_CREATE_MODE"
export const HEADER_MEDIA_VALUE = "HEADER_MEDIA_VALUE"
export const OPEN_BOT_DRAWER = "OPEN_BOT_DRAWER"
export const DRAWER_TITLE = "DRAWER_TITLE"
export const DELETE_NODE = "DELETE_NODE"


export const updateNodeList = nodeList => ({
  type: NODE_LIST,
  nodeList,
});

export const updateEdges = edges => ({
  type: UPDATE_NODE_EDGES,
  edges,
});

export const updateSurveyTemplate = templates => ({
  type: SURVEY_TEMPLATE,
  templates,
});

export const updateSurveyCSV = file =>({
  type: SURVEY_CSV_FILE,
  file
})

export const updateExistingCSVfiles =  list =>({
  type: EXISTING_SURVEY_CSV_LIST,
  list
})

export const updateSurveyInfo = info =>({
  type: SURVEY_INFO,
  info
})

export const updateSurveyBotDetailedInfo = details =>({
  type: SURVEY_BOT_DETAILS_INFO,
  details
})

export const updateMode = mode =>({
  type: SURVEY_CREATE_MODE,
  mode
})

export const updateHeaderMedia = value => ({
  type:HEADER_MEDIA_VALUE,
  value
})

export const updateBotDrawer = value => ({
  type: OPEN_BOT_DRAWER,
  value
})

export const updateDrawerTitile = title => ({
  type: DRAWER_TITLE,
  title
})

export const deleteNodesById = nodeId =>({
  type: DELETE_NODE,
  nodeId
})

// API

export const fetchSurveyTemplates = (search) => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = `account_id=${accountInfo?.account?.id}`;
  const brand_id = `brand_id=${brand?.id}`;
  const searchByName = search ? `&template_name=${search}` : "";
  try {
    let response = await request.get(
      `/api/retrieve_whatsapp_message_templates?${account_id}&${brand_id}&category=TRANSACTIONAL&bot_template=true${searchByName}`
    );
    if (response.status === 200) {
      dispatch(updateSurveyTemplate(response.data));
    }
  } catch (error) {
    console.log('fetchSurveyTemplates', error);
  }
};

export const uploadSurveyCSV = (url) => async dispatch => {
  try {
    if (url) {
      let response = await request.post(`/api/media_upload`,url)
      if (response.status===200) {
          dispatch(updateSurveyCSV(response.data))
      }
    }
  } catch (error) {
    console.log('whatsApp csv upload', error)
  }
}

export const fetchExistingSurveyCSVFiles = () => async (dispatch,getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = `account_id=${accountInfo?.account?.id}`;
  const brand_id = `brand_id=${brand?.id}`;
  try {
    let response = await request.get(
      `/api/existing_list?${account_id}&${brand_id}`
    );
    if (response.status === 200) {
      dispatch(updateExistingCSVfiles(response.data));
    }
  } catch (error) {
    console.log('fetchExistingSurveyCSVFiles', error);
  }
}

// initialize Survey

export const initializeSurvey = (fromDate,toDate,surveyName) => async (dispatch,getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = accountInfo?.account?.id;
  const brand_id =brand?.id;
  const date1 = new Date(fromDate);
  const date2 = new Date(toDate);
  const data = {
      account_id:account_id,
      brand_id:brand_id,
      survey_name:surveyName,
      start_date: date1.getTime() / 1000,
      end_date: date2.getTime() / 1000,
  }
  try {
    let response = await request.post(`/api/initailze_whatsapp_survey`, data);
    if (response.status === 200) {
      dispatch(updateSurveyInfo(response.data))
      dispatch(addProspectsFile(response.data?.id))
    }
  } catch (error) {
    console.log('initializeSurvey', error);
  }
}

export const addProspectsFile = (id) => async (dispatch,getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const file_path = createSurveySelector.getSurveyCSVfile(state)
  const account_id = accountInfo?.account?.id;
  const brand_id =brand?.id;
  const data = {
      account_id:account_id,
      brand_id:brand_id,
      whatsapp_marketing_campaign_id: id,
      file_path: file_path?.url
  }
  try {
    let response = await request.post(`/api/survey_transaction`, data);
    if (response.status === 200) {
     console.log("resp",response.data)
    }
  } catch (error) {
    console.log('addProspectsFile', error);
  }
}

// retrive Survey Campagin details

export const fetchSuerveyBotDetailes =()=> async(dispatch,getState) => {
  const state = getState();
  const botId = surveyCampaginSelector.getSelectedSurveyCampagin(state)
  try {
    let response = await request.get(`/api/fetch_survey_bot?bot_id=${botId?.id}`);
    if (response.status === 200) {
      dispatch(updateSurveyBotDetailedInfo(response?.data?.survey_bot))
    }
  } catch (error) {
    console.log('FB-initializeSurvey', error);
  }
}

export const saveResponseTemplates = (body,title) => async(dispatch,getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const surveyId = createSurveySelector.getSurveyInfo(state)
   const data = {
    account_id: accountInfo?.account?.id ,
    brand_id: brand?.id,
    whatsapp_marketing_campaign_id:536,
    question: "Fabmerce Welcome Note",
    question_type: title,
    components_body: body
   }
   try {
    let response = await request.post(`/api/wa_survey_questions`,data)
    if(response.status===200){
       console.log(response.data)
    }
    
   } catch (error) {
     console.log("SaveResponseTemplates",error)
   }
} 

// media upload

export const surveyMediaUpload = (url) => async dispatch => {
  try {
    if (url) {
      let response = await request.post(`/api/file_upload`,url)
      if (response.status===200) {
          dispatch(updateHeaderMedia(response.data))
      }
    }
  } catch (error) {
    console.log('surveyMediaUpload', error)
  }
}

export const createBot = (node,edge,botname,type,navigate) => async (dispatch,getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const data = {
    account_id: accountInfo?.account?.id ,
    brand_id: brand?.id,
    name:botname,
    save_as_draft: type==='Draft'?true:false,
    details:node,
    position_mapping:edge
  }
  try {
    let response = await request.post(`/api/new_survey_bot`,data)
    if (response.status===200) {
        notification.success({
          message:"Bot Create Sucessfully!"
        })
        navigate('/survey-bots')
    }
  } catch (error) {
    console.log('createBot',error)
  }
}

export const updateBot =(botId,node,edge,botname,navigate)=>async (dispatch) => {
  const data = {
    bot_id:botId,
    name: botname,
    details:node,
    position_mapping:edge
  }
  try {
    let response = await request.put(`/api/update_survey_bot`,data)
    if (response.status===200) {
        dispatch(fetchSuerveyBotDetailes(response.data?.id))
        notification.success({
          message:"Bot Updated Sucessfully!"
        })
        navigate('/survey-bots')
    }
  } catch (error) {
    console.log("updateBot",error)
  }
}