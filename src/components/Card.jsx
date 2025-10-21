export default function Card({ title, subtitle, body, footer, image }) {
    return (
        <div className="card">
            {image && (
                <div style={{ marginBottom: 12 }}>
                    <img
                        src={image}
                        alt={title}
                        style={{ width: "100%", borderRadius: 12, maxHeight: 220, objectFit: "cover" }}
                    />
                </div>
            )}
            <h3 className="content-title">{title}</h3>
            {subtitle && <div className="muted small" style={{ marginBottom: 8 }}>{subtitle}</div>}
            {body && <div style={{ marginTop: 6, lineHeight: 1.6 }}>{body}</div>}
            {footer && <div style={{ marginTop: 10 }}>{footer}</div>}
        </div>
    );
}
