# Email Template Generator Microservice

This microservice generates customer-friendly email templates using Generative AI (Google Gemini).

## Features
- **AI-Powered**: Uses Gemini to generate context-aware email templates.
- **Structured API**: Accepts JSON input for purpose, recipient, and tone.
- **Performance Metrics**: Returns the time taken for the AI generation.
- **Error Handling**: Robust validation and error management.

## Setup

1.  **Clone the repository** (if applicable).
2.  **Install dependencies**:
    ```beta
    npm install
    ```
3.  **Configure Environment**:
    - Create a `.env` file in the root directory.
    - Add your **GEMINI_API_KEY** to `.env`:
        ```bash
        GEMINI_API_KEY=your_key_here
        ```

## Running the Service

Start the server:
```bash
node src/app.js
```
The server will start on port 3000 (default).

## API Documentation

### Generate Email Template

**Endpoint**: `POST /api/email-template`

**Request Body**:
```json
{
  "purpose": "apologize for delayed delivery",
  "recipient_name": "John Doe",
  "tone": "formal"
}
```

**Response**:
```json
{
  "email_template": "Dear John Doe, ...",
  "ai_response_time_ms": 235,
  "purpose": "apologize for delayed delivery",
  "tone": "formal"
}
```

## AI Prompt Design
The service constructs a prompt by combining the user-provided `purpose`, `recipient_name`, and `tone`. It instructs the AI to act as an expert copywriter and produce a concise, ready-to-send email.

## Timing Metrics
The application records the timestamp before sending the request to the AI model and immediately after receiving the response. The difference (in milliseconds) is returned as `ai_response_time_ms`.
