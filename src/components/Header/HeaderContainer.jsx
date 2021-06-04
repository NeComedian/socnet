import {connect} from "react-redux";
import {authThunk, setProfileThunk} from "../../redux/auth-reducer";
import Header from "./Header";
import {withRouter} from "react-router-dom";


export const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isLogged: state.auth.isLogged,
        fullName: state.auth.fullName,
        image: state.auth.image,
    }
}
// eslint-disable-next-line no-undef
const HeaderContainer = connect(mapStateToProps,{setProfileThunk, authThunk})(withRouter(Header));
export default HeaderContainer;
