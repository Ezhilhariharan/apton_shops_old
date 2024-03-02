import { connect } from "react-redux"
import authSelector from "../selectors"
import {updateOnboardingSteps,requestForgotPassword,changePassword} from "../actions"
import ChangePasswordPage from "../components/ChangePasswordPage"



const mapStateToProps = state =>({
    onboardingStep: authSelector.getOnboardingStep(state),
})

const mapDispatchToProps = {
    updateOnboardingSteps,
    requestForgotPassword,
    changePassword,
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePasswordPage)
