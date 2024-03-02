import { connect } from "react-redux"
import NewIntegration from "../components"
import { saveActiveButton } from "../actions"
import newIntegrationSelector from "../selectors"
import authSelector from '../../Auth/selectors';
import {
    getSocialMediaList, FB_INST_integration, FB_INST_Disconnect, twitterSignUp,
    whatsappAuthenticationStepOne, linkedinPageSignUp, youtubeChannelsList, linkedinPagesList, 
    linkedinPageSave, pinterestSignUp
} from "../actions"

const mapStateToProps = state => ({
    active: newIntegrationSelector.getActiveButton(state),
    socialMediaList: newIntegrationSelector.getBrandSocialMediaList(state),
    CurentUser: authSelector.getCurentUser(state),
    // pinterestBoards:newIntegrationSelector.getBoardList(state),
    youtubeChannels: newIntegrationSelector.getYoutubeChannels(state),
    linkedinPages: newIntegrationSelector.getLinkedinPages(state)
})

const mapDispatchToProps = {
    saveActiveButton,
    getSocialMediaList,
    FB_INST_integration,
    FB_INST_Disconnect,
    twitterSignUp,
    whatsappAuthenticationStepOne,
    linkedinPageSignUp,
    youtubeChannelsList,
    linkedinPagesList,
    linkedinPageSave,
    pinterestSignUp,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIntegration)