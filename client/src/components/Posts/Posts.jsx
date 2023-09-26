import { useSelector } from 'react-redux';
import Post from './Post/Post.jsx';
import Loading from "../Loading.jsx";
import "./posts.css";

const Posts = ({ setCurrentId }) => {
    const posts = useSelector(state => state.posts);
    return (
        !posts.length ? <Loading /> : (
            <div className='container'>
                {posts.map(post => (
                    <div key={post._id}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </div>
                ))}
            </div>
        )
    )
}

export default Posts;
