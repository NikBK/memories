import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import FileBase from "react-file-base64";
import "./form.css";

const initialFormData = { creator: "", title: "", message: "", tags: [], selectedFile: "" };

const Form = ({ currentId, setCurrentId, setIsUpdatingPost }) => {
    const post = useSelector(state => currentId ? state.posts.find(p => p._id === currentId) : null);
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setFormData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            setIsUpdatingPost(true);
            dispatch(updatePost(currentId, formData, setIsUpdatingPost));
        }
        else {
            dispatch(createPost(formData));
        }
        clearForm();
    }

    const clearForm = () => {
        setCurrentId(null);
        setFormData(initialFormData);
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <h2>{currentId ? "Update" : "Create"} Memory</h2>
                <input className="formInput" required placeholder="Creator" type="text" name="creator" value={formData.creator} onChange={(e) => setFormData({ ...formData, creator: e.target.value })} />
                <input className="formInput" required placeholder="Title" type="text" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                <textarea className="formInput" required placeholder="Message" type="text" name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} ></textarea>
                <input className="formInput" required placeholder="Comma separated Tags" type="text" name="tags" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(el => el.trim()) })} />
                {/* <input className="formInput" type="file" name="selectedFile" onChange={(e) => setFormData({ ...formData, selectedFile: e.target.value })} /> */}
                <FileBase type="file" multiple={false} onDone={(file) => setFormData({ ...formData, selectedFile: file.base64 })} />
                <button className="formInput btn btn-bg-success" type="submit">Submit</button>
                <button className="formInput btn btn-bg-danger" type="clear" onClick={clearForm}>Clear</button>
            </form>
        </>
    )
}

export default Form;
