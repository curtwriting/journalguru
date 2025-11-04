/**
 * ============================================================
 * API ROUTE: Generate Journal Prompts
 * ============================================================
 * 
 * This file handles the backend API request for generating
 * personalized journal prompts using AI (Claude/Anthropic).
 * 
 * How it works:
 * 1. Receives user preferences from the frontend form
 * 2. Validates that all required fields are provided
 * 3. Creates a detailed prompt for the AI
 * 4. Calls Claude API to generate personalized prompts
 * 5. Returns the generated prompts to the frontend
 * 
 * File location: /app/api/generate-prompts/route.js
 * This is a Next.js API route that runs on the server
 */

import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

/**
 * POST handler for generating journal prompts
 * This function runs when the frontend sends a POST request to /api/generate-prompts
 */
export async function POST(request) {
  try {
    // ============================================================
    // STEP 1: EXTRACT AND VALIDATE USER INPUT
    // ============================================================
    
    // Get the form data sent from the frontend
    const { age, issue, lens, style, numPrompts } = await request.json();

    // Check that all required fields are provided
    if (!age || !issue || !lens || !style || !numPrompts) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 }); // 400 = Bad Request
    }

    // ============================================================
    // STEP 2: SETUP AI CLIENT
    // ============================================================
    
    // Initialize the Anthropic (Claude) AI client
    // The API key is stored in environment variables for security
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // ============================================================
    // STEP 3: PREPARE THE AI PROMPT
    // ============================================================
    
    // Convert "3-5" to "3 to 5" for better readability in the prompt
    const promptCount = numPrompts === '3-5' ? '3 to 5' : numPrompts;

    // Create a detailed prompt that tells the AI exactly what we want
    const prompt = `You are a thoughtful journaling coach helping someone develop meaningful self-reflection practices. Please create ${promptCount} journal prompt${numPrompts === '1' ? '' : 's'} for the following person:

Age Range: ${age}
Life Situation: ${issue}
Philosophical/Spiritual Lens: ${lens}
Style/Focus: ${style}

Requirements:
- Tailor the language and complexity to be age-appropriate for someone in the ${age} age range
- Focus specifically on helping them explore "${issue}"
- Frame the prompts through a ${lens} perspective, incorporating relevant principles and wisdom from this tradition
- Use a ${style} style/tone in crafting these prompts
- Make each prompt open-ended to encourage deep reflection
- Ensure prompts are specific enough to be actionable but broad enough to allow personal interpretation
- Include gentle guidance on how to approach the prompt if helpful

Please provide thoughtful, compassionate prompts that will genuinely help this person gain insight and clarity.`;

    console.log('Calling Claude API...');

    // ============================================================
    // STEP 4: CALL THE AI API
    // ============================================================
    
    // Send the prompt to Claude and get the response
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', // Using the latest Claude model
      max_tokens: 2048, // Maximum length of response
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // ============================================================
    // STEP 5: EXTRACT AND RETURN RESULTS
    // ============================================================
    
    // Get the text content from Claude's response
    const prompts = message.content[0].text;

    console.log('Successfully generated prompts');

    // Send the generated prompts back to the frontend
    return NextResponse.json({ prompts });

  } catch (error) {
    // ============================================================
    // ERROR HANDLING
    // ============================================================
    
    // If something goes wrong, log the error and return an error message
    console.error('Error generating prompts:', error);
    return NextResponse.json({ 
      error: 'Failed to generate prompts',
      details: error.message 
    }, { status: 500 }); // 500 = Internal Server Error
  }
}
