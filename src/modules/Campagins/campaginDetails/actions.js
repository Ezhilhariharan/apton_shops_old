import request from '@utils/request';
import { notification } from 'antd';
import authSelector from '../../Auth/selectors';
import parentSelectors from '../../../selectors';
import selectors from '../whatsapp/subcomponet/selectors';

export const CAMPAGAIN_DETAILS = 'CAMPAGAIN_DETAILS';
export const PROSPECTS_DETAILS = 'PROSPECTS_DETAILS';
export const UPDATE_CAMPAGAIN_DETAILS = 'UPDATE_CAMPAGAIN_DETAILS';
export const SELECTED_ROW = 'SELECTED_ROW';

export const updateCampaginDetails = details => ({
  type: CAMPAGAIN_DETAILS,
  details,
});

export const updateProspectsDetails = list => ({
  type: PROSPECTS_DETAILS,
  list,
});

export const updateDetails = value => ({
  type: UPDATE_CAMPAGAIN_DETAILS,
  value,
});

export const updateSelectedRow = details => ({
  type: SELECTED_ROW,
  details,
});
// API

export const fetchCampaginDetails =
  campaginId => async (dispacth, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    try {
      let response = await request.get(
        `/api/get_campaign?account_id=${accountInfo?.account?.id}&brand_id=${brand?.id}&campaign_id=${campaginId}`
      );
      if (response.status === 200) {
        dispacth(updateCampaginDetails(response?.data));
      }
    } catch (error) {
      console.log('fetchCampaginDetails', error);
    }
  };

export const fetchProspectsDetails = (campaginId, page) => async dispacth => {
  try {
    let response = await request.get(
      `api/campaign_marketing_list?campaign_id=${campaginId}&page=${page}&limit=10`
    );
    if (response.status === 200) {
      dispacth(updateProspectsDetails(response?.data));
    }
  } catch (error) {
    console.log('fetchProspectsDetails', error);
  }
};

export const downloadCampDetails = id => async () => {
  try {
    let response = await request.get(`/api/export_prospects?campaign_id=${id}`);
    if (response.status === 200) {
      window.open(response?.data?.file_url, '_blank');
      notification.success({
        message: 'File export successfully',
      });
    }
  } catch (error) {
    console.log('downloadCampDetails', error);
  }
};

export const updateCampaign =
  (
    value,
    name,
    date,
    time,
    navigate,
    scheduleType,
    draftType,
    selectedTemp,
    metaData
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const csvURL = selectors.getWhatsAPPCSVfile(state);
    const template = selectors.getShedulingStep2(state);
    const accountInfo = authSelector.getCurentUser(state);
    const token = authSelector.getAuthToken(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const dateTime = date + ' ' + time;

    try {
      let response = await request.put(
        `/api/update_campaign`,
        {
          campaign_id: value?.id,
          account_id: accountInfo?.account?.id,
          brand_id: brand?.id,
          schedule_type: scheduleType,
          processing_date: dateTime,
          campaign_name: name,
          file_path: csvURL?.url,
          save_as_draft: draftType === 'draft' && true,
          template_name:
            draftType === 'draft'
              ? selectedTemp?.name
              : template?.template_name,
          template_language:
            draftType === 'draft'
              ? selectedTemp?.language
              : template?.template_language,
          template_id:
            draftType === 'draft' ? selectedTemp?.id : template?.template_id,
          template_body:
            draftType === 'draft'
              ? { components: selectedTemp?.components }
              : template?.template_body,
          meta_data:
            draftType === 'draft'
              ? {
                  components: {
                    type: 'body',
                    parameters: metaData,
                  },
                }
              : template?.meta_data,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        notification.success({
          message: '',
          description: 'Campaign Update successfully',
        });
        dispatch(updateDetails(response?.data));
        dispatch(fetchCampaginDetails(value?.id));
        dispatch(fetchProspectsDetails(value?.id));
        dispatch(navigate('/whatsapp-marketing'));
      }
    } catch (error) {
      console.log('updateCampaign', error);
    }
  };
