import { combineReducers } from 'redux';
import authSelector from '@modules/Auth/reducer';
import createWhatsAppSelector from '@modules/Campagins/whatsapp/subcomponet/reducers';
import integrationSelector from '@modules/NewIntegration/reducers';
import whatsAppSelector from '@modules/Campagins/whatsapp/reducers';
import campainDetailSelector from '@modules/Campagins/campaginDetails/reducers';
import socialMedialIntegration from '@modules/SocialMedia/reducers';
import socialMedialExtended from '@modules/SocialMedia/extendedReducer';
import whatsAppChatSelector from '@modules/Campagins/whatsAppChat/reducers';
import settingSelector from '../modules/SettingsPage/reducers';
import parentReducer from '../reducers';
import dashboardIntegration from '../modules/Dashboard/reducers';
import whatsappTemplate from '../modules/Campagins/Template/reducers';
import inboxSelector from '../modules/Inbox/reducers';
import customerReducer from '../modules/Campagins/Customers/reducers';
import surveyCampaginSelector from '../modules/SurveyCampagin/reducers';
import createSurveySelector from '@modules/CreateSurvey/reducers';

export default combineReducers({
  authSelector: authSelector,
  createWhatsAppSelector: createWhatsAppSelector,
  integrationSelector: integrationSelector,
  whatsAppSelector: whatsAppSelector,
  campainDetailSelector: campainDetailSelector,
  socialMedialIntegration: socialMedialIntegration,
  socialMedialExtended: socialMedialExtended,
  whatsAppChatSelector: whatsAppChatSelector,
  settingSelector: settingSelector,
  parentReducer: parentReducer,
  dashboardIntegration: dashboardIntegration,
  whatsappTemplate: whatsappTemplate,
  inboxSelector: inboxSelector,
  customerReducer: customerReducer,
  surveyCampaginSelector: surveyCampaginSelector,
  createSurveySelector: createSurveySelector,
});
