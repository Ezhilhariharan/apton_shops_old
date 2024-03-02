const getNodeList = state => state.createSurveySelector.nodeList
const getNodeEdges = state => state.createSurveySelector.nodeEdgs
const getSurveyTemplates = state => state.createSurveySelector.surveyTempaltes
const getSurveyCSVfile = state => state.createSurveySelector.surveyCSVFile
const getExistingCSVList = state => state.createSurveySelector.exisitingSurveyCSVFile
const getSurveyInfo = state => state.createSurveySelector.surveyInfo
const getSurveyBotDetails = state => state.createSurveySelector.surveyBotDetails
const getSurveyMode = state => state.createSurveySelector.surveyMode
const getHeaderMedia = state => state.createSurveySelector.headerMedia
const getopenBotDrawer = state => state.createSurveySelector.openBotDrawer
const getDrawerTitle = state=>state.createSurveySelector.drawerTitle
const getDeleteNodeId = state=>state.createSurveySelector.deleteNodeId

const selectors ={
    getNodeList,
    getNodeEdges,
    getSurveyTemplates,
    getSurveyCSVfile,
    getExistingCSVList,
    getSurveyInfo,
    getSurveyBotDetails,
    getSurveyMode,
    getHeaderMedia,
    getopenBotDrawer,
    getDrawerTitle,
    getDeleteNodeId
}

export default selectors;