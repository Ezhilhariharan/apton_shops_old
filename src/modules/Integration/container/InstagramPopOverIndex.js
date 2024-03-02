import { connect } from 'react-redux';
import InstagramPopOver from '../component/InstagramPopOver';
import { pageList ,savePage,getPageList} from '../actions';
import integrationSelector from '../selectors';

const mapStateToProps = state => ({
  whatsAppAuthStatus: integrationSelector.getWhatsAppAuthStatus(state),
  socialMediaList: integrationSelector.getBrandSocialMediaList(state)
});

const mapDispatchToProps = {
  pageList,
  savePage,
  getPageList
};

export default connect(mapStateToProps, mapDispatchToProps)(InstagramPopOver);