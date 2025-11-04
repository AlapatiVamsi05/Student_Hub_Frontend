import React, { useState } from "react";
import { API_BASE } from "../App";

export default function Contact() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [popupShown, setPopupShown] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!popupShown) {
            alert("Your request will be sent to the admins for review. Thank you!");
            setPopupShown(true);
        }

        try {
            const res = await fetch(`${API_BASE}/requests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, message }),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Your request has been recorded!");
                setEmail("");
                setMessage("");
            } else {
                alert(data.message || "Error saving your request.");
            }
        } catch (err) {
            console.error(err);
            alert("Server error while submitting your request.");
        }
    };

    return (
        <div className="centered">
            <div className="card" style={{ textAlign: "center", maxWidth: 400 }}>
                <h2>Contact Us</h2>
                <p>You can leave your message or feedback below. Kindly note that direct communication from the admin side is not available at the moment.</p>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            required
                        />
                    </label>
                    <label>
                        Message
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write your request or feedback..."
                            required
                            rows="4"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "10px",
                                border: "1px solid #e5e7eb",
                            }}
                        />
                    </label>
                    <button type="submit" className="btn">
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
}
