import request from '@utils/request';
import authSelector from '../Auth/selectors';
import parentSelectors from '../../selectors';
import socialMedialIntegration from './extendedSelectors';
import { updateMediaLoader } from './extendedAction';
import { platforms } from '../SocialMedia/components/index/StaticData';
import { pricingValidation } from '../Auth/actions';
export const FB_POST_PUBLISHED_LIST = 'FB_POST_PUBLISHED_LIST';
export const FB_POST_SCHEDULED_LIST = 'FB_POST_SCHEDULED_LIST';
export const FB_POST_FAILED_LIST = 'FB_POST_FAILED_LIST';
export const FB_SCHEDULED_POST = 'FB_SCHEDULED_POST';
export const FB_SCHEDULED_REEL = 'FB_SCHEDULED_REEL';
export const FILE_UPLOAD = 'FILE_UPLOAD';
export const INST_FILE_UPLOAD = 'INST_FILE_UPLOAD';
export const FB_INST_ACTION = 'FB_INST_ACTION';
export const FILE_UPLOAD_LOADER = 'FILE_UPLOAD_LOADER';
export const DYNAMIC_COMMENT = 'DYNAMIC_COMMENT';
export const LOADER = 'LOADER';
export const PINTEREST_BOARD_LIST = 'PINTEREST_BOARD_LIST';
export const NESTED_LINKDIN_COMMENT = 'NESTED_LINKDIN_COMMENT';
export const SOCIAL_MEDIA_COUNT = 'SOCIAL_MEDIA_COUNT';
export const UNSPLASH = 'UNSPLASH';
export const PRESEND = 'PRESEND';
export const BUTTON_STATE = 'BUTTON_STATE';
export const IMAGE_STATUS = 'IMAGE_STATUS';
export const SELECTED_ACCOUNTS = 'SELECTED_ACCOUNTS';

const { UNSPLASH_IMAGES } = process.env;

import { notification } from 'antd';

export const updateButtons = list => ({
  type: BUTTON_STATE,
  list,
});

export const updateFbPublishedList = list => ({
  type: FB_POST_PUBLISHED_LIST,
  list,
});
export const updateFbScheduledList = list => ({
  type: FB_POST_SCHEDULED_LIST,
  list,
});
export const updateFbFailedList = list => ({
  type: FB_POST_FAILED_LIST,
  list,
});
export const updateSchedulePost = value => ({
  type: FB_SCHEDULED_POST,
  value,
});
export const updateScheduleReel = value => ({
  type: FB_SCHEDULED_REEL,
  value,
});
export const updateFileUpload = fileUrl => ({
  type: FILE_UPLOAD,
  fileUrl,
});
export const updateInstSchedulePost = fileUrl => ({
  type: INST_FILE_UPLOAD,
  fileUrl,
});
export const updateFb_Inst_Actions = value => ({
  type: FB_INST_ACTION,
  value,
});
export const updateFileUploadLoader = value => ({
  type: FILE_UPLOAD_LOADER,
  value,
});
export const updateImageStatus = value => ({
  type: IMAGE_STATUS,
  value,
});
export const updateDynamicComment = value => ({
  type: DYNAMIC_COMMENT,
  value,
});
export const apiLoader = value => ({
  type: LOADER,
  value,
});
export const BoardListPinterest = value => ({
  type: PINTEREST_BOARD_LIST,
  value,
});
export const LinkdinNestedComment = value => ({
  type: NESTED_LINKDIN_COMMENT,
  value,
});
export const SocialMediaCount = value => ({
  type: SOCIAL_MEDIA_COUNT,
  value,
});
export const getUnsplashPics = image => ({
  type: UNSPLASH,
  image,
});
export const getPresendUrl = url => ({
  type: PRESEND,
  url,
});

export const getFbPublishedList =
  (data, page) => async (dispatch, getState) => {
    const isEmptyObject = data && Object.keys(data)?.length === 0;
    const state = getState();
    const selectedAccounts = socialMedialIntegration.getSelectedAccounts(state);
    if (!isEmptyObject) {
      let getId = [];
      data &&
        Object.entries(data)?.map(([key, value]) => {
          if (selectedAccounts?.length != 0) {
            selectedAccounts?.map(child => {
              child === value?.platform_name && getId.push(value?.platform_id);
            });
          } else {
            platforms?.map(child => {
              child === value?.platform_name && getId.push(value?.platform_id);
            });
          }
        });

      const accountInfo = authSelector.getCurentUser(state);
      const brand = parentSelectors.getSwitchedBrands(state);
      const account_id = `account_id=${accountInfo?.account?.id}`;
      const brand_id = `brand_id=${brand?.id}`;
      const Post_type = `post_type=PUBLISHED`;
      const connection_name = `connection_id=${getId?.join()}`;
      dispatch(apiLoader(true));
      try {
        let response = await request.get(
          `/api/post_list?${account_id}&${brand_id}&${Post_type}&${connection_name}&page=${
            page || 1
          }&limit=5`
        );
        if (response) {
          dispatch(apiLoader(false));
          dispatch(updateFbPublishedList(response?.data));
        }
      } catch (error) {
        console.log('FB-POST-PUBLISHED-LIST', error);
      }
    }
  };
