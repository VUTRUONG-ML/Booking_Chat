// ContactBKHotel.jsx
import React, { useState } from "react";

const ContactBKHotel = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission (replace with actual API call if needed)
        console.log("Form submitted:", formData);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
            <h1 style={{ color: "#2c3e50", textAlign: "center" }}>Liên Hệ</h1>
            <p style={{ textAlign: "center" }}>
                Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, hãy liên hệ với chúng tôi ngay hôm nay. Đội ngũ của{" "}
                <strong>BK Hotel</strong> luôn sẵn sàng hỗ trợ bạn!
            </p>

            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Họ và tên:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="message" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Tin nhắn:
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Gửi liên hệ
                </button>
            </form>

            {submitted && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "10px",
                        backgroundColor: "#2ecc71",
                        color: "white",
                        borderRadius: "4px",
                        textAlign: "center",
                    }}
                >
                    Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm nhất có thể.
                </div>
            )}
        </div>
    );
};

export default ContactBKHotel;
