import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../App";

export default function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setMsg("");
        try {
            const body = id.includes("@") ? { email: id, password } : { username: id, password };
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) {
                setMsg(data.message || "Login failed");
                return;
            }
            localStorage.setItem("token", data.token);
            setMsg("Logged in!");
            navigate("/");
        } catch (e) {
            setMsg("Login error");
        }
    };

    return (
        <div className="centered">
            <form className="form" onSubmit={submit}>
                <h2>Login to StudentHub</h2>
                <label>
                    Username or Email
                    <input value={id} onChange={(e) => setId(e.target.value)} placeholder="testuser1 or user@example.com" />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                </label>
                <button className="btn" type="submit">Login</button>
                {msg && <div className="small muted">{msg}</div>}

                <div className="small" style={{ marginTop: 8 }}>
                    For testing, enter the username as <b>testuser1</b> and password as <b>pass1</b>
                </div>
            </form>
            <div className="auth-switch">
                Don't have an account? <Link to="/register">Register here</Link>.
            </div>
        </div>
    );
}
