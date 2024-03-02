/* eslint-disable no-unused-vars */
import request from '@utils/request';
import { notification } from 'antd';
import authSelector from '../Auth/selectors';
import selectors from './selectors';
import parentSelectors from '../../selectors';
export const CONNECT_WHATSAPP_STATUS = 'CONNECT_WHATSAPP_STATUS';
export const BRAND_SOCIAL_MEDIA_LIST = ' BRAND_SOCIAL_MEDIA_LIST';
export const WHATSAPP_BUSINESS_LIST = 'WHATSAPP_BUSINESS_LIST';
export const WHATSAPP_BUSINESS_ACCOUNTS = 'WHATSAPP_BUSINESS_ACCOUNTS';
export const WHATSAPP_BUSINESS_NUMBER = 'WHATSAPP_BUSINESS_NUMBER';
export const WP_ACCESS_TOKEN = 'WP_ACCESS_TOKEN';
export const FB_GROUP_LIST = 'FB_GROUP_LIST';
export const FB_BUSINESS_LIST = 'FB_BUSINESS_LIST';
export const FB_ACCOUNTS_LIST = 'FB_ACCOUNTS_LIST';
export const LINKEDIN_STEP1='LINKEDIN_STEP1';
export const TWITTER_SIGNUP='TWITTER_SIGNUP';
export const PINTEREST_SIGNUP='PINTEREST_SIGNUP'
export const PINTEREST_BOARD_LIST='PINTEREST_BOARD_LIST'
export const PINTEREST_DETAILS='PINTEREST_DETAILS'
export const YOUTUBE_SIGNUP='YOUTUBE_SIGNUP'
export const YOUTUBE_CHANNEL_LIST='YOUTUBE_CHANNEL_LIST'
export const CONNECT_YOUTUBE_CHANNEL='CONNECT_YOUTUBE_CHANNEL'
export const LINKEDIN_SIGNUP='LINKEDIN_SIGNUP'
export const LINKEDIN_PAGES_LIST='LINKEDIN_PAGES_LIST'
export const LINKEDIN_PAGE_DETAILS='LINKEDIN_PAGE_DETAILS'
export const CONNECT_AD_ACCOUNT='CONNECT_AD_ACCOUNT'

const { API_BASEURL } = process.env;

// actions

export const updateWhatsAppAuthStatus = authStatus => ({
  type: CONNECT_WHATSAPP_STATUS,
  authStatus,
});

export const updateSocialMediaList = list => ({
  type: BRAND_SOCIAL_MEDIA_LIST,
  list,
});

// whatsAPP updation
export const updateWhatsAppBusinessList = business_list => ({
  type: WHATSAPP_BUSINESS_LIST,
  business_list,
});

export const updateWhatsAppBusinessAccounts = business_accounts => ({
  type: WHATSAPP_BUSINESS_ACCOUNTS,
  business_accounts,
});

export const updateWhatsAppAuthNumber = business_number => ({
  type: WHATSAPP_BUSINESS_NUMBER,
  business_number,
});

export const updateAccessToken = accessToken => ({
  type: WP_ACCESS_TOKEN,
  accessToken,
});

export const updatFbGroupList = list => ({
  type: FB_GROUP_LIST,
  list,
});

export const updatFbBusinessList = list => ({
  type: FB_BUSINESS_LIST,
  list,
});

export const updatFbAccountsList = list => ({
  type: FB_ACCOUNTS_LIST ,
  list,
});

export const updateLinkedinStep1 = details => ({
  type: LINKEDIN_STEP1,
  details,
})

export const updateTwitterSignup = details => ({
  type: TWITTER_SIGNUP,
  details,
})

export const updatePinterestSignup = details => ({
  type: PINTEREST_SIGNUP,
  details,
})

export const updateYoutubeSignup = details => ({
  type: YOUTUBE_SIGNUP,
  details
})
export const updateYoutubeChannels = details => ({
  type: YOUTUBE_CHANNEL_LIST,
  details
})
export const updateYoutubeConnection = details => ({
  type: CONNECT_YOUTUBE_CHANNEL,
  details
})

export const updateAdAccounts = details => ({
  type: CONNECT_AD_ACCOUNT,
  details
})

export const updateLinkedinPageStep1=details=>({
  type:LINKEDIN_SIGNUP,
  details,
})

export const linkedinPageList=details=>({
  type:LINKEDIN_PAGES_LIST,
  details,
})