export const facebookGroupPost =
  (
    account_id,
    brand_id,
    schedule_type,
    message,
    comment,
    connection_name,
    file,
    time,
    sheduleTime,
    savedComment,
    savedDelay
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let commonObj = {
      account_id: account_id,
      brand_id: brand_id,
      schedule_type: schedule_type,
      scheduling_time: sheduleTime,
      connection_name: connection_name,
    };
    let data = Object.assign(
      commonObj,
      message && { message: message },
      savedComment && comment && { comment: comment },
      file[0] && file?.length > 0 && { file_url: file },
      time && savedDelay && { is_delay_post: time }
    );
    try {
      let response = await request.post(`/api/fb_post_groups`, data);
      if (response.status === 200) {
        notification.success({
          message: '',
          description: response?.data.msg,
        });
        dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
      }
    } catch (error) {
      console.log('FB-POST-PUBLISHED-LIST', error);
      notification.warn({
        message: '',
        description: error.response?.data.error,
      });
      dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
    }
  };
export const getFbScheduledList =
  (data, page) => async (dispatch, getState) => {
    const state = getState();
    const selectedAccounts = socialMedialIntegration.getSelectedAccounts(state);
    const isEmptyObject = data && Object.keys(data)?.length === 0;
    if (!isEmptyObject) {
      let getId = [];
      data &&
        Object.entries(data)?.map(([key, value]) => {
          if (selectedAccounts?.length != 0) {
            selectedAccounts?.map(child => {
              child === value?.platform_name && getId.push(value?.platform_id);
            });
          } else {
            platforms?.map(child => {
              child === value?.platform_name && getId.push(value?.platform_id);
            });
          }
        });

      const accountInfo = authSelector.getCurentUser(state);
      const brand = parentSelectors.getSwitchedBrands(state);
      const account_id = `account_id=${accountInfo?.account?.id}`;
      const brand_id = `brand_id=${brand?.id}`;
      const Post_type = 'post_type=SCHEDULED';
      const connection_name = `connection_id=${getId?.join()}`;
      dispatch(apiLoader(true));
      try {
        let response = await request.get(
          `/api/post_list?${account_id}&${brand_id}&${Post_type}&${connection_name}&page=${
            page || 1
          }&limit=5`
        );
        if (response?.status === 200) {
          dispatch(apiLoader(false));
          dispatch(updateFbScheduledList(response?.data));
        }
      } catch (error) {
        console.log('FB-POST-SCHEDULED-LIST', error);
      }
    }
  };
export const getFbFailedList = (data, page) => async (dispatch, getState) => {
  const isEmptyObject = data && Object.keys(data)?.length === 0;
  dispatch(apiLoader(true));
  const state = getState();
  const selectedAccounts = socialMedialIntegration.getSelectedAccounts(state);
  if (!isEmptyObject) {
    // const convertArraty = [];
    // data &&
    //   Object.keys(data)?.forEach(key =>
    //     convertArraty.push(data[key]?.platform_id)
    //   );

    let getId = [];
    data &&
      Object.entries(data)?.map(([key, value]) => {
        if (selectedAccounts?.length != 0) {
          selectedAccounts?.map(child => {
            child === value?.platform_name && getId.push(value?.platform_id);
          });
        } else {
          platforms?.map(child => {
            child === value?.platform_name && getId.push(value?.platform_id);
          });
        }
      });

    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const account_id = `account_id=${accountInfo?.account?.id}`;
    const brand_id = `brand_id=${brand?.id}`;
    const Post_type = `post_type=FAILED`;
    const connection_name = `connection_id=${getId?.join()}`;
    try {
      let response = await request.get(
        `/api/post_list?${account_id}&${brand_id}&${Post_type}&${connection_name}&page=${
          page || 1
        }&limit=5`
      );
      if (response) {
        dispatch(apiLoader(false));
        dispatch(updateFbFailedList(response?.data));
      }
    } catch (error) {
      console.log('FB-POST-FAILED-LIST', error);
    }
  }
};
export const pinterestBoardList =
  (data, limit) => async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const account_id = `account_id=${accountInfo?.account?.id}`;
    const brand_id = `brand_id=${brand?.id}`;
    const connection_name = `connection_name=Pinterest`;
    try {
      let response = await request.get(
        `/api/list_pinterest_boards?${account_id}&${brand_id}&${connection_name}`
      );
      if (response) {
        // console.log("BoardListPinterest",response?.data);
        dispatch(BoardListPinterest(response?.data));
      }
    } catch (error) {
      console.log('pinterestBoardList', error);
    }
  };
