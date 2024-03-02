import { connect } from 'react-redux';
import ResetPage from '../components/ResetPage'


const mapStateToProps = state => ({
  //onboardingStep: authSelector.getOnboardingStep(state),
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPage);
