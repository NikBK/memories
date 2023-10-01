import { deletePost, likePost } from "../../../actions/posts.js";
import { getDays } from "../../../utils/functions/getDays.js";

import { useDispatch } from "react-redux";
import randomColor from "randomcolor";
import { useMemo } from "react";

const HOST_URL = process.env.REACT_APP_BACKEND_HOST_URL;

const Post = ({ post, setCurrentId, setIsUpdatingPost }) => {
    const time = getDays(post.createdAt);
    const dispatch = useDispatch();
    const color = useMemo(() => randomColor(), []);

    return (
        <div className="card">
            <div className="post-media" style={post.selectedFile ? {} : { backgroundColor: `${color}` }}>
                {post.selectedFile ?
                    <img
                        src={`${HOST_URL}/${post.selectedFile}`}
                        alt={post.title}
                        style={{ maxHeight: "250px", width: "100%" }}
                    />
                    : null}
                <div className="overlay">
                    <div className="">
                        <h6 className="creator">{post.creator}</h6>
                        <div className="time">{time > 0 ? time + " days ago" : "today"}</div>
                    </div>
                    <div className="post-edit">
                        <button className="" onClick={() => { setCurrentId(post._id) }}>...</button>
                    </div>
                </div>
            </div>
            <div className="post-details">
                <div className="post-tags">
                    {post.tags.map(tag => <span className="post-tag" key={tag}>#{tag} </span>)}
                </div>
                <h3 className="post-title">
                    {post.title}
                </h3>
                <div className="post-message">
                    {post.message}
                </div>
                <div className="post-actions">
                    <button className="like" onClick={() => { dispatch(likePost(post._id, setIsUpdatingPost)) }}>Like {post.likeCount}</button>
                    <button className="delete" onClick={() => { dispatch(deletePost(post._id)) }}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Post;
