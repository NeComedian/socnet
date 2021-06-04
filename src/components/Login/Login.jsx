import React from 'react';
import {Field, reduxForm} from "redux-form";
import s from './Login.module.css'
import {required} from "../utils/validators";
import {Input} from "../FormsControls/FormsControls";
import {connect} from "react-redux";
import {loginThunk} from "../../redux/auth-reducer";
import Redirect from "react-router-dom/Redirect";

let Login = (props)=>{
    const onSubmit = (formData) => {
        debugger
        props.loginThunk(formData.login, formData.password, formData.rememberMe);
    }
    if (props.isLogged) {
        return <Redirect to={"/profile"} />
    }
    return(
        <div className={s.wrapper}>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    )
}
let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Input} placeholder={'Login'} name={'login'} validate={[required]}/>
            <Field component={Input} type={'password'} placeholder={'Password'} validate={[required]}
                   name={'password'}/>
            <Field component={"input"} type={"checkbox"} name={'rememberMe'}/>
            {props.error?<div>{props.error}</div>:null}
            <button>Submit</button>
        </form>
    )
}
const ReduxLoginForm = reduxForm({form:"login"})(LoginForm)

const mapStateToProps = (state) => ({
    isLogged: state.auth.isLogged
})

export default connect(mapStateToProps, {loginThunk} )(Login);
