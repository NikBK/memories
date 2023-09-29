import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Form from "./components/Form/Form.jsx";
import Posts from "./components/Posts/Posts.jsx";
import { getPosts } from "./actions/posts";
import "./app.css";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUpdatingPost) {
      dispatch(getPosts())
    }
  }, [currentId, dispatch, isUpdatingPost])

  return (
    <div className="App">
      <header>
        <h2 className="app-header">Memories</h2>
      </header>
      <main className="main-container">
        <Form currentId={currentId} setCurrentId={setCurrentId} setIsUpdatingPost={setIsUpdatingPost} />
        <Posts setCurrentId={setCurrentId} setIsUpdatingPost={setIsUpdatingPost} />
      </main>
    </div>
  );
}

export default App;
