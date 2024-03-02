import request from '@utils/request';
import { notification } from 'antd';
import authSelector from '../../Auth/selectors';
import parentSelectors from '../../../selectors';
export const OVERVIEW_CARD_TEMPLATES = 'OVERVIEW_CARD_TEMPLATES';
export const RETRIEVE_WHATSAPP_MESSAGE_TEMPLATE =
  'RETRIEVE_WHATSAPP_MESSAGE_TEMPLATE';
export const UPDATE_MEDIA_URL = 'UPDATE_MEDIA_URL';
export const GET_SINGLE_TEMPLATE = 'GET_SINGLE_TEMPLATE';
export const GET_IMAGE_LOCAL_PATH = 'GET_IMAGE_LOCAL_PATH';
export const GET_LIST_OF_DRAFT = 'GET_LIST_OF_DRAFT';
export const CREATE_TEMPLATE_FORM = 'CREATE_TEMPLATE_FORM';
export const UPLOADED_FILE = 'UPLOADED_FILE';
export const CREATE_TEMPLATE_FIELD = 'CREATE_TEMPLATE_FIELD';
export const UPLOADED_LOCAL_FILE = 'UPLOADED_LOCAL_FILE';
export const HEADER_VARIABLE = 'HEADER_VARIABLE';
export const BODY_VARIABLE = 'BODY_VARIABLE';
export const HEADER_RADIO_VALUE = 'HEADER_RADIO_VALUE';
export const UPLOADING_FILE_LOADER = 'UPLOADING_FILE_LOADER';
export const TEMPLATE_NAME_SEARCH = 'TEMPLATE_NAME_SEARCH';
export const EDIT_TEMPLATE_DATA = 'EDIT_TEMPLATE_DATA';
export const DISCARD_CHANGES = 'DISCARD_CHANGES';
export const TEMPLATE_LOADER = 'TEMPLATE_LOADER';
export const TEMPLATE_CATEGORY = 'TEMPLATE_CATEGORY';

export const updateOverviewCardTemplate = overviewTemplate => ({
  type: OVERVIEW_CARD_TEMPLATES,
  overviewTemplate,
});

export const updateLoader = props => ({
  type: TEMPLATE_LOADER,
  props,
});

export const updateTemplateCategory = props => ({
  type: TEMPLATE_CATEGORY,
  props,
});

export const updateEditTemplate = props => ({
  type: EDIT_TEMPLATE_DATA,
  props,
});

export const discardEditChanges = props => ({
  type: DISCARD_CHANGES,
  props,
});

export const updateTemplateName = props => ({
  type: TEMPLATE_NAME_SEARCH,
  props,
});

export const updateRetrieveTemplate = retrieveTemplate => ({
  type: RETRIEVE_WHATSAPP_MESSAGE_TEMPLATE,
  retrieveTemplate,
});

export const updateMediaUrl = mediaUrl => ({
  type: UPDATE_MEDIA_URL,
  mediaUrl,
});

export const updateSingleTemplate = singleTemplate => ({
  type: GET_SINGLE_TEMPLATE,
  singleTemplate,
});

export const updateImageLocalPath = localPath => ({
  type: GET_IMAGE_LOCAL_PATH,
  localPath,
});

export const updateListOfDraft = listOfDraft => ({
  type: GET_LIST_OF_DRAFT,
  listOfDraft,
});

export const createTemplatePopup = props => ({
  type: CREATE_TEMPLATE_FORM,
  props,
});

export const updateFileLoader = props => ({
  type: UPLOADING_FILE_LOADER,
  props,
});

export const uploadFile = props => ({
  type: UPLOADED_FILE,
  props,
});
export const uploadLocalFile = props => ({
  type: UPLOADED_LOCAL_FILE,
  props,
});

export const uploadTemplateForm = props => ({
  type: CREATE_TEMPLATE_FIELD,
  props,
});

export const updateRadioValue = props => ({
  type: HEADER_RADIO_VALUE,
  props,
});

