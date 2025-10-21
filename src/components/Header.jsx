import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
    const [authed, setAuthed] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onStorage = () => setAuthed(!!localStorage.getItem("token"));
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    useEffect(() => {
        setAuthed(!!localStorage.getItem("token"));
    }, [location]);

    const logout = () => {
        localStorage.removeItem("token");
        setAuthed(false);
        navigate("/");
    };

    return (
        <header className="app-header">
            <div className="brand">
                <img src="https://fav.farm/📚" alt="logo" />
                <span>The Student Hub</span>
            </div>

            <div className="auth">
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/profile">Profile</Link>

                {authed && (
                    <Link className="btn secondary" to="/create" style={{ marginRight: 10 }}>
                        Create Post
                    </Link>
                )}

                {authed ? (
                    <button className="btn" onClick={logout}>Logout</button>
                ) : (
                    <>
                        <Link className="btn secondary" to="/register" style={{ marginRight: 10 }}>
                            Register
                        </Link>
                        <Link className="btn" to="/login">Login</Link>
                    </>
                )}
            </div>

        </header>
    );
}