export const linkedinSaveOption=details=>({
  type:LINKEDIN_PAGE_DETAILS,
  details
})
// API funtions
export const FB_INST_integration = obj => async (dispatch, getState) => {
  try {
    let response = await request.get(
      `/api/facebook_auth?${obj.accountId}${obj.brandId}${obj.reference_url}${obj.connection_name}${obj.redirect_uri}`
    );
    if (response.status === 200) {
      window.location.href = response?.data?.redirect_url;
    }
   
  } catch (error) {
    notification.warn({
      message: '',
      description: error?.response?.data?.error,
    });
  }
};

export const FB_INST_Disconnect = obj => async (dispatch, getState) => {
  let response = '';
  const state = getState();
  const token = authSelector.getAuthToken(state);
  response = await request.post('/api/remove_connection', obj, {
    headers: { Authorization: token },
  });
  return response;
};

export const socialintegration = obj => async (dispatch, getState) => {
  try {
    let response = await request.get(
      `/api/facebook_auth?${obj.accountId}${obj.brandId}${obj.reference_url}${obj.connection_name}${obj.redirect_uri}`
    );
    if (response.status === 200) {
      window.location.href = response?.data?.redirect_url;
    }
  } catch (error) {
    notification.warn({
      message: '',
      description: error?.response?.data?.error,
    });
  }
};

export const socialDisconnect = obj => async (dispatch, getState) => {
  let response = '';
  const state = getState();
  const token = authSelector.getAuthToken(state);
  response = await request.post('/api/remove_connection', obj, {
    headers: { Authorization: token },
  });
  return response;
};

export const savePage = obj => async (dispatch, getState) => {
  let response = '';
  const state = getState();
  const token = authSelector.getAuthToken(state);
  response = await request.post('/api/save_facebook_page', obj, {
    headers: { Authorization: token },
  });
  return response;
};
export const getPageList =
  (accessToken, State) => async (dispatch, getState) => {
    let response = '';
    const state = getState();
    const token = authSelector.getAuthToken(state);
    response = request.get(
      `/api/facebook_pages_list?access_token=${accessToken}&state=${State}`,
      {
        headers: { Authorization: token },
      }
    );
    return response;
  };

export const whatsDisconnect = () => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const body = {
    brand_id: brand?.id,
    account_id: accountInfo?.account?.id,
  };
  try {
    let response = await request.post(`/api/whatsapp_disconnect`, body);
    if (response.status === 200) {
      if (response.data.msg === 'WhatsApp Disconnected Successfully') {
        notification.success({
          message: '',
          description: response.data.msg,
        });
        dispatch(updateWhatsAppAuthStatus(true));
        dispatch(getSocialMediaList());
      }
    }
  } catch (error) {
    console.log('disconnect whatsapp', error);
  }
};

export const pageList = body => async (dispatch, getState) => {
  try {
    let response = await request.post('/api/save_facebook_page', body);
    if (response) {
      /* empty */
    }
  } catch (error) {
    console.log('disconnect whatsapp', error);
  }
};

export const getSocialMediaList = () => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = `account_id=${accountInfo?.account?.id}`;
  const brand_id = `brand_id=${brand?.id}`;
  try {
    let response = await request.get(
      `/api/social_media_list?${account_id}&${brand_id}`
    );
    if (response.status === 200) {
      dispatch(updateSocialMediaList(response?.data));
    }
  } catch (error) {
    console.log('social media list', error);
  }
};

// WhatsAPP Authendication Flow

export const whatsappAuthenticationStepOne =
  () => async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const account_id = `account_id=${accountInfo?.account?.id}`;
    const brand_id = `&brand_id=${brand?.id}`;
    const connection_name = '&connection_name=WhatsApp';
    const reference_url = `&reference_url=${API_BASEURL}/integration`
    const redirect_uri = `&redirect_uri=${API_BASEURL}/whatsapp-auth`

    try {
      let response = await request.get(
        `/api/whatsapp_signup?${account_id}${brand_id}${connection_name}${reference_url}${redirect_uri}`
      );
      if (response.status === 200) {
        window.location.href = response?.data?.redirect_url;
      }
    } catch (error) {
      console.log('WhatsappAuthenticationStepOne', error);
    }
  };

export const whatsappAuthenticationStepTwo = accessToken => async dispatch => {
  try {
    let response = await request.get(
      `/api/whatsapp_business_list?access_token=${accessToken}`
    );
    if (response.status === 200) {
      dispatch(updateWhatsAppBusinessList(response?.data?.data));
      dispatch(updatFbBusinessList(response?.data?.data))
    }
  } catch (error) {
    console.log('WhatsappAuthenticationStepOne', error);
  }
};

