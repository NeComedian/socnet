import {
    addPost,
    updateNewPostText,
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        image: state.profilePage.profileInfo.photos.small,
        textLength: state.profilePage.textLength,
    }
}

const MyPostsContainer = connect(mapStateToProps, {addPost,updateNewPostText})(MyPosts);

export default MyPostsContainer;
