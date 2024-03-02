import { connect } from 'react-redux';
import FbGroupPopup from '../components/FbGroupPopup';
import {saveFbGroup,fetchFbGroupList} from '../actions';
import integrationSelector from '../selectors';

const mapStateToProps = state => ({
  fbGroupList: integrationSelector.getfbGroupList(state)
});

const mapDispatchToProps = {
    saveFbGroup,
    fetchFbGroupList
};

export default connect(mapStateToProps, mapDispatchToProps)(FbGroupPopup);