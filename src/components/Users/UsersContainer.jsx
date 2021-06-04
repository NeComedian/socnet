import Users from "./Users";
import {connect} from "react-redux";
import {
    deleteList,
    followUserThunk,
    loadUsersThunk,
    offFriends,
    setFriends,
    setUsers,
    unfollowUserThunk, updateTerm
} from "../../redux/user-reducer";
import {withAuthRedirect} from "../../hoc/AuthRedirect";

export const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        loading: state.usersPage.loading,
        showFriends: state.usersPage.showFriends,
        term: state.usersPage.term,
    }
}

export const UsersContainer = withAuthRedirect(connect(mapStateToProps,
    // eslint-disable-next-line no-undef
    {unfollowUserThunk, setUsers, loadUsersThunk, deleteList,followUserThunk, setFriends, offFriends,updateTerm})(Users))
