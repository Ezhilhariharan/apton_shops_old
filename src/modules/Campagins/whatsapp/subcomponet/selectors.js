const getCampStep = state => state.createWhatsAppSelector.createCapmStep;
const getWhatsAppTemplate = state => state.createWhatsAppSelector.whatsapptempList;
const getWhatsAPPCSVfile = state => state.createWhatsAppSelector.whatsApp_CSV_Url;
const getShedulingValues = state => state.createWhatsAppSelector.sheduleSteeings;
const getShedulingStep2 = state => state.createWhatsAppSelector.sheduleStep2;
const getExistingCSVList = state => state.createWhatsAppSelector.existingCSVList;
const getCampaignName=state =>state.createWhatsAppSelector.campName
const getCampaignError=state=>state.createWhatsAppSelector.campaignError
const getCsvError=state=>state.createWhatsAppSelector.csvError
// const getAuthToken = state => state.authSelector.authToken;

const selectors = {
    getCampStep,
    getWhatsAppTemplate,
    getWhatsAPPCSVfile,
    getShedulingValues,
    getShedulingStep2,
    getExistingCSVList,
    getCampaignName,
    getCampaignError,
    getCsvError
};

export default selectors;