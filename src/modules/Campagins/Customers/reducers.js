import { 
    UPDATE_CUSTOMER_CONTACT_LIST,
    UPDATE_SINGLE_CONTACT_DETAILS,
    UPDATE_EXPORT_CONTACT_FILE,
    UPDATE_UPLOADED_FILE_INFO,
    UPDATE_ERROR_FILE_UPLOAD,
    UPDATE_TAGS,
    UPDATE_PREVIEW_DETAILS,
} from "./actions";

const initialState = {
    contacts: "",
    contactDetails: {},
    contactFile: {},
    fileInfo: "",
    fileError: "",
    tags: [],
    previewDetails: {},
}

export default (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_CUSTOMER_CONTACT_LIST:
            return {...state, contacts: action.contacts}
        case UPDATE_SINGLE_CONTACT_DETAILS:
            return {...state, contactDetails: action.contactDetails}
        case UPDATE_EXPORT_CONTACT_FILE:
            return {...state, contactFile: action.contactFile}
        case UPDATE_UPLOADED_FILE_INFO:
            return {...state, fileInfo: action.fileInfo}
        case UPDATE_ERROR_FILE_UPLOAD:
            return {...state, fileError: action.fileError}
        case UPDATE_TAGS:
            return {...state, tags: action.tags}
        case UPDATE_PREVIEW_DETAILS:
            return {...state, previewDetails: action.previewDetails}
        default:
            return state
    }
}