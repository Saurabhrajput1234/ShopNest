import React, { useState } from "react";
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

    // Toggle Chatbot Open/Close
    const toggleChat = () => setOpen(!open);

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
                const faqReply = { text: faqResponse, sender: "faq" };
                setMessages((prevMessages) => [...prevMessages, faqReply]);
            }

            if (aiResponse) {
                const aiReply = { text: aiResponse, sender: "ai" };
                setMessages((prevMessages) => [...prevMessages, aiReply]);
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
            {/* Floating Chat Button */}
            {!open && (
                <IconButton
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        backgroundColor: "#FFD700", // Golden Yellow
                        color: "black",
                        "&:hover": { backgroundColor: "#FFC107" } // Amber
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
                        border: "1px solid #FFD700",
                        borderRadius: "8px",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#FFF8E1", // Light Yellow
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        zIndex: 999
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography variant="h6" sx={{ color: "#FFD700" }}>Chatbot Support</Typography>
                        <IconButton onClick={toggleChat} sx={{ color: "#FFD700" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Chat Messages */}
                    <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 1 }}>
                        {messages.map((msg, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    textAlign: msg.sender === "user" ? "right" : "left",
                                    mb: 1,
                                    p: 1,
                                    backgroundColor:
                                        msg.sender === "user"
                                            ? "#FFF176" // Light Yellow
                                            : msg.sender === "faq"
                                            ? "#FFECB3" // Lighter Yellow
                                            : "#FFF9C4", // Pale Yellow
                                    borderRadius: "8px",
                                    color: "black"
                                }}
                            >
                                {msg.text}
                            </Typography>
                        ))}
                    </Box>

                    {/* Loading Indicator */}
                    {loading && <CircularProgress size={24} sx={{ alignSelf: "center", mb: 1, color: "#FFD700" }} />}

                    {/* Input Field */}
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            fullWidth
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            sx={{
                                "& .MuiInputBase-root": {
                                    backgroundColor: "#FFFDE7" // Very Light Yellow
                                }
                            }}
                        />
                        <Button
                            onClick={handleSendMessage}
                            sx={{
                                ml: 1,
                                backgroundColor: "#FFD700",
                                color: "black",
                                "&:hover": { backgroundColor: "#FFC107" }
                            }}
                            variant="contained"
                        >
                            <SendIcon />
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Chatbot;
