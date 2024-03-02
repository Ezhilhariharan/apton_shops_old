import request from '@utils/request';
import authSelector from '../../modules/Auth/selectors';
import parentSelectors from '../../selectors';

export const LIST_INBOX_NUMBER = 'LIST_INBOX_NUMBER';
export const CONVERSATION_STATUS = 'CONVERSATION_STATUS';
export const UPLOADED_FILE = 'UPLOADED_FILE';

export const updateInboxList = details => ({
  type: LIST_INBOX_NUMBER,
  details,
});
export const updateConversationStatus = details => ({
  type: CONVERSATION_STATUS,
  details,
});
export const uploadFile = props => ({
  type: UPLOADED_FILE,
  props,
});

export const inboxListNumbers =
  (accountId, brandId, searchValue) => async dispacth => {
    const value = searchValue === undefined ? ' ' : searchValue;
    try {
      // let currentLimit = limit ? `&limit=${limit}` : "";
      let response = await request.get(
        `/api/inbox_list_numbers?account_id=${accountId}&brand_id=${brandId}&search=${value}&limit=30`
      );
      if (response.status === 200) {
        dispacth(updateInboxList(response?.data));
      }
    } catch (error) {
      console.log('inboxList', error);
    }
  };

export const toggleConvesatation =
  (account, brand, from, to, status) => async dispatch => {
    try {
      const response = await request.put(`api/toggle_conversation`, {
        account_id: account,
        brand_id: brand,
        to: to,
        from: from,
        status: status,
      });
      if (response.status === 200) {
        dispatch(updateConversationStatus(response?.data));
      }
    } catch {
      console.log('toggleConversation', error);
    }
  };
export const preSendURl = (body, type, obj) => async dispatch => {
  let fileType = '';
  switch (type) {
    case 'mp4':
      fileType = 'video';
      break;
    case 'png':
      fileType = 'image';
      break;
    case 'jpg':
      fileType = 'image';
      break;
    case 'jpeg':
      fileType = 'image';
      break;
    case 'pdf':
      fileType = 'document';
      break;
    default:
      fileType = null;
  }
  if (body && type) {
    try {
      let response = await request.get(
        `/api/presigned_url?file_name=${body?.file_name}&file_type=${fileType}`
      );
      if (response?.status === 200) {
        dispatch(uploadFile(response?.data?.url?.split('?').shift()));
        dispatch(getUrl(response?.data?.url, obj, type));
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};
export const getUrl = (url, file, extension) => async dispatch => {
  let fileType = '';
  switch (extension) {
    case 'mp4':
      fileType = 'video/mp4';
      break;
    case 'png':
      fileType = 'image/png';
      break;
    case 'jpg':
      fileType = 'image/jpeg';
      break;
    case 'jpeg':
      fileType = 'image/jpeg';
      break;
    case 'pdf':
      fileType = 'application/pdf';
      break;
    default:
      fileType = null;
  }
  if (url && file) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': fileType,
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
