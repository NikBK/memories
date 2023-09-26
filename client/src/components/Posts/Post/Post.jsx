import { formatDate } from "../../../utils/functions/formatDate.js";

const Post = ({ post, setCurrentId }) => {
    return (
        <div className="card">
            <div className="post-media">
                <img className="post-img" src={post.selectedFile} alt="memory" />
            </div>
            <div className="overlay">
                <div className="">
                    <h6 className="">{post.creator}</h6>
                    <div className="">{formatDate(post.createdAt)}</div>
                </div>
                <div className="post-edit">
                    <button className="" onClick={() => { setCurrentId(post._id) }}>...</button>
                </div>
            </div>
            <div className="post-details">
                <div className="post-tags">
                    {post.tags.map(tag => <span className="post-tag" key={tag}>#{tag} </span>)}
                </div>
                <div className="post-message">
                    {post.message}
                </div>
                <div className="post-actions">
                    <button className="like" onClick={() => { }}>Like {post.likeCount}</button>
                    <button className="delete" onClick={() => { }}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Post;
