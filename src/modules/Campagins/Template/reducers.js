import {
  OVERVIEW_CARD_TEMPLATES,
  RETRIEVE_WHATSAPP_MESSAGE_TEMPLATE,
  UPDATE_MEDIA_URL,
  GET_SINGLE_TEMPLATE,
  GET_IMAGE_LOCAL_PATH,
  GET_LIST_OF_DRAFT,
  CREATE_TEMPLATE_FORM,
  UPLOADED_FILE,
  CREATE_TEMPLATE_FIELD,
  UPLOADED_LOCAL_FILE,
  HEADER_VARIABLE,
  BODY_VARIABLE,
  HEADER_RADIO_VALUE,
  UPLOADING_FILE_LOADER,
  TEMPLATE_NAME_SEARCH,
  EDIT_TEMPLATE_DATA,
  DISCARD_CHANGES,
  TEMPLATE_LOADER,
  TEMPLATE_CATEGORY,
} from './actions';

const initialState = {
  overviewTemplate: {},
  retrieveTemplate: [],
  mediaUrl: '',
  singleTemplate: '',
  localPath: '',
  listOfDraft: '',
  createTemplatePopup: false,
  uploadedFile: '',
  uploadedLocalFile: '',
  templateField: {
    header: '',
    body: '',
    footer: '',
    buttonText1: '',
    buttonText2: '',
    buttonMarketing: '',
    linkType: 'Static',
    linkName: '',
    link: '',
    phoneName: '',
    phoneNumber: '',
    phoneCountryCode: '+91',
    website_filed_checkbox: true,
    add_sample_url: '',
    phone_field_checkbox: false,
    addButtonValue: null,
  },
  headerVariable: [],
  bodyVariable: [],
  headerRadioValue: '',
  uploadingFileLoader: false,
  templateNameSearch: [],
  editTemplateData: {},
  discardChanges: false,
  loading: false,
  templateCategory: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OVERVIEW_CARD_TEMPLATES:
      return { ...state, overviewTemplate: action.overviewTemplate };
    case RETRIEVE_WHATSAPP_MESSAGE_TEMPLATE:
      return { ...state, retrieveTemplate: action.retrieveTemplate };
    case UPDATE_MEDIA_URL:
      return { ...state, mediaUrl: action.mediaUrl };
    case GET_SINGLE_TEMPLATE:
      return { ...state, singleTemplate: action.singleTemplate };
    case GET_IMAGE_LOCAL_PATH:
      return { ...state, localPath: action.localPath };
    case GET_LIST_OF_DRAFT:
      return { ...state, listOfDraft: action.listOfDraft };
    case CREATE_TEMPLATE_FORM:
      return { ...state, createTemplatePopup: action.props };
    case UPLOADED_FILE:
      return { ...state, uploadedFile: action.props };
    case CREATE_TEMPLATE_FIELD:
      return { ...state, templateField: action.props };
    case UPLOADED_LOCAL_FILE:
      return { ...state, uploadedLocalFile: action.props };
    case HEADER_VARIABLE:
      return { ...state, headerVariable: action.value };
    case BODY_VARIABLE:
      return { ...state, bodyVariable: action.value };
    case HEADER_RADIO_VALUE:
      return { ...state, headerRadioValue: action.props };
    case UPLOADING_FILE_LOADER:
      return { ...state, uploadingFileLoader: action.props };
    case TEMPLATE_NAME_SEARCH:
      return { ...state, templateNameSearch: action.props };
    case EDIT_TEMPLATE_DATA:
      return { ...state, editTemplateData: action.props };
    case DISCARD_CHANGES:
      return { ...state, discardChanges: action.props };
    case TEMPLATE_LOADER:
      return { ...state, loading: action.props };
    case TEMPLATE_CATEGORY:
      return { ...state, templateCategory: action.props };
    default:
      return state;
  }
};
