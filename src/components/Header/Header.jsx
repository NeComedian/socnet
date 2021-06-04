import React from 'react';
import s from './Header.module.css';


const Header = (props) => {
    const {isLogged, image, fullName, authThunk, login} = props;
    const defaultImage = "http://wallpoper.com/images/00/42/03/20/one-piece_00420320_thumb.png"
    const LoggedView = ()=> {
        return(
            <div className={s.content}>
                <span>{fullName}</span>
                <div className={s.ava}
                     style={{backgroundImage: `url(${image?image:defaultImage})`}}/>
            </div>
        )}
    const UnloggedView = () =>{
        return(
        <div className={s.content}>
            <span onClick={authThunk} className={s.login}>{login}</span>
        </div>
    )}
    const content = (isLogged&&fullName)?<LoggedView/>:<UnloggedView/>
        return (
        <header className={s.header}>
            <div className={s.container}>
                <img alt={'logo'} src='https://cdn.discordapp.com/attachments/447687027564216330/745880694617538622/logo_vin.png'/>
                {content}
            </div>
        </header>)
}

export default Header;

