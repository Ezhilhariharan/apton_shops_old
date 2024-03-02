import request from '@utils/request';
import authSelector from '../Auth/selectors';
import { apiLoader } from '../SocialMedia/actions';

export const DASHBOARD_CAMPAIGN = 'DASHBOARD_CAMPAIGN';
export const RECENT_POSTS = 'RECENT_POSTS';
export const RECENT_CAMPAIGNS = 'RECENT_CAMPAIGNS';
export const POST_LIST = 'POST_LIST';
export const TRANSACTION_LIMIT = 'TRANSACTION_LIMIT';
export const RECENT_SURVEYS_LIST = 'RECENT_SURVEYS_LIST';
export const DASHBOARD_GRAPH = 'DASHBOARD_GRAPH';
export const RECENT_CAMPAIGNS_LIST = 'RECENT_CAMPAIGNS_LIST';

export const dashboardCampaigndetails = details => ({
  type: DASHBOARD_CAMPAIGN,
  details,
});
export const updateRecentPosts = details => ({
  type: RECENT_POSTS,
  details,
});
export const updateRecentCampaigns = details => ({
  type: RECENT_CAMPAIGNS,
  details,
});
export const dashboardGraphDetails = details => ({
  type: DASHBOARD_GRAPH,
  details,
});
export const postLitsStatus = details => ({
  type: POST_LIST,
  details,
});
export const transactionStatus = details => ({
  type: TRANSACTION_LIMIT,
  details,
});
export const updateCampaignsList = details => ({
  type: RECENT_CAMPAIGNS_LIST,
  details,
});
export const updateSurveysList = details => ({
  type: RECENT_SURVEYS_LIST,
  details,
});

export const campaignsList =
  (accountId, brandId, fromDate, toDate, startdate, currentDate) =>
  async (dispatch, getState) => {
    const state = getState();
    const token = authSelector.getAuthToken(state);
    const startDate = fromDate
      ? `&from_date=${fromDate}`
      : `&from_date=${startdate}`;
    const endDate = toDate ? `&to_date=${toDate}` : `&to_date=${currentDate}`;
    try {
      let response = await request.get(
        `/api/campaign_overview?brand_id=${brandId}&account_id=${accountId}${startDate}${endDate}`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        dispatch(dashboardCampaigndetails(response?.data));
      }
    } catch (error) {
      console.log('campaign', error);
    }
  };

export const recentPosts =
  (accountId, brandId, fromDate, toDate, startdate, currentDate) =>
  async (dispatch, getState) => {
    const state = getState();
    const token = authSelector.getAuthToken(state);
    const startDate = fromDate
      ? `&from_date=${fromDate}`
      : `&from_date=${startdate}`;
    const endDate = toDate ? `&to_date=${toDate}` : `&to_date=${currentDate}`;
    try {
      let response = await request.get(
        `/api/recent_medias?brand_id=${brandId}&account_id=${accountId}${startDate}${endDate}&connection_name=Facebook,Instagram,Facebook Groups,Pinterest&limit=7&page=1`,
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 200) {
        dispatch(updateRecentPosts(response.data));
      }
    } catch (error) {
      console.log('recentPosts', error);
    }
  };

export const recentCampaigns =
  (accountId, brandId, fromDate, toDate, startdate, currentDate) =>
  async (dispatch, getState) => {
    const state = getState();
    dispatch(apiLoader(true));

    const token = authSelector.getAuthToken(state);
    const startDate = fromDate
      ? `&from_date=${fromDate}`
      : `&from_date=${startdate}`;
    const endDate = toDate ? `&to_date=${toDate}` : `&to_date=${currentDate}`;
    try {
      let response = await request.get(
        `/api/recent_campaigns?brand_id=${brandId}&account_id=${accountId}${startDate}${endDate}&limit=5&page=1`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        dispatch(apiLoader(false));
        dispatch(updateRecentCampaigns(response?.data));
      }
    } catch (error) {
      console.log('recentCampaign', error);
    }
  };

export const postLists =
  (accountId, brandId, fromDate, toDate, startdate, currentDate) =>
  async (dispatch, getState) => {
    const state = getState();
    dispatch(apiLoader(true));
    const token = authSelector.getAuthToken(state);
    const startDate = fromDate
      ? `&from_date=${fromDate}`
      : `&from_date=${startdate}`;
    const endDate = toDate ? `&to_date=${toDate}` : `&to_date=${currentDate}`;
    try {
      let response = await request.get(
        `/api/post_list_status?brand_id=${brandId}&account_id=${accountId}${startDate}${endDate}`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        dispatch(apiLoader(false));
        dispatch(postLitsStatus(response?.data));
      }
    } catch (error) {
      console.log('postLists', error);
    }
  };

export const transactionsLimit =
  (accountId, brandId) => async (dispatch, getState) => {
    const state = getState();
    const token = authSelector.getAuthToken(state);
    try {
      let response = await request.get(
        `/api/transaction_limit?account_id=${accountId}&brand_id=${brandId}`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        dispatch(transactionStatus(response?.data));
      }
    } catch (error) {
      console.log('contactslimit', error);
    }
  };

export const recentSurveysList =
  (accountId, brandId, fromDate, toDate, startdate, currentDate) =>
  async (dispatch, getState) => {
    const state = getState();
    const token = authSelector.getAuthToken(state);
    const startDate = fromDate
      ? `&from_date=${fromDate}`
      : `&from_date=${startdate}`;
    const endDate = toDate ? `&to_date=${toDate}` : `&to_date=${currentDate}`;
    try {
      let response = await request.get(
        `/api/recent_surveies?account_id=${accountId}&brand_id=${brandId}${startDate}${endDate}`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        dispatch(updateSurveysList(response?.data));
      }
    } catch (error) {
      console.log('recentsurveyslist', error);
    }
  };

export const graphDetails =
  (accountId, brandId, fromDate, toDate, campaign, startdate, currentDate) =>
  async (dispatch, getState) => {
    dispatch(apiLoader(true));
    const state = getState();
    const token = authSelector.getAuthToken(state);
    const startDate = fromDate
      ? `&from_date=${fromDate}`
      : `&from_date=${startdate}`;
    const endDate = toDate ? `&to_date=${toDate}` : `&to_date=${currentDate}`;
    const graphtype = campaign === 'Campaign' ? 'CAMPAIGN' : 'SURVEY';
    try {
      let response = await request.get(
        `/api/dashboard_whatsapp_graph?brand_id=${brandId}&account_id=${accountId}${startDate}${endDate}&campaign_type=${graphtype}`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        dispatch(apiLoader(false));
        dispatch(dashboardGraphDetails(response?.data));
      }
    } catch (error) {
      console.log('graphDetails', error);
    }
  };