export const linkdinNestedComment =
  (id, post_id, loading) => async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const account_id = `account_id=${accountInfo?.account?.id}`;
    const brand_id = `brand_id=${brand?.id}`;
    const commentId = `parent_comment_id=${id}`;
    const mediaId = `media_id=${post_id}`;
    loading && loading(true);
    try {
      let response = await request.get(
        `/api/linkedin/nested/comments?${account_id}&${brand_id}&${commentId}&${mediaId}`
      );
      if (response) {
        loading && loading(false);
        dispatch(LinkdinNestedComment(response?.data));
      }
    } catch (error) {
      console.log('linkdinNestedComment', error);
    }
  };
export const pinterestCreateBoard =
  (name, description, privacy, cancel, form) => async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let commonObj = {
      account_id: accountInfo?.account?.id,
      brand_id: brand?.id,
      connection_name: 'Pinterest',
    };
    let data = Object.assign(
      commonObj,
      name && { name: name },
      description && { description: description },
      privacy && { privacy: privacy }
    );
    try {
      let response = await request.post('/api/pin_new_board', data);
      if (response) {
        cancel();
        form.resetFields();
        notification.success({
          message: '',
          description: 'Created Successfully',
        });
        dispatch(pinterestBoardList(data));
      }
    } catch (error) {
      console.log('pinterestBoardList', error);
    }
  };

export const deleteShedulePost =
  (id, selectedAccount, platforms, tabName) => async (dispatch, getState) => {
    try {
      let response = await request.delete(`/api/delete_post/${id}`);
      if (response?.status == 200) {
        dispatch(updateButtons(tabName ? tabName : 'Scheduled'));
        window.location.reload();

        if (selectedAccount == '') {
          if (tabName == 'Published') {
            dispatch(getFbPublishedList(platforms));
          } else if (tabName == 'Failed') {
            dispatch(getFbFailedList(platforms));
          } else {
            dispatch(getFbScheduledList(platforms));
          }
        } else {
          if (tabName == 'Published') {
            dispatch(getFbPublishedList(selectedAccount));
          } else if (tabName == 'Failed') {
            dispatch(getFbFailedList(selectedAccount));
          } else {
            dispatch(getFbScheduledList(selectedAccount));
          }
        }
        setTimeout(() => {
          dispatch(getSocialMediaCount());
        }, 7000);
        notification.success({
          message: '',
          description: response?.data.msg,
        });
      }
    } catch (error) {
      console.log('deleteShedulePost', error);
    }
  };

export const fbInstaAction =
  (id, type, paging) => async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const account_id = `account_id=${accountInfo?.account?.id}`;
    const brand_id = `brand_id=${brand?.id}`;
    const social_media_post_detail_id = `social_media_post_detail_id=${id}`;
    const engagement = `engagement=${type}`;
    const after = paging ? `&after_paging=${paging}` : '';
    try {
      if (id && type) {
        let response = await request.get(
          `api/fb_and_instagram_like_and_comment?${account_id}&${brand_id}&${social_media_post_detail_id}&${engagement}${after}`
        );
        if (response.status === 200) {
          dispatch(
            updateFb_Inst_Actions(response?.data?.social_media_engagement)
          );
        }
      }
    } catch (error) {
      console.log('fbInstaLikeAndShare', error);
    }
  };

export const commentPostAPI =
  (data, id, type, selectedAccount, platforms) =>
  async (dispatch, getState) => {
    try {
      let response = await request.post('/api/post_comment_update', data);
      if (response.status === 200) {
        setTimeout(() => {
          dispatch(fbInstaAction(id, type));
        }, 5000);
        if (selectedAccount == '' || selectedAccount == undefined) {
          setTimeout(() => {
            dispatch(getFbPublishedList(platforms));
          }, 5000);
        } else {
          setTimeout(() => {
            dispatch(getFbPublishedList(selectedAccount));
          }, 75000);
        }
      }
    } catch (error) {
      console.log('commentPost', error);
    }
  };
