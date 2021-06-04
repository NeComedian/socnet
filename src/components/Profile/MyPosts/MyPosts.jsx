import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

    let postsElements =
        props.posts.map( p => <Post message={p.message} image={props.image} likesCount={p.likesCount}/>);

    let newPostElement = React.createRef();

    let onAddPost = () => {
        if(props.newPostText) {
            props.addPost();
            props.updateNewPostText('', 48)
        }
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        let length = newPostElement.current.scrollHeight;
        length -= (length - 48)%28
        props.updateNewPostText(text, length);
        console.log(length);
    }


    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea rows='2' style={{height:props.textLength}} onChange={ onPostChange } ref={newPostElement}
                              value={props.newPostText} placeholder={'post something'}/>
                </div>
                <div>
                    <button onClick={ onAddPost }>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
}

export default MyPosts;
