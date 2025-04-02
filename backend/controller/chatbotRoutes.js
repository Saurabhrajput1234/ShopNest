const express = require("express");
const axios = require("axios");
const Chat = require("../model/Chat");
const FAQ = require("../model/faq");

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

// Route to handle chatbot interactions
router.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required!" });
    }

    try {
        let faqResponse = null;
        let aiResponse = null;

        // Check if the message matches any FAQ
        const faq = await FAQ.findOne({ question: { $regex: new RegExp("^" + message + "$", "i") } });
        if (faq) {
            faqResponse = faq.answer;
        } else {
            // If no FAQ match, query the Gemini AI
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
                {
                    contents: [{ parts: [{ text: message }] }],
                }
            );

            aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't understand that.";
        }

        // Save the interaction to the database
        const chat = new Chat({ userMessage: message, botResponse: faqResponse || aiResponse });
        await chat.save();

        // Send both responses back to the frontend
        res.json({ faqResponse, aiResponse });
    } catch (error) {
        console.error("Error processing chatbot request:", error.message);
        res.status(500).json({ error: "Failed to process chatbot request." });
    }
});

module.exports = router;