export const commentLinkdinPost =
  (payload, id, type, selectedAccount, platforms) =>
  async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let Obj = {
      account_id: accountInfo?.account?.id,
      brand_id: brand?.id,
    };
    let data = Object.assign(Obj, payload);
    try {
      let response = await request.post('/api/linkedin/comment/create', data);
      if (response.status === 200) {
        setTimeout(() => {
          dispatch(fbInstaAction(id, type));
        }, 5000);
        if (selectedAccount == '' || selectedAccount == undefined) {
          setTimeout(() => {
            dispatch(getFbPublishedList(platforms));
          }, 5000);
        } else {
          setTimeout(() => {
            dispatch(getFbPublishedList(selectedAccount));
          }, 75000);
        }
      }
    } catch (error) {
      console.log('commentPost', error);
    }
  };

export const getSocialMediaCount = () => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);

  const account_id = `account_id=${accountInfo?.account?.id}`;
  const brand_id = `brand_id=${brand?.id}`;
  try {
    let response = await request.get(
      `/api/social_media_count?${account_id}&${brand_id}`
    );
    if (response.status == 200) {
      dispatch(SocialMediaCount(response?.data));
    }
  } catch (error) {
    console.log('getSocialMediaCount', error);
  }
};

export const setActivePost = postType => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  let body = {
    account_id: accountInfo?.account?.id,
    brand_id: brand?.id,
    post_type: postType,
  };
  try {
    let response = await request.put(`/api/update_media_status`, body);
    if (response.status == 200) {
      dispatch(getSocialMediaCount());
    }
  } catch (error) {
    console.log('setActivePost', error);
  }
};

export const pinterestPost =
  (
    account_id,
    brand_id,
    schedule_type,
    message,
    connection_name,
    file,
    time,
    sheduleTime,
    savedDelay,
    title,
    selectedBoard,
    destinationLink
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const boardId = socialMedialIntegration.getBoardlList(state);

    let commonObj = {
      account_id: account_id,
      brand_id: brand_id,
      schedule_type: schedule_type,
      scheduling_time: sheduleTime,
      connection_name: connection_name,
    };
    let data = Object.assign(
      commonObj,
      message && { message: message },
      file[0] && file?.length > 0 && { file_url: file?.slice(0, 5) },
      time && savedDelay && { is_delay_post: time },
      title && { title: title },
      destinationLink && { link: destinationLink },
      selectedBoard.length > 0
        ? { board_id: selectedBoard }
        : { board_id: boardId[0]?.value }
    );
    try {
      let response = await request.post(`/api/pinterest_media`, data);
      if (response.status == 200) {
        dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
        setTimeout(() => {
          dispatch(getSocialMediaCount());
        }, 7000);
        notification.success({
          message: '',
          description:
            'Posted successfully for default selected board in pinterest',
        });
      }
    } catch (error) {
      console.log('FB-SCHEDULED-POST', error);
      notification.warn({
        message: '',
        description: error.response?.data.error,
      });
      dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
    }
  };
export const fbschedulePost =
  (
    account_id,
    brand_id,
    schedule_type,
    message,
    comment,
    connection_name,
    file,
    time,
    sheduleTime,
    savedComment,
    savedDelay
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let commonObj = {
      account_id: account_id,
      brand_id: brand_id,
      schedule_type: schedule_type,
      scheduling_time: sheduleTime,
      connection_name: connection_name,
    };
    let data = Object.assign(
      commonObj,
      message && { message: message },
      savedComment && comment && { comment: comment },
      file[0] && file?.length > 0 && { file_url: file },
      time && savedDelay && { is_delay_post: time }
    );
    try {
      let response = await request.post(`/api/schedule_post`, data);
      if (response.status === 200) {
        dispatch(updateSchedulePost(response?.data));
        dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
        setTimeout(() => {
          dispatch(getSocialMediaCount());
        }, 7000);
        notification.success({
          message: '',
          description: response?.data.msg,
        });
      }
    } catch (error) {
      console.log('FB-SCHEDULED-POST', error);
      notification.warn({
        message: '',
        description: error.response?.data.error,
      });
      dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
    }
  };
