import { connect } from 'react-redux'
import {
  updateCampSteps,
  getwhatsapptemplist,
  uploadWhatsAppCSV,
  updateCampSetp1,
  updateCampStep2,
  createWhatsAppCampgainsAPI,
  fetchExistingCSVList,
  updateWhatsAppCSV,
  uploadExistingWhatsAppCSV,
  csvErrorUpdate
} from '../actions'
import CreateWhatsAppCampgains from '../components/CreateWhatsAppCampgains'
import campSelector from '../selectors'
import authSelector from '../../../../Auth/selectors'
import { getSocialMediaList } from '../../../../NewIntegration/actions'
import intagrationSelector from '../../../../NewIntegration/selectors'
import { getBrandInfoAPI } from '../../../../Auth/actions'
import whatsAppSelector from "../../../whatsapp/selectors"
import campainDetailSelector from "../../../campaginDetails/selectors"
import {updateCampaign} from '../../../campaginDetails/actions'
import {fetchCampaginDetails} from '../../../campaginDetails/actions'
import campaginDetails from '../../../campaginDetails/selectors'
import {campaignName,updatecampaignError,updateCampaignName} from "../actions"
import selectors from '../selectors'

const mapStateToProps = state => ({
  createCapmStep: campSelector.getCampStep(state),
  whatsapptempList: campSelector.getWhatsAppTemplate(state),
  whatsApp_CSV_Url: campSelector.getWhatsAPPCSVfile(state),
  sheduleSteeings: campSelector.getShedulingValues(state),
  sheduleStep2: campSelector.getShedulingStep2(state),
  currentUserInfo : authSelector.getCurentUser(state),
  socialMediaList : intagrationSelector.getBrandSocialMediaList(state),
  brandProfile : authSelector.getBrandProfile(state),
  existingCSVList:campSelector.getExistingCSVList(state),
  selectedWhatsAppCampagin: whatsAppSelector.getSelectedCampagin(state),
  updateCampaignDetails:campainDetailSelector.getUpdateCampaignDetails(state),
  campaginDetails: campainDetailSelector.getCampaginDetails(state),
  campName:selectors.getCampaignName(state),
  campaignError:selectors.getCampaignError(state),
  csvError:selectors.getCsvError(state),
})

const mapDispatchToProps = {
  updateCampSteps,
  getwhatsapptemplist,
  uploadWhatsAppCSV,
  updateCampSetp1,
  updateCampStep2,
  getSocialMediaList,
  getBrandInfoAPI,
  createWhatsAppCampgainsAPI,
  fetchExistingCSVList,
  updateWhatsAppCSV,
  uploadExistingWhatsAppCSV,
  updatecampaignError,
  updateCampaign,
  fetchCampaginDetails,
  campaignName,
  updateCampaignName,
  csvErrorUpdate,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWhatsAppCampgains)
