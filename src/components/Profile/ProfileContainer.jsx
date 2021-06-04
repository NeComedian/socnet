import {connect} from "react-redux";
import {getUsersThunk, updateProfile} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/AuthRedirect";

let mapStateToProps = (state) => {
    return{
        info: state.profilePage.profileInfo,
        id: state.auth.id,
    }
}
const ProfileContainer = connect(mapStateToProps,{updateProfile,getUsersThunk})(withRouter(withAuthRedirect(Profile)))
export default ProfileContainer