export const instschedulePost =
  (
    account_id,
    brand_id,
    schedule_type,
    message,
    comment,
    connection_name,
    file,
    time,
    sheduleTime,
    savedComment,
    savedDelay
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let commonObj = {
      account_id: account_id,
      brand_id: brand_id,
      schedule_type: schedule_type,
      scheduling_time: sheduleTime,
      connection_name: connection_name,
    };
    let data = Object.assign(
      commonObj,
      message && { message: message },
      savedComment && comment && { comment: comment },
      file[0] && file?.length > 0 && { file_url: file?.slice(0, 10) },
      time && savedDelay && { is_delay_post: time }
    );
    try {
      let response = await request.post(`/api/instagram_post_and_reel`, data);
      if (response.status === 200) {
        dispatch(updateInstSchedulePost(response?.data));
        dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
        setTimeout(() => {
          dispatch(getSocialMediaCount());
        }, 7000);
        notification.success({
          message: '',
          description: response?.data.msg,
        });
      }
    } catch (error) {
      notification.warn({
        message: '',
        description: error.response?.data.error,
      });
      dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
    }
  };
export const linkdinPost =
  (
    account_id,
    brand_id,
    schedule_type,
    message,
    comment,
    connection_name,
    file,
    time,
    sheduleTime,
    savedComment,
    savedDelay
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let commonObj = {
      account_id: account_id,
      brand_id: brand_id,
      schedule_type: schedule_type,
      scheduling_time: sheduleTime,
      connection_name: connection_name,
    };
    let data = Object.assign(
      commonObj,
      message && { message: message },
      savedComment && comment && { comment: comment },
      file[0] && file?.length > 0 && { file_url: file?.slice(0, 9) },
      time && savedDelay && { is_delay_post: time }
    );
    try {
      let response = await request.post(`/api/linkedin_page_post`, data);
      if (response.status === 200) {
        dispatch(updateInstSchedulePost(response?.data));
        dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
        setTimeout(() => {
          dispatch(getSocialMediaCount());
        }, 7000);
        notification.success({
          message: '',
          description: response?.data.msg,
        });
      }
    } catch (error) {
      notification.warn({
        message: '',
        description: error.response?.data.error,
      });
      dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
    }
  };
export const twitterPost =
  (
    account_id,
    brand_id,
    schedule_type,
    message,
    comment,
    connection_name,
    file,
    time,
    sheduleTime,
    savedComment,
    savedDelay
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let commonObj = {
      account_id: account_id,
      brand_id: brand_id,
      schedule_type: schedule_type,
      scheduling_time: sheduleTime,
      connection_name: connection_name,
    };
    let data = Object.assign(
      commonObj,
      message && { message: message },
      savedComment && comment && { comment: comment },
      file[0] && file?.length > 0 && { file_url: file?.slice(0, 4) },
      time && savedDelay && { is_delay_post: time }
    );
    try {
      let response = await request.post(`/api/twitter_post`, data);
      if (response.status === 200) {
        dispatch(updateInstSchedulePost(response?.data));
        dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
        setTimeout(() => {
          dispatch(getSocialMediaCount());
        }, 7000);
        notification.success({
          message: '',
          description: response?.data.msg,
        });
      }
    } catch (error) {
      notification.warn({
        message: '',
        description: error.response?.data.error,
      });
      dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
    }
  };
export const commentPost =
  (feedDiscription, data) => async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const Data = {
      message: feedDiscription,
      media_id: data,
      account_id: accountInfo?.account?.id,
      brand_id: brand?.id,
    };
    try {
      let response = await request.post(`/api/post_comment`, Data);
      if (response.status === 200) {
        notification.success({
          message: '',
          description: response?.data.msg,
        });
      }
    } catch (error) {
      notification.warn({
        message: '',
        description: error.response?.data.error,
      });
      console.log('FB-commentPost-POST', error);
    }
  };
export const editFacebook =
  (
    id,
    selectedAccount,
    connection_name,
    message,
    type,
    file,
    scheduleTime,
    title,
    link,
    board_id
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const platforms = socialMedialIntegration.getAvailableplatforms(state);
    let common = {
      connection_name: connection_name,
      message: message,
      schedule_type: type,
      scheduling_time: scheduleTime,
    };
    let data = Object.assign(
      common,
      title && { title: title },
      link && { link: link },
      file && file?.length > 0 && { file_url: file },
      board_id && { board_id: board_id }
    );
    try {
      let response = await request.put(`/api/update_post/${id}`, data);
      if (response.status === 200) {
        notification.success({
          message: '',
          description: response?.data.msg,
        });
        if (selectedAccount == '' || selectedAccount == undefined) {
          setTimeout(() => {
            dispatch(getFbScheduledList(platforms));
          }, 2000);
        } else {
          setTimeout(() => {
            dispatch(getFbScheduledList(platforms));
          }, 3000);
        }
        setTimeout(() => {
          dispatch(getSocialMediaCount());
        }, 3000);
      }
    } catch (error) {
      notification.warn({
        message: '',
        description: error.response?.data.error,
      });
      console.log('FB-commentPost-POST', error);
    }
  };
