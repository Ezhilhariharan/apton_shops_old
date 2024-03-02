const getCustomerContacts = state => state.customerReducer.contacts
const getContactDetails = state => state.customerReducer.contactDetails
const getExportFile = state => state.customerReducer.contactFile
const getFileURL = state => state.customerReducer.fileInfo
const getFileError = state => state.customerReducer.fileError
const getTagList = state => state.customerReducer.tags
const getPreviewDetails = state => state.customerReducer.previewDetails

const selectors = {
    getCustomerContacts,
    getContactDetails,
    getExportFile,
    getFileURL,
    getFileError,
    getTagList,
    getPreviewDetails,
}

export default selectors;