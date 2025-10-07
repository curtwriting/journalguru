// ============================================================
// BACKEND SERVER FOR JOURNAL GURU
// This Node.js/Express server connects your app to Claude's API
//
// FILE LOCATION: Place this in your-app/backend/server.js
// Your React app stays in your-app/src/
// ============================================================

const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = 3001;

// ============================================================
// CONFIGURATION
// ============================================================

// IMPORTANT: Replace 'your-api-key-here' with your actual Anthropic API key
// Get your API key from: https://console.anthropic.com
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'your-api-key-here',
});

// ============================================================
// MIDDLEWARE
// ============================================================
app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // Parse JSON request bodies

// ============================================================
// API ENDPOINT: Generate Journal Prompts
// ============================================================
app.post('/api/generate-prompts', async (req, res) => {
  try {
    const { age, issue, lens, numPrompts } = req.body;

    // Validate that all required fields are present
    if (!age || !issue || !lens || !numPrompts) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Convert "3-5" to "3 to 5" for better readability
    const promptCount = numPrompts === '3-5' ? '3 to 5' : numPrompts;

    // Build the prompt for Claude
    const prompt = `You are a thoughtful journaling coach helping someone develop meaningful self-reflection practices. Please create ${promptCount} journal prompt${numPrompts === '1' ? '' : 's'} for the following person:

Age Range: ${age}
Life Situation: ${issue}
Philosophical/Spiritual Lens: ${lens}

Requirements:
- Tailor the language and complexity to be age-appropriate for someone in the ${age} age range
- Focus specifically on helping them explore "${issue}"
- Frame the prompts through a ${lens} perspective, incorporating relevant principles and wisdom from this tradition
- Make each prompt open-ended to encourage deep reflection
- Ensure prompts are specific enough to be actionable but broad enough to allow personal interpretation
- Include gentle guidance on how to approach the prompt if helpful

Please provide thoughtful, compassionate prompts that will genuinely help this person gain insight and clarity.`;

    console.log('Calling Claude API...');

    // Call Claude's API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract the response text
    const prompts = message.content[0].text;

    console.log('Successfully generated prompts');

    // Send the prompts back to the frontend
    res.json({ prompts });

  } catch (error) {
    console.error('Error generating prompts:', error);
    res.status(500).json({ 
      error: 'Failed to generate prompts',
      details: error.message 
    });
  }
});

// ============================================================
// HEALTH CHECK ENDPOINT
// ============================================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`🚀 Journal Guru backend server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/generate-prompts`);
  console.log(`💡 Make sure to set your ANTHROPIC_API_KEY environment variable!`);
});