export const instagramReel =
  (
    account_id,
    brand_id,
    schedule_type,
    message,
    comment,
    connection_name,
    file,
    time,
    sheduleTime,
    savedComment,
    savedDelay
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let commonObj = {
      account_id: account_id,
      brand_id: brand_id,
      schedule_type: schedule_type,
      scheduling_time: sheduleTime,
      connection_name: connection_name,
    };
    let data = Object.assign(
      commonObj,
      message && { message: message },
      comment && savedComment && { comment: comment },
      file[0] && file?.length > 0 && { file_url: file },
      time && savedDelay && { is_delay_post: time }
    );
    try {
      let response = await request.post(`/api/instagram_post_and_reel`, data);
      if (response.status === 200) {
        notification.success({
          message: '',
          description: response?.data.msg,
        });
        // dispatch(updateScheduleReel(response?.data));
        dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
      }
    } catch (error) {
      console.log('FB-REEL', error);
      notification.warn({
        message: '',
        description: error.response?.data.error,
      });
      dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
    }
  };
export const fbscheduleReel =
  (
    account_id,
    brand_id,
    schedule_type,
    message,
    comment,
    connection_name,
    file,
    time,
    sheduleTime,
    savedComment,
    savedDelay
  ) =>
  async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    let commonObj = {
      account_id: account_id,
      brand_id: brand_id,
      schedule_type: schedule_type,
      scheduling_time: sheduleTime,
      connection_name: connection_name,
    };
    let data = Object.assign(
      commonObj,
      message && { message: message },
      comment && savedComment && { comment: comment },
      file[0] && file?.length > 0 && { file_url: file },
      time && savedDelay && { is_delay_post: time }
    );
    try {
      let response = await request.post(`/api/schedule_reel`, data);
      if (response.status === 200) {
        notification.success({
          message: '',
          description: response?.data.msg,
        });
      }
      dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
    } catch (error) {
      console.log('INSTA-REEL', error);
      notification.warn({
        message: '',
        description: error.response?.data.error,
      });
      dispatch(pricingValidation(accountInfo?.account?.id, brand?.id));
    }
  };

export const Unsplash = (val, page) => async dispatch => {
  const num = page ? 1 : page;
  const url = !val
    ? `https://api.unsplash.com/photos?page=${num}&per_page=30&order_by=latest`
    : `https://api.unsplash.com/search/photos?query=${val}&per_page=30&page=${
        num || 1
      }`;
  try {
    let response = await request.get(url, {
      headers: { Authorization: UNSPLASH_IMAGES },
    });
    if (response.status === 200) {
      dispatch(getUnsplashPics(response?.data));
    }
  } catch {
    console.log('unspalasherror', error);
  }
};
export const preSendURl = (body, type, obj) => async dispatch => {
  const fileType = type === 'mp4' ? 'video' : 'image';
  dispatch(updateFileUploadLoader(true));
  dispatch(updateImageStatus('error'));

  if (body && type) {
    try {
      let response = await request.get(
        `/api/presigned_url?file_name=${body?.file_name}&file_type=${fileType}`
      );
      if (response?.status === 200) {
        const data = {
          url: response?.data?.url?.split('?').shift(),
          id: obj?.lastModifiedSet,
        };
        dispatch(getPresendUrl(data));
        dispatch(getUrl(response?.data?.url, obj, fileType, type));
      }
    } catch (error) {
      dispatch(updateImageStatus('done'));
      console.log('error', error);
    }
  }
};
export const getUrl = (url, file, filetype, extention) => async dispatch => {
  const type =
    extention === 'jpg' || extention === 'jpeg'
      ? 'image/jpeg'
      : extention === 'png'
      ? 'image/png'
      : 'video/mp4';
  if (url && file) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': type,
        },
        body: file,
      });

      if (response.status === 200) {
        dispatch(updateFileUploadLoader(false));
        dispatch(updateImageStatus('done'));
        dispatch(updateMediaLoader(false));
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};
