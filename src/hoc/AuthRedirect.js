import {Redirect} from "react-router-dom";
import React from 'react'
import {connect} from "react-redux";
let mapStateToPropsRedirect = (state) => ({isLogged: state.auth.isLogged});
export const withAuthRedirect = (Component) =>{
    class RedirectComponent extends React.Component{
        render() {
            if(!this.props.isLogged) return <Redirect to={"/login"}/>;
            return <Component {...this.props}/>
        }
    }
    const ConnectedRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)
    return ConnectedRedirectComponent;
}

