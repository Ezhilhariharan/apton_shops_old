import request from '@utils/request';
import authSelector from '../../Auth/selectors';
import parentSelectors from '../../../selectors';

export const CONVERSATION_LIST = 'CONVERSATION_LIST';
export const CHAT_HISTORY = 'CHAT_HISTORY';
export const OVER_VIEW_STATUS = 'OVER_VIEW_STATUS';
export const BACK_PAGE = 'BACK_PAGE';
import { inboxListNumbers } from '../../Inbox/actions';

export const updateConversationList = list => ({
  type: CONVERSATION_LIST,
  list,
});

export const updateChatHistor = list => ({
  type: CHAT_HISTORY,
  list,
});

export const updateCampaginOverView = info => ({
  type: OVER_VIEW_STATUS,
  info,
});

export const backPage = info => ({
  type: BACK_PAGE,
  info,
});
// API

export const fetchConversationList =
  (campaginId, search, limit) => async dispatch => {
    try {
      let currentLimit = limit ? `&limit=${limit}` : '';
      let response = await request.get(
        `/api/conversation_list_numbers?campaign_id=${campaginId}&search=${search}${currentLimit}`
      );
      if (response.status === 200) {
        dispatch(updateConversationList(response?.data));
      }
    } catch (error) {
      console.log('fetchConversationList', error);
    }
  };

export const fetchChatHistory =
  (account, brand, receipentId, fromId) => async dispatch => {
    if ((receipentId, fromId)) {
      try {
        let response = await request.get(
          `/api/conversation_messages?account_id=${account}&brand_id=${brand}&receipent_id=${receipentId}&from=${fromId}`
        );
        if (response.status === 200) {
          dispatch(updateChatHistor(response?.data));
        }
      } catch (error) {
        console.log('fetchChatHistory', fetchChatHistory);
      }
    }
  };

export const sendwpMessage =
  (receipent_id, text, fromId, id, params, message, dynamicData) =>
  async (dispacth, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const data = {
      account_id: accountInfo?.account?.id,
      brand_id: brand?.id,
      receipent_id: Number(receipent_id),
      message_type: 'text',
      body_json: text?.message,
    };

    try {
      let response = await request.post(`/api/conversation_sent_message`, data);
      if (response.status === 200) {
        setTimeout(() => {
          dispacth(
            fetchChatHistory(
              accountInfo?.account?.id,
              brand?.id,
              receipent_id,
              fromId
            )
          );
          dispacth(inboxListNumbers(accountInfo?.account?.id, brand?.id, ''));
        }, 1000);
      }
    } catch (error) {
      console.log('sendwpMessage', error);
    }
  };

export const sendTemplatewpMessage =
  (receipent_id, fromId, id, dynamicData) => async (dispacth, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const data = {
      account_id: accountInfo?.account?.id,
      brand_id: brand?.id,
      receipent_id: Number(receipent_id),
      message_type: 'template',
      template_id: id,
    };
    Object.assign(data, dynamicData?.length > 0 && { body_json: dynamicData });
    // console.log(data);
    try {
      let response = await request.post(`/api/conversation_sent_message`, data);
      // console.log(response);
      if (response.status === 200) {
        setTimeout(() => {
          dispacth(
            fetchChatHistory(
              accountInfo?.account?.id,
              brand?.id,
              receipent_id,
              fromId
            )
          );
          dispacth(inboxListNumbers(accountInfo?.account?.id, brand?.id, ''));
        }, 1000);
      }
    } catch (error) {
      console.log('sendwpMessage', error);
    }
  };

export const fetchWpStatus = id => async dispatch => {
  try {
    let response = await request.get(
      `/api/wa_transcation_status?campaign_id=${id}`
    );
    if (response.status === 200) {
      dispatch(updateCampaginOverView(response?.data));
    }
  } catch (error) {
    console.log('fetchWpStatus', fetchChatHistory);
  }
};
