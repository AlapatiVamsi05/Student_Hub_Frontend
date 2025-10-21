import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../App";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [anon, setAnon] = useState(false);
    const nav = useNavigate();

    const token = localStorage.getItem("token");

    const submit = async (e) => {
        e.preventDefault();
        if (!token) return alert("Please login first!");
        const res = await fetch(`${API_BASE}/posts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                content,
                tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
                anonymous: anon,
            }),
        });
        const data = await res.json();
        if (!res.ok) alert(data.message);
        else {
            alert("Post created!");
            nav("/");
        }
    };

    return (
        <div className="centered">
            <form className="form" onSubmit={submit}>
                <h2>Create New Post</h2>
                <label>
                    Title
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Content
                    <textarea
                        rows={4}
                        style={{ padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Tags (comma-separated)
                    <input value={tags} onChange={(e) => setTags(e.target.value)} />
                </label>
                <label>
                    <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} /> Post anonymously
                </label>
                <button className="btn" type="submit">Submit</button>
            </form>
        </div>
    );
}
