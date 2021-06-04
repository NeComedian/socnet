import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = React.memo((props) => {
    const {info} = props
    const defaultImage = "http://wallpoper.com/images/00/42/03/20/one-piece_00420320_thumb.png"
    return (
        <div className={s.infoContainer}>
            <div className={s.ava}
                      style={{backgroundImage: `url(${info.photos.small?info.photos.small:defaultImage})`}}/>
            <div className={s.info}>
                <div>{info.fullName}</div>
                    <div className={s.dopInfo}>
                        <div><span>About me: </span>{info.aboutMe||'no data:('}</div>
                        <div><span>Looking for a job: </span>{info.lookingForAJob?'yes':'no'}</div>
                        <div><span>Job description: </span>{info.lookingForAJobDescription||'no data:('}</div>
                        <div><span>Contacts: </span>{info.contacts.vk||'no data:('}</div>
                    </div>
            </div>
        </div>
    )
}
)
export default ProfileInfo;
