import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
        "API-KEY": "3f2397b1-5ead-4056-a71c-b3011fd2a063"
    }
});

let promise = new Promise(()=> {return {data:null}});

export const getUsers = (currentPage, showFriends, term='') =>{
    return instance.get(`users?${showFriends?"friend=true&":""}count=12&term=${term}&page=${currentPage || 1}`)
        .then(response => response.data);
}

export const getProfile = (userId) =>{
    if(userId==1) return promise
    return instance.get("profile/" + userId).then(response => response.data)
}

export const authAuto = () =>{
   return instance.get('auth/me').then(response => response.data);
}

export const followUser = (userId) =>{
    return instance.post("follow/" + userId);
}

export const unfollowUser = (userId) =>{
    return instance.delete("follow/" + userId);
}

export const login = (email, password, rememberMe = false) => {
    return instance.post(`auth/login`, { email, password, rememberMe });
}

export const sendMessage = (body, userId) => {
    return instance.post('dialogs/'+userId+'/messages',{body}).then(response => response);
}

export const getAllMessages = (userId) => {
    return instance.get('dialogs/'+userId+'/messages')
}
