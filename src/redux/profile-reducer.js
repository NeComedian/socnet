import {getProfile} from "../services/networkService";
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_PROFILE = 'UPDATE-PROFILE';

let initialState = {
    profileInfo: {
        userId: null,
    },
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    newPostText: '',
    textLength: 48,
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText,
                textLength: action.textLength,
            }
        }
        case UPDATE_PROFILE: {
            return {
                ...state,
                profileInfo: action.info
            }
        }
        default:
            return state;
    }
}


export const addPost = () => ({type: ADD_POST})
export const updateNewPostText = (text, len) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text, textLength: len })
export const updateProfile = (info) => ({type: UPDATE_PROFILE, info:info})
export default profileReducer;

export const getUsersThunk = (userId)=>{
    return (dispatch) => getProfile(userId).then(data => {
        dispatch(updateProfile(data));
    });
}
