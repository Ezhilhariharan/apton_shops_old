import { connect } from "react-redux";
import authSelector from "../selectors";
import {updateOnboardingSteps,requestForgotPassword} from "../actions"
import ForgotPasswordPage from "../components/ForgotPasswordPage";


const mapStateToProps = state =>({
    onboardingStep: authSelector.getOnboardingStep(state),
})

const mapDispatchToProps = {
    updateOnboardingSteps,
    requestForgotPassword
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPasswordPage)
