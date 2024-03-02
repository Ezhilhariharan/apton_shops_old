import { connect } from 'react-redux';
import WhatsAppAuthPage from '../components/WhatsAppAuthPage';
import {
  whatsDisconnect,
  getSocialMediaList,
  whatsappAuthenticationStepOne,
  whatsappAuthenticationStepTwo,
  whatsappAuthenticationStepThree,
  whatsappAuthenticationStepFour,
  saveWhatsAppAuth,
  updateAccessToken
} from '../actions';
import integrationSelector from '../selectors';
import authSelector from '../../Auth/selectors';
import { getCurrentUserInfo } from '../../Auth/actions';

const mapStateToProps = state => ({
  whatsAppAuthStatus: integrationSelector.getWhatsAppAuthStatus(state),
  socialMediaList: integrationSelector.getBrandSocialMediaList(state),
  CurentUser: authSelector.getCurentUser(state),
  whatsAppBusinessList: integrationSelector.getWhatsAppBusinessList(state),
  whatsAppBusinessAccounts: integrationSelector.getWhatsAppBusinessAccounts(state),
  whatsAppBusinessNumber: integrationSelector.getWhatsAppBusinessNumber(state),
  wpAccessToken: integrationSelector.getAccessToken(state)
});

const mapDispatchToProps = {
  whatsDisconnect,
  getSocialMediaList,
  whatsappAuthenticationStepOne,
  whatsappAuthenticationStepTwo,
  whatsappAuthenticationStepThree,
  whatsappAuthenticationStepFour,
  saveWhatsAppAuth,
  updateAccessToken
};

export default connect(mapStateToProps, mapDispatchToProps)(WhatsAppAuthPage);