// update header variable
export const updateHeaderVariable = value => ({
  type: HEADER_VARIABLE,
  value,
});

// update body variable
export const updateBodyVariable = value => ({
  type: BODY_VARIABLE,
  value,
});

export const getOverviewCardTemplate = () => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  try {
    const overViewCardTemplate = await request.get(
      `/api/templates_overview?account_id=${accountInfo?.account?.id}&brand_id=${brand?.id}`
    );
    if (overViewCardTemplate.status === 200) {
      dispatch(updateOverviewCardTemplate(overViewCardTemplate.data));
    }
  } catch (error) {
    console.log('overview card template', error.response.status);
    dispatch(updateOverviewCardTemplate([]));
  }
};

export const retrieveWhatsappMessageTemplates =
  (accountId, brandId, status, selectedCategory, search, page) =>
  async dispatch => {
    dispatch(updateLoader(true));
    try {
      if ((accountId, brandId)) {
        const account_id = accountId && `account_id=${accountId}`;
        const brand_id = brandId && `brand_id=${brandId}`;
        const status_obtained =
          status && status !== 'All' ? `&status=${status?.toUpperCase()}` : '';
        const categoryFiltered =
          selectedCategory && selectedCategory !== 'ALL'
            ? `&category=${selectedCategory}`
            : '';
        const searchByName = search ? `&name=${search}` : '';
        const pageNumber = page ? `&page=${page}` : `&page=1`;

        const retrieveWhatsappTemplate = await request.get(
          `/api/list_wa_template?${account_id}&${brand_id}${status_obtained}${categoryFiltered}${searchByName}${pageNumber}&limit=10`
        );
        dispatch(updateLoader(false));
        if (retrieveWhatsappTemplate.status === 200) {
          dispatch(updateRetrieveTemplate(retrieveWhatsappTemplate.data));
        }
      }
    } catch (error) {
      console.log('retrieve whatsapp message template', error);
      dispatch(updateRetrieveTemplate({}));
      dispatch(updateLoader(false));
    }
  };

export const templateNameSearch =
  (accountId, brandId, search) => async dispatch => {
    try {
      if ((accountId, brandId)) {
        const account_id = accountId && `account_id=${accountId}`;
        const brand_id = brandId && `brand_id=${brandId}`;
        // const status_obtained =
        //   status && status !== 'All' ? `&status=${status?.toUpperCase()}` : '';
        // const categoryFiltered =
        //   selectedCategory && selectedCategory !== 'ALL'
        //     ? `&category=${selectedCategory}`
        //     : '';
        const searchByName = search ? `&name=${search}` : '';
        const retrieveWhatsappTemplate = await request.get(
          `/api/list_wa_template?${account_id}&${brand_id}${searchByName}`
        );

        if (retrieveWhatsappTemplate.status === 200) {
          dispatch(updateTemplateName(retrieveWhatsappTemplate.data));
        }
      }
    } catch (error) {
      console.log('retrieve whatsapp message template', error);
      dispatch(updateTemplateName([]));
    }
  };

export const createWhatsappTemplate =
  (
    value,
    onCancel
    // setCreateTemplate,
    // setOpen,
    // form,
    // draft,
    // type,
    // setPageNumber,
    // setSelelctedCategory,
    // setSearch,
    // setFilterByStatus
  ) =>
  async dispatch => {
    dispatch(updateLoader(true));
    try {
      const createTemplate = await request.post(
        `/api/create_wa_template`,
        value
      );
      if (createTemplate?.status == 200) {
        notification.success({
          description: createTemplate?.data?.message,
        });
        dispatch(createTemplatePopup(false));
        onCancel();
        dispatch(updateLoader(false));
      }
      // if (createTemplate?.data?.response?.code == 200) {
      //   setCreateTemplate(false);
      setTimeout(() => {
        dispatch(
          retrieveWhatsappMessageTemplates(
            value?.account_id,
            value?.brand_id,
            null,
            null,
            null
          )
        );
      }, 1000);

      //   dispatch(getOverviewCardTemplate(value?.account_id, value?.brand_id));
      //   setOpen && setOpen(false);
      //   if (type) {
      //     if (type === 'DRAFT') {
      //       dispatch(getListOfDrafts());
      //       setPageNumber(1);
      //     }
      //   }
      //   setSelelctedCategory && setSelelctedCategory('ALL');
      //   setSearch && setSearch('');
      //   setFilterByStatus && setFilterByStatus('All');
      //   form.resetFields();
      //   notification.success({
      //     description: 'Template created successfully',
      //   });
      //   dispatch(updateSingleTemplate(''));
      // }
      // if (draft) {
      //   dispatch(getOverviewCardTemplate(value?.account_id, value?.brand_id));
      //   dispatch(getListOfDrafts());
      //   dispatch(updateImageLocalPath(''));
      //   setCreateTemplate(false);
      //   notification.success({
      //     description: 'Template saved as draft',
      //   });
      //   form.resetFields();
      //   dispatch(updateSingleTemplate(''));
      //   setPageNumber(1);
      // }
      // if (createTemplate?.data?.response?.data?.error) {
      //   notification.warning({
      //     description: `${createTemplate?.data?.response?.data?.error?.error_user_msg}`,
      //   });
      // }
    } catch (error) {
      dispatch(updateLoader(false));
      notification.warning({
        description: `${error?.message}`,
      });
    }
  };

export const mediaUpload = value => async dispatch => {
  try {
    if (value?.file_name && value?.file_path && value?.file_type) {
      const mediaUrl = await request.post(`/api/upload_media_template`, value);
      if (mediaUrl.status === 200) {
        if (mediaUrl?.data?.response?.h) {
          dispatch(updateMediaUrl(mediaUrl?.data?.response?.h));
        }
      }
    }
  } catch (error) {
    console.log('media upload in template form', error);
  }
};

export const editWhatsappTemplate =
  (
    value,
    setCreateTemplate,
    setOpen,
    form,
    setSelelctedCategory,
    setSearch,
    setFilterByStatus
  ) =>
  async dispatch => {
    try {
      const editTemplate = await request.post(`/api/edit_wa_template`, value);
      if (editTemplate?.data?.response?.code == 200) {
        setCreateTemplate(false);
        notification.success({
          description: 'Template changed successfully',
        });
        dispatch(
          retrieveWhatsappMessageTemplates(value?.account_id, value?.brand_id)
        );
        dispatch(getOverviewCardTemplate(value?.account_id, value?.brand_id));
        setOpen && setOpen(false);
        setSelelctedCategory && setSelelctedCategory('ALL');
        setSearch && setSearch('');
        setFilterByStatus && setFilterByStatus('All');
        form.resetFields();
        dispatch(updateSingleTemplate(''));
      }
      if (editTemplate?.data?.response?.data?.error) {
        notification.warning({
          description: `${editTemplate?.data?.response?.data?.error?.error_user_msg}`,
        });
      }
    } catch (error) {
      console.log('edit template', error);
    }
  };

export const getSingleTemplateOnEdit =
  (id, accountId, brandId) => async dispatch => {
    try {
      if (id && accountId && brandId) {
        const singleTemplate =
          // draft
          //   ?
          // await request.get(
          //   `api/get_draft_template?template_id=${parseInt(
          //     id
          //   )}&brand_id=${brandId}&account_id=${accountId}`
          // );
          // :
          await request.get(
            `/api/retrive_wa_template?template_id=${parseInt(
              id
            )}&account_id=${accountId}&brand_id=${brandId}`
          );
        // if (singleTemplate?.status === 200) {
        //   dispatch(
        //     updateSingleTemplate(
        //       draft
        //         ? singleTemplate?.data?.draft_template
        //         : singleTemplate?.data?.response?.data
        //     )
        //   );
        // }
      }
    } catch (error) {
      console.log('single template', error);
    }
  };

