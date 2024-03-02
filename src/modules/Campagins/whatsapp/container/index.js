import { connect } from 'react-redux'
import whatsAppSelector from '../selectors'
import {
  whatsappOverviewCardAPI,
  whatsappCampaignListAPI,
  wpCampaignActivateandDeactivate,
  updateSelectedCampagin
} from '../actions'
import WhatsAppCampagin from '../components'
import { getSocialMediaList } from '../../../NewIntegration/actions'
import IntegrationSelectors from '../../../NewIntegration/selectors'

const mapStateToProps = state => ({
  socialMediaList: IntegrationSelectors.getBrandSocialMediaList(state),
  campOverViewCard: whatsAppSelector.getOverViewCardInfo(state),
  whatsCampaginList: whatsAppSelector.getWhatsAppCampList(state),
  selectedWhatsAppCampagin: whatsAppSelector.getSelectedCampagin(state)
})

const mapDispatchToProps = {
  getSocialMediaList,
  whatsappOverviewCardAPI,
  whatsappCampaignListAPI,
  wpCampaignActivateandDeactivate,
  updateSelectedCampagin
}

export default connect(mapStateToProps, mapDispatchToProps)(WhatsAppCampagin)
