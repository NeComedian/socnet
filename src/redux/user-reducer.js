import {followUser, getUsers, unfollowUser} from "../services/networkService";

const FOLLOW = 'toggle-follow';
const SET_USERS = 'set-users';
const SET_LOAD = 'set-loading';
const SET_FRIENDS = 'set-friends';
const OFF_FRIENDS = 'off-friends';
const UPDATE_TERM = 'update-term';
const DELETE_LIST = 'delete-list';
let initialState = {
    users:[],
    currentPage:1,
    loading: false,
    showFriends: false,
    term: '',
}
//https://cdn.discordapp.com/attachments/447687027564216330/744916728944918568/51b4b1a2451073e4.jpg
export const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_FRIENDS:
            return {
                users: [],
                showFriends: true,
                currentPage: 1,
                term:'',
            }
        case OFF_FRIENDS:
            return {
                users: [],
                showFriends: false,
                currentPage: 1,
                term:'',
            }
        case UPDATE_TERM:
            return {
                ...state,
                users: [],
                term: action.term,
                currentPage: 1,
            }
        case DELETE_LIST:
            return {
                users:[],
                currentPage:1,
                loading: false,
                showFriends: false,
                term: '',
            }
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( user => {
                    if(user.id=== action.userId){
                        return {...user, followed: !user.followed}
                    }
                    return user
                })
        }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users.items], currentPage: state.currentPage+1}
        case SET_LOAD:
            return {...state, loading: !state.loading}
        default:
            return state
    }
}

export const follow = (id) => ({type: FOLLOW, userId: id})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setLoading = ()=> ({type: SET_LOAD})
export const setFriends = () =>({type: SET_FRIENDS})
export const offFriends = () =>({type: OFF_FRIENDS})
export const updateTerm = (term) =>({type: UPDATE_TERM, term: term})
export const deleteList = () => ({type:UPDATE_TERM})

export const loadUsersThunk = (currentPage, loading, showFriends, term) => {
    return (dispatch) => {
        if(!loading) {
            dispatch(setLoading())
            console.log(currentPage)
            getUsers(currentPage,showFriends, term).then(data => {dispatch(setUsers(data)); dispatch(setLoading());console.log(data)})
        }
    }
}

export const followUserThunk = (id) =>{
    return (dispatch) =>{ followUser(id).then(()=>dispatch(follow(id)))}
}

export const unfollowUserThunk = (id) =>{
    return (dispatch) =>{ unfollowUser(id).then(()=>dispatch(follow(id)))}
}
