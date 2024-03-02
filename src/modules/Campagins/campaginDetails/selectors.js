const getCampaginDetails = state => state.campainDetailSelector.campaginDetails
const getProspectsList = state => state.campainDetailSelector.prospectsList
const getUpdateCampaignDetails=state=>state.campainDetailSelector.updateCampaignDetails
const getSelectedRow=state=>state.campainDetailSelector.selectedRow

const selectors = {
    getCampaginDetails,
    getProspectsList,
    getUpdateCampaignDetails,
    getSelectedRow
}

export default selectors