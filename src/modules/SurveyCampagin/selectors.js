const getWhatsAppSurvyCampaginList = state => state.surveyCampaginSelector.whatsAppSurveyList
const getSelectedSurveyCampagin = state => state.surveyCampaginSelector.selectedSurvey
const getBotsOverview = state => state.surveyCampaginSelector.botsOverview

const selectors = {
 getWhatsAppSurvyCampaginList,
 getSelectedSurveyCampagin,
 getBotsOverview
}

export default selectors