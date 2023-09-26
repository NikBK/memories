// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

import Form from "./components/Form/Form.jsx";
import Posts from "./components/Posts/Posts.jsx";
// import { getPosts } from "./actions/posts";
import "./app.css";
import { useState } from "react";

function App() {
  const [currentId, setCurrentId] = useState(null);
  // const posts = useSelector(state => state.posts);
  // console.log(posts)

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch])

  return (
    <div className="App">
      <header>
        <h2 className="app-header">Memories</h2>
      </header>
      <main>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        <Posts setCurrentId={setCurrentId} />
      </main>
    </div>
  );
}

export default App;