export const whatsappAuthenticationStepThree =
  (business_id, setLoading) => async (dispatch, getState) => {
    setLoading(true);
    const state = getState();
    const accessToken = selectors.getAccessToken(state);
    try {
      let response = await request.get(
        `/api/whatsapp_business_accounts?access_token=${accessToken?.access_token}&business_id=${business_id}`
      );
      if (response.status === 200) {
        dispatch(updateWhatsAppBusinessAccounts(response?.data?.data));
        setLoading(false);
      }
    } catch (error) {
      console.log('WhatsappAuthenticationStepOne', error);
    }
  };

export const whatsappAuthenticationStepFour =
  (business_account_id, setLoading) => async (dispatch, getState) => {
    setLoading(true);
    const state = getState();
    const accessToken = selectors.getAccessToken(state);
    try {
      let response = await request.get(
        `/api/whatsapp_business_numbers?access_token=${accessToken?.access_token}&business_account_id=${business_account_id}`
      );
      if (response.status === 200) {
        dispatch(updateWhatsAppAuthNumber(response?.data?.data));
        setLoading(false);
      }
    } catch (error) {
      console.log('WhatsappAuthenticationStepOne', error);
    }
  };

export const saveWhatsAppAuth =
  (data, setLoading) => async (dispatch, getState) => {
    setLoading(true);
    const state = getState();
    const accessToken = selectors.getAccessToken(state);
    try {
      let response = await request.post(
        `/api/save_whatsapp?state=${accessToken?.wp_state}`,
        data
      );
      if (response.status === 200) {
        notification.success({
          message: '',
          description: response.data.msg,
        });
        setLoading(false);
        dispatch(getSocialMediaList());
        window.location.href = response?.data?.reference_url;
      }
    } catch (error) {
      notification.warn({
        message: '',
        description: error?.response?.data?.error,
      });
      console.log('WhatsappAuthenticationStepOne', error);
    }
  };

// fb groub API

export const connectFBGroups = () => async (dispatch, getState) => {
  const state = getState(state);
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = `account_id=${accountInfo?.account?.id}`;
  const brand_id = `&brand_id=${brand?.id}`;
  const connection_name = '&connection_name=Facebook Groups';
  const reference_url = `&reference_url=${API_BASEURL}/integration`
  const redirect_uri = `&redirect_uri=${API_BASEURL}/facebook-groups-auth`

  try {
    let response = await request.get(
      `/api/fb_groups_signup?${account_id}${brand_id}${connection_name}${reference_url}${redirect_uri}`
    );
    if (response.status === 200) {
      window.location.href = response?.data?.redirect_url;
    }
  } catch (error) {
    console.log('fBGroupsStepOne', error);
  }
};

export const fetchFbGroupList = acessToken => async dispatch => {
  try {
    let response = await request.get(
      `/api/fb_groups_list?access_token=${acessToken}`
    );
    if (response) {
      dispatch(updatFbGroupList(response?.data?.group_list?.data));
    }
  } catch (error) {
    console.log('fetchFbGroupList', error);
  }
};

export const saveFbGroup = (fbGroupState, data) => async dispatch => {
  try {
    let response = await request.post(
      `/api/save_fb_groups?state=${fbGroupState}`,
      data
    );
    if (response.status === 200) {
      dispatch(getSocialMediaList());
      window.location.href = response?.data?.reference_url;
      notification.success({
        message: '',
        description: response.data.msg,
      });
    }
  } catch (error) {
    console.log('saveFbGroup', error);
    notification.warn({
      message: '',
      description: error?.response?.data?.error,
    });
  }
};

export const linkedinSignUp = () => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = `&account_id=${accountInfo?.account?.id}`;
  const brand_id = `&brand_id=${brand?.id}`;
  const connection_name = '&connection_name=Linkedin';
  const reference_url = `&reference_url=${API_BASEURL}/integration`

  try {
    let response = await request.get(
      `/api/linkedin_signup?${reference_url}${connection_name}${account_id}${brand_id}`
    );
    if (response.status === 200) {
      window.location.href = response?.data?.redirect_url;
      dispatch(updateLinkedinStep1(response?.data?.data));
    }
  } catch (error) {
    console.log('LinkedinStep1', error);
  }
};

