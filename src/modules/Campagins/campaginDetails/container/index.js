import { connect } from 'react-redux'
import CampaginDetails from '../components'
import whatsAppSelector from '../../whatsapp/selectors'
import selectors from '../selectors'
import authSelector from '../../../Auth/selectors'
import {fetchCampaginDetails,fetchProspectsDetails,downloadCampDetails,updateCampaign} from '../actions'
import { fetchWpStatus} from '../../whatsAppChat/actions'
import whatsappChatSelector from '../../whatsAppChat/selectors'
import campainDetailSelector from'../../campaginDetails/selectors'

const mapStateToProps = state => ({
    selectedWhatsAppCampagin : whatsAppSelector.getSelectedCampagin(state),
    brandProfile : authSelector.getBrandProfile(state),
    campaginDetails: selectors.getCampaginDetails(state),
    prospectsList: selectors.getProspectsList(state),
    overviewStatus:whatsappChatSelector.getOverviewStatus(state),
    updateCampaignDetails:selectors.getUpdateCampaignDetails(state),
})

const mapDispatchToProps = {
    fetchCampaginDetails,
    fetchProspectsDetails,
    fetchWpStatus,
    downloadCampDetails,
    updateCampaign
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaginDetails)