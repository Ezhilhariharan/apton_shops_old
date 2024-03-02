/* eslint-disable no-unused-vars */

import request from '@utils/request';
import { notification } from 'antd';
import authSelector from '../../../Auth/selectors';
import selectors from './selectors';
import parentSelectors from '../../../../selectors';
import {
  whatsappOverviewCardAPI,
  whatsappCampaignListAPI,
} from '../../whatsapp/actions';
import { pricingValidation } from '../../../Auth/actions';
export const CREATE_CAMP_STEPS = 'CREATE_CAMP_STEPS';
export const WHATSAPP_TEMPLATE = 'WHATSAPP_TEMPLATE';
export const WHATSAPP_CSV_URL = 'WHATSAPP_CSV_URL';
export const WHATSAPP_CAMP_SETP1 = 'WHATSAPP_CAMP_SETP1';
export const WHATSAPP_CAMP_SETP2 = 'WHATSAPP_CAMP_SETP2';
export const EXISTING_CSV_LIST = 'EXISTING_CSV_LIST';
export const CAMPAIGN_NAME = 'CAMPAIGN_NAME';
export const CAMPAIGN_ERROR = 'CAMPAIGN_ERROR';
export const CSV_ERROR_MESSAGE = 'CSV_ERROR_MESSAGE';

export const updateCampSteps = value => ({
  type: CREATE_CAMP_STEPS,
  value,
});

export const updateCampaignName = value => ({
  type: CAMPAIGN_NAME,
  value,
});

export const updateWhatsAppTemplate = list => ({
  type: WHATSAPP_TEMPLATE,
  list,
});

export const updateWhatsAppCSV = url => ({
  type: WHATSAPP_CSV_URL,
  url,
});

export const updateCampSetp1 = values => ({
  type: WHATSAPP_CAMP_SETP1,
  values,
});

export const updateCampStep2 = value => ({
  type: WHATSAPP_CAMP_SETP2,
  value,
});

export const updateExistingCSVList = list => ({
  type: EXISTING_CSV_LIST,
  list,
});
export const updatecampaignError = value => ({
  type: CAMPAIGN_ERROR,
  value,
});

export const csvErrorUpdate = value => ({
  type: CSV_ERROR_MESSAGE,
  value,
});
// API Calls

export const getwhatsapptemplist =
  (name, limit) => async (dispatch, getState) => {
    const state = getState();
    const value = !isNaN(+name) || name === undefined ? ' ' : name;
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const currentLimit = limit ? `&limit=${limit}` : '';
    try {
      let response = await request.get(
        `/api/list_wa_template?account_id=${accountInfo?.account?.id}&brand_id=${brand?.id}&template_name=${value}&status=APPROVED`
      );
      if (response.status === 200) {
        dispatch(updateWhatsAppTemplate(response.data));
      }
    } catch (error) {
      console.log('getthemplate', error);
    }
  };
export const templateListNextPage = next => async dispatch => {
  try {
    const nextPage = next && (await request.get(next));
    if (nextPage?.status === 200) {
      dispatch(updateWhatsAppTemplate({ template_response: nextPage.data }));
    }
  } catch (error) {
    console.log('next page', error);
    dispatch(updateWhatsAppTemplate({}));
  }
};

export const templateListPreviousPage = previous => async dispatch => {
  try {
    const previousPage = previous && (await request.get(previous));
    if (previousPage?.status === 200) {
      dispatch(
        updateWhatsAppTemplate({ template_response: previousPage.data })
      );
    }
  } catch (error) {
    console.log('previous page', error);
    dispatch(updateWhatsAppTemplate({}));
  }
};
export const uploadWhatsAppCSV = url => async (dispatch, getState) => {
  try {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let Obj = Object.assign(
      url,
      { account_id: accountInfo?.account?.id },
      { brand_id: brand?.id }
    );
    if (url) {
      let response = await request.post(`/api/media_upload`, Obj);
      if (response) {
        dispatch(updateWhatsAppCSV(response.data));
        dispatch(csvErrorUpdate('NoError'));
        dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
      }
    }
  } catch (error) {
    console.log('whatsApp csv upload', error);
    dispatch(csvErrorUpdate(error?.response?.data?.error));
  }
};

export const uploadExistingWhatsAppCSV = url => async (dispatch, getState) => {
  try {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let Obj = Object.assign(
      url,
      { account_id: accountInfo?.account?.id },
      { brand_id: brand?.id }
    );
    if (url) {
      let response = await request.get(
        `/api/file_validation?account_id=${accountInfo?.account?.id}&brand_id=${brand?.id}&file_path=${url?.file_path?.url}`
      );
      if (response) {
        dispatch(updateWhatsAppCSV(response.data));
        dispatch(csvErrorUpdate('NoError'));
        dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
      }
    }
  } catch (error) {
    console.log('whatsApp csv upload', error);
    dispatch(csvErrorUpdate(error?.response?.data?.error));
  }
};

