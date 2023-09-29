import { useSelector } from 'react-redux';
import Post from './Post/Post.jsx';
import "./posts.css";

const Posts = ({ setCurrentId, setIsUpdatingPost }) => {
    const posts = useSelector(state => state.posts);

    return (
        <div className='container'>
            {posts.map(post => (
                <div key={post._id}>
                    <Post post={post} setCurrentId={setCurrentId} setIsUpdatingPost={setIsUpdatingPost} />
                </div>
            ))}
        </div>
    )
}

export default Posts;
