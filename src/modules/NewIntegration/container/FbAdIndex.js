import { connect } from 'react-redux';
import FbBusinessPopover from '../components/FbBusinessPopover';
//import {saveFbGroup,fetchFbGroupList} from '../actions';
import integrationSelector from '../selectors';

const mapStateToProps = state => ({
 fbAccountsList: integrationSelector.getFbAccountsList(state),
});

const mapDispatchToProps = {
 // saveFbGroup,
 // fetchFbGroupList
};

export default connect(mapStateToProps, mapDispatchToProps)(FbBusinessPopover);