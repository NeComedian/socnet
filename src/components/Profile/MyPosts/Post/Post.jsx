import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.item}>
        <div className={s.ava}
             style={{backgroundImage: `url("http://wallpoper.com/images/00/42/03/20/one-piece_00420320_thumb.png")`}}/>
        <div className={s.text}>
            <div className={s.message}>
                { props.message }
            </div>
            <div className={s.like}>
                <span>like</span> { props.likesCount }
            </div>
        </div>

    </div>
  )
}

export default Post;
