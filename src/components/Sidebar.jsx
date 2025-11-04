import { Link, useNavigate, useLocation } from "react-router-dom";

const POPULAR_TAGS = ["academics", "fun", "career", "learning", "projects"];

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const gotoAllPosts = () => navigate("/posts");
    const filterByTag = (tag) => navigate(`/posts/?tag=${encodeURIComponent(tag)}`);

    return (
        <aside className="sidebar">
            <h3>Posts</h3>
            <ul className="sidebar-menu">
                <li
                    className={location.pathname === "/posts" ? "active" : ""}
                    onClick={gotoAllPosts}
                >
                    All Posts
                </li>
            </ul>

            <h3>Popular Tags</h3>
            <div className="tag-list" style={{ marginBottom: 12 }}>
                {POPULAR_TAGS.map((t) => (
                    <div className="tag" key={t} onClick={() => filterByTag(t)}>
                        {t}
                    </div>
                ))}
            </div>

            <hr style={{ opacity: 0.3, border: "none", height: 1, background: "rgba(255,255,255,.4)", margin: "12px 0 16px" }} />

            <h3>Explore</h3>
            <ul className="sidebar-menu">
                <li className={location.pathname === "/roadmaps" ? "active" : ""}>
                    <Link to="/roadmaps" style={{ color: "#fff", textDecoration: "none" }}>Roadmaps</Link>
                </li>
                <li className={location.pathname === "/repos" ? "active" : ""}>
                    <Link to="/repos" style={{ color: "#fff", textDecoration: "none" }}>Repositories</Link>
                </li>
            </ul>
        </aside>
    );
}