export const deleteWhatsappTemplate =
  (templateName, accountId, brandId) => async dispatch => {
    try {
      const deleteTemplate = await request.delete(
        `/api/delete_wa_template?template_name=${templateName}&account_id=${accountId}&brand_id=${brandId}`
      );
      if (deleteTemplate?.status === 200) {
        notification.success({
          message: deleteTemplate?.data?.response,
        });
        dispatch(retrieveWhatsappMessageTemplates(accountId, brandId));
        dispatch(getOverviewCardTemplate(accountId, brandId));
      }
    } catch (error) {
      console.log('delete template', error);
    }
  };

export const getFileLocalPath = (filePath, fileName) => async dispatch => {
  try {
    const fileLocalPath = await request.post(`/api/file_upload`, {
      file_name: fileName,
      file_path: filePath,
    });
    if (fileLocalPath?.status === 200) {
      dispatch(updateImageLocalPath(fileLocalPath?.data));
    }
  } catch (error) {
    console.log('get file local path', error);
  }
};

export const removeSingleTemplateOnEdit = () => async dispatch => {
  dispatch(updateSingleTemplate(''));
};

//exit this code
export const getListOfDrafts =
  (page, limit, category, searchQuery) => async (dispatch, getState) => {
    const state = getState();
    const accountInfo = authSelector.getCurentUser(state);
    const brand = parentSelectors.getSwitchedBrands(state);
    const pageNumber = page ? `&page=${page}` : '';
    const limitNumber = limit ? `&limit=${limit}` : '';
    const categorySearch =
      category && category !== 'ALL' ? `&category=${category}` : '';
    const searchTerm = searchQuery ? `&name=${searchQuery}` : '';
    // try {
    //   const listOfDraft = await request.get(
    //     `api/list_draft_template?brand_id=${brand?.id}&account_id=${accountInfo?.account?.id}${pageNumber}${limitNumber}${categorySearch}${searchTerm}`
    //   );
    //   if (listOfDraft?.status === 200) {
    //     dispatch(updateListOfDraft(listOfDraft.data));
    //   }
    // } catch (error) {
    //   console.log('list of draft', error);
    //   if (error?.response?.data?.error === 'There is no draft Template') {
    //     dispatch(updateListOfDraft([]));
    //   }
    // }
  };

export const deleteDraft = templateId => async (dispatch, getState) => {
  const state = getState();
  const accountInfo = authSelector.getCurentUser(state);
  const brand = parentSelectors.getSwitchedBrands(state);
  try {
    const deleteDraftTemplate = await request.delete(
      `/api/delete_draft_template?account_id=${accountInfo?.account?.id}&brand_id=${brand?.id}&template_id=${templateId}`
    );
    if (deleteDraftTemplate.status === 200) {
      notification.success({
        description: 'Template draft deleted',
      });
      dispatch(getListOfDrafts());
      dispatch(getOverviewCardTemplate());
    }
  } catch (error) {
    console.log(error, 'delete draft template');
    notification.warning({
      description: `${error?.message}`,
    });
  }
};

export const retrieveMessageTemplateNextPage = next => async dispatch => {
  try {
    const nextPage = next && (await request.get(next));
    if (nextPage?.status === 200) {
      dispatch(updateRetrieveTemplate(nextPage?.data));
    }
  } catch (error) {
    console.log('next page', error);
    dispatch(updateRetrieveTemplate({}));
  }
};

export const retrieveMessageTemplatePreviousPage =
  previous => async dispatch => {
    try {
      const previousPage = previous && (await request.get(previous));
      if (previousPage?.status === 200) {
        dispatch(updateRetrieveTemplate(previousPage?.data));
      }
    } catch (error) {
      console.log('previous page', error);
      dispatch(updateRetrieveTemplate({}));
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
    dispatch(updateFileLoader(true));
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
        dispatch(updateFileLoader(false));
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};
