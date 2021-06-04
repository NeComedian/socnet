import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {SetInitialisingThunk} from "./redux/app-reducer";
import Spinner from "./components/Spinner/Spinner";

class App extends React.Component {
    componentDidMount() {
        this.props.SetInitialisingThunk();
    }
    render() {
        if(!this.props.initialized){
            return <Spinner/>
        }
        return (
            <>
                <HeaderContainer/>
                <div className='wrapper'>
                    <Navbar/>
                    <div className={'content-wrapper'}>
                        <Route path='/dialogs'
                               render={() => <DialogsContainer/>}/>
                        <Route exact path='/profile/:userId?'
                               render={() => <ProfileContainer/>}/>
                        <Route exact path={'/users'}
                               render={() => <UsersContainer/>}/>
                        <Route exact path={'/users/:userId'}
                               render={() => <ProfileContainer/>}/>
                        <Route path={'/login'}
                               render={() => <Login/>}/>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        initialized: state.app.initialized,
    }
}
export default compose(withRouter, connect(mapStateToProps, {SetInitialisingThunk}))(App);
