import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import { API_BASE } from "../App";

const token = () => localStorage.getItem("token");
const getUser = () => {
    try {
        const t = token();
        if (!t) return null;
        return JSON.parse(atob(t.split(".")[1]));
    } catch {
        return null;
    }
};

const authHeaders = () =>
    token()
        ? { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" };

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [expanded, setExpanded] = useState({});
    const [commentText, setCommentText] = useState({});
    const [commentAnon, setCommentAnon] = useState({});
    const [user, setUser] = useState(getUser());

    const tag = searchParams.get("tag");

    const loadPosts = async () => {
        setLoading(true);
        try {
            const url = tag
                ? `${API_BASE}/posts/tags?tag=${encodeURIComponent(tag)}`
                : `${API_BASE}/posts`;
            const res = await fetch(url);
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch {
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setUser(getUser());
        loadPosts();
    }, [tag]);

    const vote = async (id, type) => {
        if (!token()) return alert("Login to vote.");
        const res = await fetch(`${API_BASE}/posts/${id}/${type}`, {
            method: "POST",
            headers: authHeaders(),
        });
        if (res.ok) loadPosts();
    };

    const comment = async (id) => {
        const text = (commentText[id] || "").trim();
        if (!text) return alert("Please write something");
        const body = { content: text, anonymous: !!commentAnon[id] };
        const res = await fetch(`${API_BASE}/posts/${id}/comments`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(body),
        });
        if (res.ok) {
            setCommentText((s) => ({ ...s, [id]: "" }));
            loadPosts();
            setExpanded((s) => ({ ...s, [id]: true }));
        }
    };

    const deletePost = async (id, isAdmin) => {
        if (!token()) return alert("Login required.");
        const reason = isAdmin ? prompt("Enter reason for deleting this post:") : "";
        if (isAdmin && !reason) return;
        const res = await fetch(`${API_BASE}/posts/${id}`, {
            method: "DELETE",
            headers: authHeaders(),
            body: isAdmin ? JSON.stringify({ reason }) : undefined,
        });
        if (res.ok) {
            alert("Post deleted");
            loadPosts();
        } else {
            const data = await res.json();
            alert(data.message || "Unable to delete post");
        }
    };

    return (
        <div className="cards">
            <h2 className="content-title">All Posts {tag ? `· #${tag}` : ""}</h2>
            {loading && <div>Loading...</div>}
            {!loading && posts.length === 0 && <div className="card">No posts yet.</div>}

            {posts.map((p) => {
                const showComments = expanded[p._id];
                const canDelete =
                    user &&
                    (user.role === "admin" ||
                        (p.author && p.author.toString && p.author.toString() === user.id));

                return (
                    <Card
                        key={p._id}
                        title={p.title}
                        subtitle={`${new Date(p.createdAt).toLocaleString()}`}
                        body={<span>{p.content}</span>}
                        footer={
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 8,
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        marginBottom: 8,
                                    }}
                                >
                                    <span
                                        className="badge"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => vote(p._id, "upvote")}
                                    >
                                        ▲ Upvote ({p.upvotes || 0})
                                    </span>
                                    <span
                                        className="badge"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => vote(p._id, "downvote")}
                                    >
                                        ▼ Downvote ({p.downvotes || 0})
                                    </span>
                                    {p.anonymous && <span className="badge">anonymous</span>}
                                    {(p.tags || []).map((t) => (
                                        <span key={t} className="badge">
                                            {t}
                                        </span>
                                    ))}
                                    {canDelete && (
                                        <button
                                            className="btn secondary"
                                            style={{
                                                marginLeft: "auto",
                                                fontSize: 12,
                                                padding: "4px 8px",
                                            }}
                                            onClick={() => deletePost(p._id, user.role === "admin")}
                                        >
                                            🗑️ Delete
                                        </button>
                                    )}
                                </div>

                                <button
                                    className="btn secondary"
                                    onClick={() =>
                                        setExpanded((s) => ({ ...s, [p._id]: !s[p._id] }))
                                    }
                                >
                                    {showComments
                                        ? "Hide Comments"
                                        : `Show Comments (${p.comments?.length || 0})`}
                                </button>

                                {showComments && (
                                    <div style={{ marginTop: 10 }}>
                                        <div className="card" style={{ padding: 12 }}>
                                            <textarea
                                                rows={2}
                                                placeholder="Write a comment..."
                                                value={commentText[p._id] || ""}
                                                onChange={(e) =>
                                                    setCommentText((s) => ({
                                                        ...s,
                                                        [p._id]: e.target.value,
                                                    }))
                                                }
                                                style={{
                                                    width: "100%",
                                                    borderRadius: 8,
                                                    border: "1px solid #e5e7eb",
                                                    padding: 8,
                                                }}
                                            />
                                            <label className="small">
                                                <input
                                                    type="checkbox"
                                                    checked={!!commentAnon[p._id]}
                                                    onChange={(e) =>
                                                        setCommentAnon((s) => ({
                                                            ...s,
                                                            [p._id]: e.target.checked,
                                                        }))
                                                    }
                                                />{" "}
                                                Post as anonymous
                                            </label>
                                            <button
                                                className="btn"
                                                style={{ marginTop: 6 }}
                                                onClick={() => comment(p._id)}
                                            >
                                                Comment
                                            </button>
                                        </div>

                                        {(p.comments || []).length === 0 ? (
                                            <div className="small muted" style={{ marginTop: 8 }}>
                                                No comments yet.
                                            </div>
                                        ) : (
                                            (p.comments || []).map((c) => (
                                                <div key={c._id} className="card" style={{ padding: 10 }}>
                                                    <div className="small muted" style={{ marginBottom: 4 }}>
                                                        {c.anonymous
                                                            ? "anonymous"
                                                            : c.author?.username || "user"}{" "}
                                                        · {new Date(c.createdAt).toLocaleString()}
                                                    </div>
                                                    <div>{c.content}</div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </>
                        }
                    />
                );
            })}
        </div>
    );
}


