import {addMessage, loadMessagesThunk, sendMessageThunk, updateNewMessageBody,} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/AuthRedirect";

let mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody,
        userId: state.auth.id,
    }
}

const DialogsContainer = connect(mapStateToProps,
    {addMessage, updateNewMessageBody, loadMessagesThunk, sendMessageThunk})(withRouter(withAuthRedirect(Dialogs)));

export default DialogsContainer;
