import { connect } from "react-redux"
import WhatsappTemplate from "../components";
import whatsappSelector from "../../whatsapp/selectors";
import {
    getOverviewCardTemplate,
    retrieveWhatsappMessageTemplates,
    createWhatsappTemplate,
    mediaUpload,
    editWhatsappTemplate,
    getSingleTemplateOnEdit,
    deleteWhatsappTemplate,
    getFileLocalPath,
    removeSingleTemplateOnEdit,
    getListOfDrafts,
    deleteDraft,
    updateMediaUrl,
    updateImageLocalPath,
} from "../actions";
import templateSelector from '../selectors';
import authSelectors from '@modules/Auth/selectors';
import intagrationSelector from "../../../NewIntegration/selectors"
import {getSocialMediaList} from "../../../NewIntegration/actions"
 
const mapStateToProps = state => ({
    campOverViewCard: whatsappSelector.getOverViewCardInfo(state),
    overviewTemplate: templateSelector.getOverviewTemplate(state),
    currentUserInfo: authSelectors.getCurentUser(state),
    retrieveTemplate: templateSelector.getRetrieveTemplate(state),
    mediaUrl: templateSelector.getMediaUrl(state),
    singleTemplate: templateSelector.getSingleTemplate(state),
    localPath: templateSelector.getImageLocalPath(state),
    listOfDraft: templateSelector.getListOfDraft(state),
    socialMediaList: intagrationSelector.getBrandSocialMediaList(state),
})

const mapDispatchToProps = {
    getOverviewCardTemplate,
    retrieveWhatsappMessageTemplates,
    createWhatsappTemplate,
    mediaUpload,
    editWhatsappTemplate,
    getSingleTemplateOnEdit,
    deleteWhatsappTemplate,
    getFileLocalPath,
    removeSingleTemplateOnEdit,
    getListOfDrafts,
    deleteDraft,
    getSocialMediaList,
    updateMediaUrl,
    updateImageLocalPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(WhatsappTemplate)