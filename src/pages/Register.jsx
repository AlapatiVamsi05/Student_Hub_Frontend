import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../App";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setMsg("");
        const res = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        if (!res.ok) setMsg(data.message || "Failed");
        else {
            alert("Registered successfully!");
            nav("/login");
        }
    };

    return (
        <div className="centered">
            <form className="form" onSubmit={submit}>
                <h2>Register</h2>
                <label>
                    Username
                    <input value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button className="btn" type="submit">Register</button>
                {msg && <div className="small muted">{msg}</div>}
            </form>
            <div className="auth-switch">
                Already have an account? <a href="/login">Login here</a>.
            </div>
        </div>
    );
}
