import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, CircularProgress, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const server = process.env.REACT_APP_ENDPOINT_API;

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(true);

    // Auto-hide notification after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowNotification(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    // Toggle Chatbot Open/Close
    const toggleChat = () => {
        setOpen(!open);
        setShowNotification(false);
    };

    // Handle Sending Message
    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post(`${server}/chatbot/chat`, { message: input });
            const { faqResponse, aiResponse } = response.data;

            if (faqResponse) {
                setMessages((prevMessages) => [...prevMessages, { text: faqResponse, sender: "faq" }]);
            }

            if (aiResponse) {
                setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: "ai" }]);
            }
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Error connecting to chatbot.", sender: "bot" }
            ]);
        }

        setLoading(false);
    };

    return (
        <>
            {/* Floating Notification */}
            {showNotification && !open && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 80,
                        right: 30,
                        backgroundColor: "#1976d2",
                        color: "white",
                        padding: "10px 15px",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                        cursor: "pointer",
                        zIndex: 1000
                    }}
                    onClick={toggleChat}
                >
                    Need help? Chat with AI!
                </Box>
            )}

            {/* Floating Chat Button */}
            {!open && (
                <IconButton
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        backgroundColor: "#1976d2",
                        color: "white",
                        "&:hover": { backgroundColor: "#1565c0" }
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
                        borderRadius: "12px",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                        zIndex: 999
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
                    <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 1, padding: "5px" }}>
                        {messages.map((msg, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    textAlign: msg.sender === "user" ? "right" : "left",
                                    mb: 1,
                                    p: 1,
                                    backgroundColor:
                                        msg.sender === "user"
                                            ? "#d1e7fd"
                                            : msg.sender === "faq"
                                            ? "#fff3cd"
                                            : "#e3f2fd",
                                    borderRadius: "8px",
                                    color: "black",
                                    maxWidth: "75%",
                                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start"
                                }}
                            >
                                {msg.text}
                            </Typography>
                        ))}
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
                        <Button onClick={handleSendMessage} sx={{ ml: 1 }} variant="contained">
                            <SendIcon />
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Chatbot;
