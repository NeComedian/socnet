import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Spinner from "../Spinner/Spinner";
import s from "./Profile.module.css";

const Profile = React.memo((props) => {
    const {info, id,getUsersThunk} = props;
    const userId = props.match.params.userId || id || 1
    debugger
    if(userId != info.userId){
        getUsersThunk(userId)
        return <Spinner/>
    }
    return (
        <div className={s.profileContainer}>
            <ProfileInfo info={props.info}/>
            {userId===id?<MyPostsContainer />:null}
        </div>
    )
})

export default Profile;
