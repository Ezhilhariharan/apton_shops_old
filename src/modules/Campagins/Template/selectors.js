const getOverviewTemplate = state => state.whatsappTemplate.overviewTemplate
const getRetrieveTemplate = state => state.whatsappTemplate.retrieveTemplate
const getMediaUrl = state => state.whatsappTemplate.mediaUrl
const getSingleTemplate = state => state.whatsappTemplate.singleTemplate
const getImageLocalPath = state => state.whatsappTemplate.localPath
const getListOfDraft = state => state.whatsappTemplate.listOfDraft
// added new redux value
const getHeaderVariable = state => state.whatsappTemplate.headerVariable
const getBodyVariable = state => state.whatsappTemplate.bodyVariable

const selectors = {
    getOverviewTemplate,
    getRetrieveTemplate,
    getMediaUrl,
    getSingleTemplate,
    getImageLocalPath,
    getListOfDraft,
    getHeaderVariable,
    getBodyVariable
}

export default selectors