import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="landing">
            <div className="landing-content">
                <h1>Welcome to <span className="brand-text">StudentHub</span></h1>
                <p>
                    A community where students connect, share ideas, and grow together.
                    Explore career tips, academic resources, and useful roadmaps all in one place.
                </p>
                <div className="landing-buttons">
                    <Link to="/posts" className="btn">Explore Posts</Link>
                    <Link to="/register" className="btn secondary">Join Now</Link>
                </div>
            </div>
        </div>
    );
}
