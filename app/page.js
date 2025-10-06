'use client'
// ============================================================
// IMPORTS - These are tools and icons we're bringing in to use
// ============================================================
import React, { useState } from 'react';
// Import icons from lucide-react library for visual elements
import { BookOpen, Sparkles, Copy, Check } from 'lucide-react';

// ============================================================
// MAIN COMPONENT - This is the entire app
// ============================================================
export default function JournalPromptGenerator() {
  
  // ============================================================
  // STATE VARIABLES - These track what the user has selected/entered
  // Think of these as the app's memory for form data
  // ============================================================
  const [age, setAge] = useState('');                    // Stores the selected age range
  const [issue, setIssue] = useState('');                // Stores the issue to explore
  const [customIssue, setCustomIssue] = useState('');    // Stores custom issue when "Other" is selected
  const [lens, setLens] = useState('');                  // Stores the philosophical lens
  const [customLens, setCustomLens] = useState('');      // Stores custom lens when "Other" is selected
  const [numPrompts, setNumPrompts] = useState('');      // Stores how many prompts they want
  const [generatedPrompt, setGeneratedPrompt] = useState(''); // Stores the final generated prompt text
  const [copied, setCopied] = useState(false);           // Tracks if the copy button was clicked

  // ============================================================
  // FUNCTION 1: Generate the LLM Prompt
  // This runs when the user clicks "Generate LLM Prompt" button
  // ============================================================
  const generateLLMPrompt = () => {
    // Check if all fields are filled out - if not, show an alert
    if (!age || !issue || !lens || !numPrompts) {
      alert('Please fill out all fields before generating your prompt.');
      return; // Stop the function here if fields are empty
    }

    // If "Other" is selected, make sure they entered custom text
    if (issue === 'Other' && !customIssue.trim()) {
      alert('Please enter your custom issue in the text field.');
      return;
    }

    // If "Other" is selected for lens, make sure they entered custom text
    if (lens === 'Other' && !customLens.trim()) {
      alert('Please enter your custom philosophical lens in the text field.');
      return;
    }

    // Use custom issue if "Other" was selected, otherwise use the dropdown selection
    const finalIssue = issue === 'Other' ? customIssue : issue;
    
    // Use custom lens if "Other" was selected, otherwise use the dropdown selection
    const finalLens = lens === 'Other' ? customLens : lens;

    // Convert "3-5" to "3 to 5" for better readability in the prompt
    const promptCount = numPrompts === '3-5' ? '3 to 5' : numPrompts;
    
    // Build the actual prompt text that will be shown to the user
    // This uses template literals (backticks) to insert variables into the text
    const llmPrompt = `You are a thoughtful journaling coach helping someone develop meaningful self-reflection practices. Please create ${promptCount} journal prompt${numPrompts === '1' ? '' : 's'} for the following person:

Age Range: ${age}
Life Situation: ${finalIssue}
Philosophical/Spiritual Lens: ${finalLens}

Requirements:
- Tailor the language and complexity to be age-appropriate for someone in the ${age} age range
- Focus specifically on helping them explore "${finalIssue}"
- Frame the prompts through a ${finalLens} perspective, incorporating relevant principles and wisdom from this tradition
- Make each prompt open-ended to encourage deep reflection
- Ensure prompts are specific enough to be actionable but broad enough to allow personal interpretation
- Include gentle guidance on how to approach the prompt if helpful

Please provide thoughtful, compassionate prompts that will genuinely help this person gain insight and clarity.`;

    // Save the generated prompt to state so it displays on screen
    setGeneratedPrompt(llmPrompt);
  };

  // ============================================================
  // FUNCTION 2: Copy to Clipboard
  // This runs when user clicks the "Copy" button
  // ============================================================
  const copyToClipboard = () => {
    // Use browser's clipboard API to copy the text
    navigator.clipboard.writeText(generatedPrompt);
    // Show "Copied!" message by setting copied to true
    setCopied(true);
    // After 2 seconds, hide the "Copied!" message
    setTimeout(() => setCopied(false), 2000);
  };

  // ============================================================
  // FUNCTION 3: Reset Form
  // This clears everything and starts fresh
  // ============================================================
  const resetForm = () => {
    setAge('');
    setIssue('');
    setCustomIssue('');
    setLens('');
    setCustomLens('');
    setNumPrompts('');
    setGeneratedPrompt('');
  };

  // ============================================================
  // RENDER - This is what actually shows on the screen
  // ============================================================
  return (
    // OUTER CONTAINER - Full page background with gradient
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* CENTER CONTAINER - Keeps content centered and not too wide */}
      <div className="max-w-3xl mx-auto">
        {/* WHITE CARD - Main content area */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          
          {/* ============================================================ */}
          {/* HEADER SECTION - Title and icon */}
          {/* ============================================================ */}
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Journal Prompt Generator</h1>
          </div>
          
          {/* Subtitle explaining what this tool does */}
          <p className="text-gray-600 text-center mb-8">
            Create personalized journal prompts tailored to your life situation and philosophical perspective
          </p>

          {/* ============================================================ */}
          {/* FORM SECTION - All the input fields! */}
          {/* ============================================================ */}
          <div className="space-y-6">
            
            {/* DROPDOWN 1: Age Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your age?
              </label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)} // Updates 'age' when user selects
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select your age range</option>
                <option value="15-25">15-25</option>
                <option value="26-35">26-35</option>
                <option value="36-45">36-45</option>
                <option value="46-55">46-55</option>
                <option value="over 55">Over 55</option>
              </select>
            </div>

            {/* DROPDOWN 2: Issue to Explore */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What issue are you hoping to explore with journal prompts?
              </label>
              <select
                value={issue}
                onChange={(e) => setIssue(e.target.value)} // Updates 'issue' when user selects
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select an issue to explore</option>
                <option value="Being More Present">Being More Present</option>
                <option value="recent health diagnosis">Recent Health Diagnosis</option>
                <option value="new job">New Job</option>
                <option value="Other">Other (specify below)</option>
              </select>

              {/* TEXT INPUT: Shows when "Other" is selected */}
              {issue === 'Other' && (
                <input
                  type="text"
                  value={customIssue}
                  onChange={(e) => setCustomIssue(e.target.value)}
                  placeholder="Enter your custom issue here..."
                  className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              )}
            </div>

            {/* DROPDOWN 3: Philosophical Lens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What lens would you like the prompts to take on?
              </label>
              <select
                value={lens}
                onChange={(e) => setLens(e.target.value)} // Updates 'lens' when user selects
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select a philosophical lens</option>
                <option value="christian">Christian</option>
                <option value="stoic">Stoic</option>
                <option value="budism">Buddhism</option>
                <option value="rastafarianism">Rastafarianism</option>
                <option value="Other">Other (specify below)</option>
              </select>

              {/* TEXT INPUT: Shows when "Other" is selected for lens */}
              {lens === 'Other' && (
                <input
                  type="text"
                  value={customLens}
                  onChange={(e) => setCustomLens(e.target.value)}
                  placeholder="Enter your custom philosophical lens here..."
                  className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              )}
            </div>

            {/* DROPDOWN 4: Number of Prompts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many prompts would you like to start with?
              </label>
              <select
                value={numPrompts}
                onChange={(e) => setNumPrompts(e.target.value)} // Updates 'numPrompts' when user selects
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select number of prompts</option>
                <option value="1">1</option>
                <option value="3-5">3-5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>

            {/* GENERATE BUTTON - Runs generateLLMPrompt() when clicked */}
            <button
              onClick={generateLLMPrompt}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate LLM Prompt
            </button>

            {/* ============================================================ */}
            {/* RESULTS SECTION - Only shows if generatedPrompt has content */}
            {/* ============================================================ */}
            {generatedPrompt && (
              <div className="mt-8 space-y-4">
                
                {/* Header with Copy Button */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Your Custom LLM Prompt</h2>
                  
                  {/* COPY BUTTON - Runs copyToClipboard() when clicked */}
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {/* Shows "Copied!" if copied is true, otherwise shows "Copy" */}
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        <span className="text-sm text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                
                {/* Gray box displaying the generated prompt */}
                <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {generatedPrompt}
                  </pre>
                </div>

                {/* Instructions for the user */}
                <p className="text-sm text-gray-600 italic">
                  Copy this prompt and paste it into your favorite LLM (ChatGPT, Claude, etc.) to receive your personalized journal prompts.
                </p>

                {/* RESET BUTTON - Runs resetForm() when clicked */}
                <button
                  onClick={resetForm}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Create Another Prompt
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Use this generated prompt with any LLM to receive thoughtful, personalized journal prompts</p>
        </div>
      </div>
    </div>
  );
}
