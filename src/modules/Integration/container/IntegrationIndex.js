import { connect } from 'react-redux';
import Integration from '../component';
import {whatsDisconnect,getSocialMediaList ,FB_INST_integration,FB_INST_Disconnect,whatsappAuthenticationStepOne,connectFBGroups,linkedinSignUp,twitterSignUp,
pinterestSignUp,pinterestList,pinterestSave,youtubeSignUp,youtubeChannelsList,youtubeSave,linkedinPageSignUp,linkedinPagesList,linkedinPageSave} from '../actions';
import integrationSelector from '../selectors';
import authSelector from '../../Auth/selectors';
import {getCurrentUserInfo} from '../../Auth/actions';

const mapStateToProps = state => ({
  whatsAppAuthStatus: integrationSelector.getWhatsAppAuthStatus(state),
  socialMediaList: integrationSelector.getBrandSocialMediaList(state),
  CurentUser: authSelector.getCurentUser(state),
  // pinterestBoards:integrationSelector.getBoardList(state),
  youtubeChannels:integrationSelector.getYoutubeChannels(state),
  linkedinPages:integrationSelector.getLinkedinPages(state)
});

const mapDispatchToProps = {
    whatsDisconnect,
    getSocialMediaList ,
    FB_INST_integration,
    getCurrentUserInfo,
    FB_INST_Disconnect,
    whatsappAuthenticationStepOne,
    connectFBGroups,
    linkedinSignUp,
    twitterSignUp,
    pinterestSignUp,
    youtubeSignUp,
    youtubeChannelsList,
    youtubeSave,
    linkedinPageSignUp,
    linkedinPagesList,
    linkedinPageSave
};

export default connect(mapStateToProps, mapDispatchToProps)(Integration);