export const createWhatsAppCampgainsAPI =
  (navigate, value, selectedTemp, fileurl, tab) =>
  async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const csvURL = selectors.getWhatsAPPCSVfile(state);
    const camSetting = selectors.getShedulingValues(state);
    const template = selectors.getShedulingStep2(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const filePath = tab === '1' ? csvURL?.url : fileurl?.url;
    const sheduleDate = camSetting?.processing_date?.substring(0, 10);
    const sheduleTime = camSetting?.processing_date?.substring(10, 19);
    let merging = new Date(
      sheduleDate?.split('/')[2],
      sheduleDate?.split('/')[1] - 1,
      sheduleDate?.split('/')[0],
      sheduleTime?.split(':')[0],
      sheduleTime?.split(':')[1]?.slice(0, 2)
    );
    try {
      let response = await request.post(`/api/campaign/create`, {
        account_id: accountInfo?.account?.id,
        brand_id: brand?.id,
        campaign_name: camSetting?.campaign_name,
        file_path: filePath,
        schedule_type: camSetting?.schedule_type,
        processing_date:
          camSetting?.schedule_type != 'IMMEDIATELY'
            ? camSetting?.processing_date !== undefined
              ? Math.round(Date.parse(merging) / 1000)
              : ''
            : Math.round(Date.parse(new Date()) / 1000),
        save_as_draft: value !== undefined && value === 'draft' && true,
        template_name:
          value === 'draft' ? selectedTemp?.name : template?.template_name,
        template_language:
          value === 'draft'
            ? selectedTemp?.language
            : template?.template_language,
        template_id:
          value === 'draft' ? selectedTemp?.id : template?.template_id,
        // template_body:
        //   value === 'draft'
        //     ? { components: selectedTemp?.components }
        //     : template?.template_body,
        // meta_data: template?.meta_data,
      });
      dispatch(updateCampSetp1({}));
      dispatch(updateCampStep2({}));
      if (response.status === 200) {
        if (camSetting?.schedule_type === 'IMMEDIATELY') {
          notification.success({
            description: response.data.msg,
          });
        }
        if (camSetting?.schedule_type === 'SCHEDULE_LATER') {
          notification.success({
            description: 'Campaign Scheduled Successfully',
          });
        }
        dispatch(whatsappOverviewCardAPI(response?.data));
        dispatch(whatsappCampaignListAPI(response?.data));
        dispatch(navigate('/whatsapp-marketing'));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

export const fetchExistingCSVList = () => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  try {
    let response = await request.get(
      `/api/prospects_existing_list?account_id=${accountInfo?.account?.id}&brand_id=${brand?.id}`
    );
    if (response.status === 200) {
      dispatch(updateExistingCSVList(response.data));
    }
  } catch (error) {
    console.log('fetchExistingCSVList', error);
  }
};

export const campaignName =
  (brandId, campName) => async (dispatch, getState) => {
    const state = getState();
    const token = authSelector.getAuthToken(state);
    try {
      let response = await request.get(
        `/api/check_campaign_name?campaign_name=${campName}&brand_id=${brandId}`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        dispatch(updateCampaignName(response?.data));
        //dispatch(updateCampSteps(1))
      }
    } catch (error) {
      if (error?.response?.data?.error === 'Campaign Name Already Exists') {
        dispatch(updatecampaignError(error?.response?.data?.error));
      }
      console.log('campaignName', error);
    }
  };

export const preSendURl = (body, type, obj) => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  if (body && type) {
    // dispatch(updateFileLoader(true));
    try {
      let response = await request.get(
        `/api/presigned_url?file_name=${body?.file_name}&file_type=document`
      );
      if (response?.status === 200) {
        let body = {
          url: response?.data?.url?.split('?').shift(),
        };
        dispatch(updateWhatsAppCSV(body));
        dispatch(csvErrorUpdate('NoError'));
        dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
        dispatch(getUrl(response?.data?.url, obj, type));
      }
    } catch (error) {
      console.log('error', error);
      dispatch(csvErrorUpdate(error?.response?.data?.error));
    }
  }
};
export const getUrl = (url, file) => async dispatch => {
  if (url && file) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        body: file,
      });

      if (response.status === 200) {
        // dispatch(updateFileLoader(false));
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};
