import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, CircularProgress, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const server = process.env.REACT_APP_ENDPOINT_API; // Ensure this is defined in .env

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null); // Ref for auto-scrolling

    // Toggle Chat Window
    const toggleChat = () => setOpen((prev) => !prev);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle Sending Message
    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post(`${server}/chatbot/chat`, { message: input });
            const { faqResponse, aiResponse } = response.data;

            if (faqResponse) {
                setMessages((prev) => [...prev, { text: faqResponse, sender: "faq" }]);
            }
            if (aiResponse) {
                setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
            }
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages((prev) => [
                ...prev,
                { text: error.response?.data?.error || "Error connecting to chatbot.", sender: "bot" }
            ]);
        }

        setLoading(false);
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!open && (
                <IconButton
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        backgroundColor: "#1976d2",
                        color: "white",
                        "&:hover": { backgroundColor: "#1565c0" },
                    }}
                    onClick={toggleChat}
                >
                    <ChatIcon fontSize="large" />
                </IconButton>
            )}

            {/* Chat Window */}
            {open && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 80,
                        right: 20,
                        width: "350px",
                        height: "450px",
                        border: "1px solid gray",
                        borderRadius: "8px",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        zIndex: 999,
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="h6">Chatbot Support</Typography>
                        <IconButton onClick={toggleChat}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Chat Messages */}
                    <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 1, maxHeight: "350px" }}>
                        {messages.map((msg, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    textAlign: msg.sender === "user" ? "right" : "left",
                                    mb: 1,
                                    p: 1,
                                    backgroundColor:
                                        msg.sender === "user"
                                            ? "#D1E8FF" // Light Blue
                                            : msg.sender === "faq"
                                            ? "#D4F8D4" // Light Green
                                            : "#F8E8D4", // Light Orange
                                    borderRadius: "8px",
                                    color: "black",
                                    maxWidth: "80%",
                                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                                }}
                            >
                                {msg.text}
                            </Typography>
                        ))}
                        {/* Auto-scroll ref */}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Loading Indicator */}
                    {loading && <CircularProgress size={24} sx={{ alignSelf: "center", mb: 1 }} />}

                    {/* Input Field */}
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            fullWidth
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <Button onClick={handleSendMessage} sx={{ ml: 1 }} variant="contained" disabled={loading}>
                            <SendIcon />
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Chatbot;
