import request from '@utils/request';
import authSelector from '../Auth/selectors';
import parentSelectors from '../../selectors';

export const SURVEY_LIST = 'SURVEY_LIST';
export const SELECTED_WHATSAPP_SURVEY_CAMPAGIN =
  'SELECTED_WHATSAPP_SURVEY_CAMPAGIN';
export const BOTS_OVERVIEW_CARD = 'BOTS_OVERVIEW_CARD';

// update values
export const updateSurveyCampList = whatsAppSurveyList => ({
  type: SURVEY_LIST,
  whatsAppSurveyList,
});

export const updateSelectedSurvey = survey => ({
  type: SELECTED_WHATSAPP_SURVEY_CAMPAGIN,
  survey,
});

export const updateBotsOverviews = overView => ({
  type: BOTS_OVERVIEW_CARD,
  overView,
});

// API
export const fetchWhatsAppSurveyList = () => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = `account_id=${accountInfo?.account?.id}`;
  const brand_id = `brand_id=${brand?.id}`;
  try {
    let response = await request.get(
      `/api/list_survey_bots?${account_id}&${brand_id}`
    );
    if (response.status === 200) {
      dispatch(updateSurveyCampList(response.data));
    }
  } catch (error) {
    console.log('fetchWhatsAppSurveyList', error);
  }
};

export const updateBotStatus = data => async dispatch => {
  try {
    let response = await request.put(`/api/update_bot_status`, data);
    if (response.status === 200) {
      dispatch(fetchWhatsAppSurveyList());
      dispatch(fetchBotOverViews());
    }
  } catch (error) {
    console.log('deactivateBot', error);
  }
};

export const fetchBotOverViews = () => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = `account_id=${accountInfo?.account?.id}`;
  const brand_id = `brand_id=${brand?.id}`;
  try {
    let response = await request.get(
      `/api/bot_overview_status?${account_id}&${brand_id}`
    );
    if (response.status === 200) {
      dispatch(updateBotsOverviews(response.data?.bot_overview));
    }
  } catch (error) {
    console.log('fetchWhatsAppSurveyList', error);
  }
};
