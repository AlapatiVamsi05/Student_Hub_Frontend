import { useEffect, useState } from "react";
import Card from "../components/Card";
import { API_BASE } from "../App";

const token = () => localStorage.getItem("token");

export default function Repos() {
    const [items, setItems] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", link: "", image: "", content: "" });

    const load = async () => {
        const res = await fetch(`${API_BASE}/repos`);
        const data = await res.json();
        setItems(data);

        const t = token();
        if (t) {
            try {
                const payload = JSON.parse(atob(t.split(".")[1]));
                setIsAdmin(payload.role === "admin");
            } catch { }
        }
    };

    useEffect(() => { load(); }, []);

    const addRepo = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_BASE}/repos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token()}`,
            },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            setShowForm(false);
            setForm({ title: "", link: "", image: "", content: "" });
            load();
        } else {
            alert("Failed to add repo (check admin rights)");
        }
    };

    const del = async (id) => {
        const reason = prompt("Enter reason for deleting this repo:");
        if (!reason) return;
        await fetch(`${API_BASE}/repos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token()}`,
            },
            body: JSON.stringify({ reason }),
        });
        load();
    };

    return (
        <div className="cards">
            <h2 className="content-title">Repositories</h2>
            {isAdmin && (
                <>
                    <button className="btn" onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Cancel" : "Add Repository"}
                    </button>
                    {showForm && (
                        <form className="form" onSubmit={addRepo}>
                            <input
                                placeholder="Title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Link"
                                value={form.link}
                                onChange={(e) => setForm({ ...form, link: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Image URL"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                required
                            />
                            <textarea
                                rows={2}
                                placeholder="Description"
                                value={form.content}
                                onChange={(e) => setForm({ ...form, content: e.target.value })}
                                required
                            />
                            <button className="btn">Submit</button>
                        </form>
                    )}
                </>
            )}

            {items.map((it) => (
                <Card
                    key={it._id}
                    image={it.image}
                    title={it.title}
                    body={<span>{it.content}</span>}
                    footer={
                        <>
                            <a className="link" href={it.link} target="_blank" rel="noreferrer">
                                View Repository
                            </a>
                            {isAdmin && (
                                <button
                                    className="btn secondary"
                                    style={{ marginLeft: 10 }}
                                    onClick={() => del(it._id)}
                                >
                                    Delete
                                </button>
                            )}
                        </>
                    }
                />
            ))}
        </div>
    );
}
