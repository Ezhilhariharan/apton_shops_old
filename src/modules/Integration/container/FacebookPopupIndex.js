import { connect } from 'react-redux';
import FacebookPopup from '../component/FacebookPopup';
import {whatsDisconnect,getSocialMediaList,savePage ,getPageList,connectFBGroups} from '../actions';
import integrationSelector from '../selectors';

const mapStateToProps = state => ({
  whatsAppAuthStatus: integrationSelector.getWhatsAppAuthStatus(state),
  socialMediaList: integrationSelector.getBrandSocialMediaList(state)
});

const mapDispatchToProps = {
    whatsDisconnect,
    getSocialMediaList,
    savePage,
    getPageList,
    connectFBGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookPopup);