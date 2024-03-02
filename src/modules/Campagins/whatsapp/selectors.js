const getOverViewCardInfo = state => state.whatsAppSelector.campOverViewCard
const getWhatsAppCampList = state => state.whatsAppSelector.whatsCampaginList
const getSelectedCampagin = state => state.whatsAppSelector.selectedWhatsAppCampagin
const selectors = {
  getOverViewCardInfo,
  getWhatsAppCampList,
  getSelectedCampagin
}

export default selectors
