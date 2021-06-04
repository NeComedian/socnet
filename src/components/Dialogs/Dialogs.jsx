import React,{useEffect} from 'react';
import s from './Dialogs.module.css';
import Spinner from "../Spinner/Spinner";

const Dialogs = (props) => {
    const {messages, newMessageBody, userId, loadMessagesThunk, sendMessageThunk} = props;
    let myRef = React.createRef();
    let messagesElements = messages.map(m => {
        if (userId === m.senderId || m.senderName === 'me')
            return <MyMessage message={m.body} sender={m.senderName} key={m.id}/>
        return <Message message={m.body} sender={m.senderName} key={m.id}/>

    });
    const receiverId = userId===10998?11221:10998;

    const mounted = React.useRef();

    useEffect(() => {
        if (!mounted.current) {
            loadMessagesThunk(receiverId);
            myRef.scrollIntoView();
            mounted.current = true;
        } else {
            myRef.scrollIntoView({ behavior: 'smooth' });
        }
    });

    const onSendMessageClick = () => {
        sendMessageThunk(newMessageBody, receiverId);
    }

    const onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    }

    const submitOnEnter = (e) =>{
        if(e.which === 13 && !e.shiftKey){
            e.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
            e.preventDefault();
        }
    }

    return (
        <div className={s.dialogs}>
            <div className={s.inputBlock}>
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        onSendMessageClick();
                    }}>
                        <div>
                                <textarea value={newMessageBody}
                                          onChange={onNewMessageChange}
                                          placeholder='Enter your message'
                                          onKeyPress={submitOnEnter}
                                /></div>
                    </form>
                </div>
            </div>
            <div className={s.messages}>
                <div>{messagesElements.length?messagesElements:<Spinner/> }</div>
            </div>
            <div className={s.whiteBlock}/>
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { myRef = el; }}/>
        </div>
    )
}


const Message = (props) =>{
    return(
        <div className={s.message}>
            <div className={s.sender}>
                <div className={s.ava}/>
                <div className={s.name}>{props.sender}</div>
            </div>
            <div className={s.body}>{props.message}</div>
        </div>
    )
}

const MyMessage = (props) =>{
    return(
        <div className={s.message + " " + s.myMessage}>
            <div className={s.body}>{props.message}</div>
            <div className={s.sender}>
                <div className={s.ava}/>
                <div className={s.name}>{'me'}</div>
            </div>
        </div>
    )
}

export default Dialogs;
