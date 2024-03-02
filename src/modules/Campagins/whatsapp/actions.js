import request from '@utils/request';
import { notification } from 'antd';
import authSelector from '../../Auth/selectors';
import parentSelectors from '../../../selectors';

export const WHASTAPP_CAMP_OVERVIEW = 'WHASTAPP_CAMP_OVERVIEW';
export const WHASTAPP_CAMP_LIST = 'WHASTAPP_CAMP_LIST';
export const SELECTED_CAMPAGIN = 'SELECTED_CAMPAGIN';

export const updateCampOverView = list => ({
  type: WHASTAPP_CAMP_OVERVIEW,
  list,
});

export const updateCampList = campList => ({
  type: WHASTAPP_CAMP_LIST,
  campList,
});

export const updateSelectedCampagin = campagin => ({
  type: SELECTED_CAMPAGIN,
  campagin,
});

export const whatsappOverviewCardAPI = () => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  try {
    let response = await request.get(
      `/api/wa_campaign_status?brand_id=${brand?.id}`
    );
    if (response.status === 200) {
      dispatch(updateCampOverView(response.data));
    }
  } catch (error) {
    console.log('whatsappOverviewCardAPI', error);
  }
};

export const whatsappCampaignListAPI =
  (page, status) => async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let fileStatus = '';
    switch (status) {
      case 'Draft':
        fileStatus = 0;
        break;
      case 'Scheduled':
        fileStatus = 3;
        break;
      case 'Running':
        fileStatus = 1;
        break;
      case 'Completed':
        fileStatus = 2;
        break;
      default:
        fileStatus = null;
    }
    const titleStatus =
      status && status !== 'All' ? `&status=${fileStatus}` : '';
    try {
      let response = await request.get(
        `/api/whatsapp_campaign_list?account_id=${
          accountInfo?.account?.id
        }&brand_id=${brand?.id}${titleStatus}&page=${page || 1}&limit=10`
      );
      if (response.status === 200) {
        dispatch(updateCampList(response.data));
      }
    } catch (error) {
      console.log('whatsappOverviewCardAPI', error);
    }
  };

export const wpCampaignActivateandDeactivate =
  (values, setLoading) => async () => {
    try {
      let response = await request.post(
        `/api/wp_campaign_activate_and_deactivate`,
        values
      );
      if (response.status === 200) {
        setLoading(false);
        notification.success({
          message: response.data.messages,
        });
      }
    } catch (error) {
      console.log('wpCampaignActivateandDeactivate', error);
    }
  };

export const deleteCampaign = values => async (dispatch, getState) => {
  try {
    let response = await request.delete(`/api/campaign`, {
      params: { campaign_id: values?.join(',') },
    });
    if (response?.status === 200) {
      dispatch(whatsappCampaignListAPI());
      dispatch(whatsappOverviewCardAPI());
      notification.success({
        message: response.data.msg,
      });
    }
  } catch (error) {
    console.log('deleteCampaign', error);
  }
};