export const linkedinPageSignUp = (obj) => async(dispatch,getState) => {
  try {
    let response = await request.get(
      `/api/linkedin_pages_signup?${obj.accountId}${obj.brandId}${obj.reference_url}${obj.connection_name}${obj.redirect_uri}`
    );
    if (response.status === 200) {
      window.location.href = response?.data?.redirect_url;
      dispatch(updateLinkedinPageStep1(response?.data?.data));
    }
  } catch (error) {
    console.log('LinkedinPageStep1', error);
  }
};
export const linkedinPagesList=()=>async(dispatch,getState)=>{
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = `account_id=${accountInfo?.account?.id}`;
  const brand_id = `&brand_id=${brand?.id}`;
  const connection_name = '&connection_name=Linkedin Pages';
  try{
    let response = await request.get(
      `/api/linkedin_pages?${account_id}${brand_id}${connection_name}`
    );
    if (response.status === 200) {
      dispatch(linkedinPageList(response?.data));
    }
  } catch (error) {
    console.log('linkedinPageList', error);
  }
}

export const linkedinPageSave = (details,navigate) => async(dispatch,getState) => {
  try {
    let response = await request.post(
      `/api/save_linkedin_pages`,details
    );
    if (response.status === 200) {
      dispatch(linkedinSaveOption(response?.data?.data));
      dispatch(getSocialMediaList(response?.data))
      navigate("/integration")
    }
  } catch (error) {
    console.log('linkedinPageSave', error);
  }
};
export const twitterSignUp = () => async(dispatch,getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = `account_id=${accountInfo?.account?.id}`;
  const brand_id = `&brand_id=${brand?.id}`;
  const connection_name = '&connection_name=Twitter';
  const reference_url = `&reference_url=${API_BASEURL}/integration`

  try {
    if (account_id && brand_id) {
      let response = await request.get(
        `/api/twitter_signup?${account_id}${brand_id}${reference_url}${connection_name}`
      );
      if (response.status === 200) {
        window.location.href = response?.data?.redirect_url;
        dispatch(updateTwitterSignup(response?.data?.data));
      }
    }
  } catch (error) {
    console.log('twitterSignup', error);
  }
};

export const pinterestSignUp = (obj) => async (dispatch, getState) => {
  try {
    let response = await request.get(
      `/api/pinterest_signup?${obj.accountId}${obj.brandId}${obj.reference_url}${obj.connection_name}${obj.redirect_uri}`
    );
    if (response.status === 200) {
      window.location.href = response?.data?.redirect_url;
      dispatch(updatePinterestSignup(response?.data?.data));
    }
  } catch (error) {
    console.log('pinterestSignup', error);
  }
};

export const youtubeSignUp = (obj) => async (dispatch, getState) => {
  try {
    let response = await request.get(
      `/api/youtube_signup?${obj.accountId}${obj.brandId}${obj.reference_url}${obj.connection_name}${obj.redirect_uri}`
    );
    if (response.status === 200) {
      window.location.href = response?.data?.redirect_url;
      dispatch(updateYoutubeSignup(response?.data?.data));
    }
  } catch (error) {
    console.log('youtubeSignup', error);
  }
};

export const youtubeChannelsList = () => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  const account_id = `&account_id=${accountInfo?.account?.id}`;
  const brand_id = `&brand_id=${brand?.id}`;
  const connection_name = '&connection_name=YouTube';
  try {
    let response = await request.get(
      `/api/list_youtube_channels?${account_id}${brand_id}${connection_name}`
    );
    if (response.status === 200) {
      dispatch(updateYoutubeChannels(response?.data));
    }
  } catch (error) {
    console.log('pinterestBoards', error);
  }
}

export const youtubeSave = (details, navigate) => async (dispatch, getState) => {
  try {
    let response = await request.post(
      `/api/save_youtube`, details
    );
    if (response.status === 200) {
      dispatch(updateYoutubeConnection(response?.data?.data));
      dispatch(getSocialMediaList(response?.data))
      navigate("/integration")
    }
  } catch (error) {
    console.log('youtubeSave', error);
  }
};

//fb Accounts list
export const fetchFbAccountsList = (accessToken,id) => async dispatch => {
  try {
    let response = await request.get(
      `/api/ad_accounts_list?access_token=${accessToken}&business_id=${id}`
    );
    if (response) {
      dispatch(updatFbAccountsList(response?.data));
    }
  } catch (error) {
    console.log('fetchFbAccountsList', error);
  }
};

//submit after choosing Ad account
export const AdSaveOption = (details, state,navigate) => async (dispatch, getState) => {
  try {
    let response = await request.post(
      `/api/save_ad_accounts?state=${state}`, details
    );
    if (response.status === 200) {
      dispatch(updateAdAccounts(response?.data?.data));
      dispatch(getSocialMediaList(response?.data))
      navigate("/integration")
    }
  } catch (error) {
    console.log('AdAccountSave', error);
  }
};
