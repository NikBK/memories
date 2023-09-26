import { fetchPosts } from "../api";

const { data } = await fetchPosts();
const initialPosts = data;

const reducer = (posts = initialPosts, action) => {
    switch (action.type) {
        case "CREATE":
            return [action.payload, ...posts];
        case "FETCH_ALL":
            return action.payload;
        case "UPDATE":
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        default:
            return posts;
    }
}

export default reducer;