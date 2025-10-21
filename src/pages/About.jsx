export default function About() {
    return (
        <div className="centered">
            <div style={{ textAlign: "center" }}>
                <img
                    src="/underconst.png"
                    alt="Under Construction"
                    style={{ maxWidth: 360, width: "90%", borderRadius: 16, boxShadow: "var(--shadow)" }}
                />
                <h2 style={{ marginTop: 16 }}>This page is currently under construction!</h2>
            </div>
        </div>
    );
}
