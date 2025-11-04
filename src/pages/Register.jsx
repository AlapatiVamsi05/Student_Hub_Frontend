import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../App";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [msg, setMsg] = useState("");
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setMsg("");

        if (password.length < 4) {
            setMsg("Password must be at least 4 characters long");
            return;
        }
        if (password !== confirm) {
            setMsg("Passwords do not match");
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setMsg(data.message || "Registration failed");
            } else {
                alert("Registered successfully!");
                nav("/login");
            }
        } catch (error) {
            setMsg("Error during registration");
        }
    };

    return (
        <div className="centered">
            <form className="form" onSubmit={submit}>
                <h2>Register</h2>

                <label>
                    Username
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="user1" required />
                </label>

                <label>
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user1@example.com" required />
                </label>

                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 4 characters" minLength="4" required />
                </label>

                <label>
                    Confirm Password
                    <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter password" required />
                </label>

                <button className="btn" type="submit">Register</button>

                {msg && <div className="small muted">{msg}</div>}
            </form>

            <div className="auth-switch">
                Already have an account? <Link to="/login">Login here</Link>.
            </div>
        </div>
    );
}
