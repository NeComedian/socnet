import {authAuto, getProfile} from "../services/networkService";
import {updateProfile} from "./profile-reducer";
import {login} from "../services/networkService";
import {stopSubmit} from "redux-form";
import {SetInitialising} from "./app-reducer";

const AUTH = 'auth';
const SETMYPROFILE = 'set-my-profile'

let initialState = {
    id: null,
    email: null,
    login: null,
    isLogged: false,
    fullName: null,
    image: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            return {
                ...state,
                ...action.data,
                isLogged: true,
            };
        case SETMYPROFILE:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}

export const auth = (data) => ({type: AUTH, data:data})
export const setMyProfile = (data)=>({type: SETMYPROFILE, data:data})

export const authThunk = () => {
    return (dispatch)=> authAuto().then(data => {
        if(!data.resultCode) {
            dispatch(auth(data.data));
            dispatch(setProfileThunk(data.data.id)).then(dispatch(SetInitialising()));
        }
        else dispatch(SetInitialising());
    });
}
export const setProfileThunk = (id)=>{
    return (dispatch) => getProfile(id).then(data => {
        dispatch(updateProfile(data));
        dispatch(setMyProfile({fullName:data.fullName,image: data.photos.small}))
    })
}
export const loginThunk = (email, password, rememberMe) => (dispatch) => {
    debugger
    login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(authThunk())
            }
            else {
                dispatch(stopSubmit("login",{_error:response.data.messages[0]}))
            }
        });
}
