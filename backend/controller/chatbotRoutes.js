const express = require("express");
const axios = require("axios");
const Chat = require("../model/Chat");
const FAQ = require("../model/faq");

const router = express.Router();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

console.log("OPENROUTER_API_KEY:", OPENROUTER_API_KEY);

// Route to handle chatbot interactions
router.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required!" });
    }

    try {
        let faqResponse = null;
        let aiResponse = null;

        // Trim and remove quotes from user input for better matching
        const cleanMessage = message.trim().replace(/['"]+/g, "");

        // Check if the message matches any FAQ (flexible regex)
        const faq = await FAQ.findOne({ 
            question: { $regex: new RegExp(cleanMessage, "i") }  // Partial match
        });

        console.log("User Input:", cleanMessage);
        console.log("FAQ Found:", faq);

        if (faq) {
            faqResponse = faq.answer;
        } else {
            // If no FAQ match, query the AI model via OpenRouter
            const response = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: "google/gemini-pro",
                    messages: [{ role: "user", content: message }],
                },
                {
                    headers: {
                        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            aiResponse = response.data.choices?.[0]?.message?.content || "I'm sorry, I couldn't understand that.";
        }

        // Save the interaction to the database
        const chat = new Chat({ userMessage: message, botResponse: faqResponse || aiResponse });
        await chat.save();

        // Send both responses back to the frontend
        res.json({ faqResponse, aiResponse });
    } catch (error) {
        console.error("Error processing chatbot request:", error);
        res.status(500).json({ error: "Failed to process chatbot request." });
    }
});

module.exports = router;
