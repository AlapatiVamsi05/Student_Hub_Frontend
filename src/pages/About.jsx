export default function About() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
                color: "#fff",
            }}
        >
            <div
                style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "20px",
                    padding: "3rem",
                    maxWidth: "900px",
                    textAlign: "center",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                    backdropFilter: "blur(8px)",
                }}
            >
                <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>About StudentHub</h1>
                <p style={{ fontSize: "1.15rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                    Welcome to <strong>StudentHub</strong> — a digital space created to empower students by connecting
                    them with peers, resources, and opportunities. We believe that learning grows stronger through
                    collaboration and community.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "1.5rem",
                        textAlign: "left",
                    }}
                >
                    <div
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            padding: "1.5rem",
                            borderRadius: "12px",
                        }}
                    >
                        <h2 style={{ fontSize: "1.3rem", marginBottom: ".5rem" }}>🎯 Our Mission</h2>
                        <p>
                            To simplify academic life by providing one platform for collaboration, idea sharing, and
                            access to valuable student resources.
                        </p>
                    </div>

                    <div
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            padding: "1.5rem",
                            borderRadius: "12px",
                        }}
                    >
                        <h2 style={{ fontSize: "1.3rem", marginBottom: ".5rem" }}>💡 Our Vision</h2>
                        <p>
                            To become the go-to online hub where students from every background can connect, learn, and
                            innovate together.
                        </p>
                    </div>

                    <div
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            padding: "1.5rem",
                            borderRadius: "12px",
                        }}
                    >
                        <h2 style={{ fontSize: "1.3rem", marginBottom: ".5rem" }}>🌱 Our Values</h2>
                        <p>
                            Collaboration, curiosity, and creativity — these principles guide everything we build at
                            StudentHub.
                        </p>
                    </div>
                </div>

                <p style={{ marginTop: "2rem", opacity: 0.85 }}>
                    🚧 This Project is still evolving — stay tuned as we bring new features and stories from our growing
                    student community!
                </p>
            </div>
        </div>
    );
}