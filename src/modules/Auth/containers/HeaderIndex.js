import { connect } from "react-redux";
import authSelector from "../selectors";
import Header from "../../../components/header/header";

const mapStateToProps = state => ({
    currentUserDetails: authSelector.getCurentUser(state),
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
