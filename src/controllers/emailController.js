import { generateEmail } from '../services/aiService.js';

export const createEmailTemplate = async (req, res) => {
    const { purpose, recipient_name, tone } = req.body;

    // Validation
    if (!purpose || !recipient_name || !tone) {
        return res.status(400).json({
            error: "Missing required fields: purpose, recipient_name, tone"
        });
    }

    try {
        const result = await generateEmail({ purpose, recipient_name, tone });
        res.json(result);
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
};
