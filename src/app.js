import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { createEmailTemplate } from './controllers/emailController.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/email-template', createEmailTemplate);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
