import {getAllMessages, sendMessage} from "../services/networkService";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';
const LOAD_MESSAGES = 'load-messages';

let initialState = {
    dialogs: [],
    messages: [],
    newMessageBody: ""
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, action.message]
            }
        case LOAD_MESSAGES:
            return {
                ...state,
                messages: [...action.messages]
            }
        default:
            return state;
    }
}

export const addMessage= (message) => ({type: SEND_MESSAGE, message:message})
export const updateNewMessageBody = (body) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body})
export const loadMessages = (messages) =>
    ({type: LOAD_MESSAGES, messages: messages  })
export const loadMessagesThunk = (userID) => (dispatch) =>{
    getAllMessages(userID).then(data => dispatch(loadMessages(data.data.items)))
}
export const sendMessageThunk = (message, userId) => (dispatch) =>{
    dispatch(updateNewMessageBody(''));
    sendMessage(message, userId).then(dispatch(addMessage({id:123123, senderName: 'me', senderId: null, body: message })));
}
export default dialogsReducer;
