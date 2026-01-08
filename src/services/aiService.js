import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateEmail = async ({ purpose, recipient_name, tone }) => {
    const startTime = Date.now();

    const prompt = `
    You are an expert email copywriter.
    Write a short, customer-friendly email template.
    
    Context:
    - Purpose: ${purpose}
    - Recipient Name: ${recipient_name}
    - Tone: ${tone}
    
    The email should be ready to send, with placeholders only if absolutely necessary.
    Keep it concise and professional yet matching the requested tone.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const endTime = Date.now();
        const duration = endTime - startTime;

        return {
            email_template: text,
            ai_response_time_ms: duration,
            purpose,
            tone
        };
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate email content from AI service.");
    }
};
