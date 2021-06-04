import React, {useEffect} from 'react'
import classes from './Users.module.css'
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from "../Spinner/Spinner";
import {NavLink} from "react-router-dom";



const Users = (props) => {
    const {setFriends,users, currentPage, loading, loadUsersThunk,
        followUserThunk, unfollowUserThunk, showFriends, offFriends, term, updateTerm, deleteList} = props
    const defaultImage = "http://wallpoper.com/images/00/42/03/20/one-piece_00420320_thumb.png"



    useEffect(() => {
        // returned function will be called on component unmount
        return () => {
            deleteList();
        }
    }, [])
    const userElements = users.map(user => {
        return (
            <div className={classes.user} key={user.id}>
                <NavLink to={`/users/${user.id}`}>
                    <div className={classes.ava}
                         style={{backgroundImage: `url(${user.photos.small ? user.photos.small : defaultImage})`}}/>
                </NavLink>
                <ul className={classes.userInfo}>
                    <li>Name:<br/><span>{user.name}</span></li>
                    <li>Status:<br/><span>{user.status || "Rabotyaga"}</span></li>
                </ul>
                <button
                    onClick={() => user.followed ? unfollowUserThunk(user.id) : followUserThunk(user.id)}>
                    {user.followed ? "Unfollow" : "Follow"}
                </button>
            </div>
        )
    })
    return (
        <div>
            <div className={classes.whiteBlock}/>
            <div className={classes.usersToggle}>
                <div className={!showFriends?classes.active:null} onClick={offFriends}>All users</div>
                <div className={showFriends?classes.active:null} onClick={setFriends}>Following</div>
                <input type="search" placeholder={'User search...'}
                value={term} onChange={(e)=> updateTerm(e.target.value)}/>
            </div>
            <InfiniteScroll className={classes.usersBlock}
                            pageStart={0}
                            loadMore={() => loadUsersThunk(currentPage, loading, showFriends, term)}
                            hasMore={currentPage < 6}
                            loader={<div className={classes.loader} key={0}><Spinner/></div>}
            >
                {userElements}
            </InfiniteScroll>
        </div>
    )
}
export default Users;






















