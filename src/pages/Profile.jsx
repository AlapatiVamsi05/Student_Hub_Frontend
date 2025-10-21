import { useEffect, useState } from "react";
import { API_BASE } from "../App";

const token = localStorage.getItem("token");

export default function Profile() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const load = async () => {
            if (!token) return;
            const res = await fetch(`${API_BASE}/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setUser(data.user);
            const all = await fetch(`${API_BASE}/posts`);
            const postsData = await all.json();
            setPosts(postsData.filter((p) => p.author === data.user.id));
        };
        load();
    }, []);

    const deletePost = async (id) => {
        if (!window.confirm("Delete this post?")) return;
        await fetch(`${API_BASE}/posts/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setPosts((s) => s.filter((p) => p._id !== id));
    };

    if (!token) return <div className="card">Please login first.</div>;
    if (!user) return <div className="card">Loading profile...</div>;

    return (
        <div className="cards">
            <h2 className="content-title">Profile</h2>
            <div className="card" style={{ display: "grid", gap: 6 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{user.username}</div>
                <div className="muted small">{user.email}</div>
                <div className="muted small">Role: {user.role}</div>
            </div>

            <h3 style={{ marginTop: 16 }}>Your Posts</h3>
            {posts.length === 0 ? (
                <div className="card small muted">No posts created yet.</div>
            ) : (
                posts.map((p) => (
                    <div key={p._id} className="card" style={{ padding: 12 }}>
                        <div style={{ fontWeight: 600 }}>{p.title}</div>
                        <div className="muted small">{p.content}</div>
                        <button
                            className="btn secondary"
                            style={{ marginTop: 8 }}
                            onClick={() => deletePost(p._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
