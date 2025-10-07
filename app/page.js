'use client'
// ============================================================
// IMPORTS - These are tools and icons we're bringing in to use
// ============================================================
import React, { useState } from 'react';
// Import icons from lucide-react library for visual elements
import { Sparkles, Copy, Check, Loader2 } from 'lucide-react';

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
  const [generatedPrompts, setGeneratedPrompts] = useState(''); // Stores the journal prompts from Claude
  const [loading, setLoading] = useState(false);         // Tracks if we're waiting for Claude's response
  const [error, setError] = useState('');                // Stores any error messages
  const [copied, setCopied] = useState(false);           // Tracks if the copy button was clicked

  // ============================================================
  // FUNCTION 1: Generate Journal Prompts using Claude API
  // This runs when the user clicks "Generate Journal Prompts" button
  // ============================================================
  const generatePrompts = async () => {
    // Check if all fields are filled out - if not, show an alert
    if (!age || !issue || !lens || !numPrompts) {
      alert('Please fill out all fields before generating your prompts.');
      return;
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

    // Show loading state
    setLoading(true);
    setError('');
    setGeneratedPrompts('');

    try {
      // Call the backend API
      // IMPORTANT: Change this URL to match your backend server location
      // If running locally, use: http://localhost:3001/api/generate-prompts
      // If deployed, use your deployed backend URL
      const response = await fetch('http://localhost:3001/api/generate-prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age,
          issue: finalIssue,
          lens: finalLens,
          numPrompts,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate prompts. Please try again.');
      }

      const data = await response.json();
      setGeneratedPrompts(data.prompts);
    } catch (err) {
      setError(err.message || 'An error occurred. Please make sure your backend server is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // FUNCTION 2: Copy to Clipboard
  // This runs when user clicks the "Copy" button
  // ============================================================
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompts);
    setCopied(true);
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
    setGeneratedPrompts('');
    setError('');
  };

  // ============================================================
  // RENDER - This is what actually shows on the screen
  // ============================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          
          {/* ============================================================ */}
          {/* HEADER SECTION - Logo */}
          {/* ============================================================ */}
          <div className="flex flex-col items-center justify-center mb-6">
            {/* SVG LOGO - Journal Guru */}
            <svg 
              viewBox="0 0 300 200" 
              className="w-64 h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Circle border */}
              <circle cx="150" cy="90" r="70" fill="none" stroke="#0a3d52" strokeWidth="8"/>
              
              {/* Radiating beams behind typewriter */}
              <g opacity="1">
                {/* Top beams */}
                <rect x="147" y="35" width="6" height="15" fill="#1db4e8" transform="rotate(-90 150 45)"/>
                <rect x="147" y="35" width="6" height="15" fill="#1db4e8" transform="rotate(-60 150 45)"/>
                <rect x="147" y="35" width="6" height="15" fill="#1db4e8" transform="rotate(-30 150 45)"/>
                <rect x="147" y="35" width="6" height="15" fill="#1db4e8" transform="rotate(0 150 45)"/>
                <rect x="147" y="35" width="6" height="15" fill="#1db4e8" transform="rotate(30 150 45)"/>
                <rect x="147" y="35" width="6" height="15" fill="#1db4e8" transform="rotate(60 150 45)"/>
                <rect x="147" y="35" width="6" height="15" fill="#1db4e8" transform="rotate(90 150 45)"/>
                
                {/* Side beams - left */}
                <rect x="95" y="87" width="25" height="6" fill="#1db4e8"/>
                <rect x="95" y="77" width="25" height="6" fill="#1db4e8" transform="rotate(-15 107 80)"/>
                <rect x="95" y="97" width="25" height="6" fill="#1db4e8" transform="rotate(15 107 100)"/>
                
                {/* Side beams - right */}
                <rect x="180" y="87" width="25" height="6" fill="#1db4e8"/>
                <rect x="180" y="77" width="25" height="6" fill="#1db4e8" transform="rotate(15 193 80)"/>
                <rect x="180" y="97" width="25" height="6" fill="#1db4e8" transform="rotate(-15 193 100)"/>
              </g>
              
              {/* Bottom radiating trapezoids */}
              <g opacity="1">
                <polygon points="115,115 110,140 120,140" fill="#1db4e8"/>
                <polygon points="125,115 122,140 132,140" fill="#1db4e8"/>
                <polygon points="135,115 134,140 144,140" fill="#1db4e8"/>
                <polygon points="145,115 146,140 156,140" fill="#1db4e8"/>
                <polygon points="155,115 158,140 168,140" fill="#1db4e8"/>
                <polygon points="165,115 170,140 180,140" fill="#1db4e8"/>
                <polygon points="175,115 182,140 190,140" fill="#1db4e8"/>
              </g>
              
              {/* Typewriter body - main trapezoid shape */}
              <path d="M 115 75 L 110 115 L 190 115 L 185 75 Z" fill="#0a3d52"/>
              
              {/* Typewriter top section where paper feeds */}
              <rect x="125" y="55" width="50" height="25" fill="#1db4e8" rx="2"/>
              <rect x="128" y="58" width="44" height="19" fill="#0a3d52" rx="1"/>
              
              {/* Paper in typewriter */}
              <rect x="135" y="45" width="30" height="25" fill="white" stroke="#0a3d52" strokeWidth="2"/>
              
              {/* Typewriter roller bar */}
              <rect x="130" y="52" width="40" height="3" fill="#0a3d52"/>
              
              {/* Keyboard keys (dots) */}
              <g fill="#1db4e8">
                <circle cx="125" cy="92" r="2"/>
                <circle cx="135" cy="92" r="2"/>
                <circle cx="145" cy="92" r="2"/>
                <circle cx="155" cy="92" r="2"/>
                <circle cx="165" cy="92" r="2"/>
                <circle cx="175" cy="92" r="2"/>
                
                <circle cx="130" cy="100" r="2"/>
                <circle cx="140" cy="100" r="2"/>
                <circle cx="150" cy="100" r="2"/>
                <circle cx="160" cy="100" r="2"/>
                <circle cx="170" cy="100" r="2"/>
              </g>
              
              {/* "JOURNAL GURU" text */}
              <text x="150" y="195" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#1db4e8" textAnchor="middle" letterSpacing="2">
                JOURNAL GURU
              </text>
            </svg>
          </div>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-center mb-8">
            Get personalized journal prompts powered by Claude AI
          </p>

          {/* ============================================================ */}
          {/* FORM SECTION */}
          {/* ============================================================ */}
          <div className="space-y-6">
            
            {/* DROPDOWN 1: Age Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your age?
              </label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
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
                onChange={(e) => setIssue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select an issue to explore</option>
                <option value="Being More Present">Being More Present</option>
                <option value="recent health diagnosis">Recent Health Diagnosis</option>
                <option value="new job">New Job</option>
                <option value="Other">Other (specify below)</option>
              </select>

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
                onChange={(e) => setLens(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select a philosophical lens</option>
                <option value="christian">Christian</option>
                <option value="stoic">Stoic</option>
                <option value="budism">Buddhism</option>
                <option value="rastafarianism">Rastafarianism</option>
                <option value="Other">Other (specify below)</option>
              </select>

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
                How many prompts would you like?
              </label>
              <select
                value={numPrompts}
                onChange={(e) => setNumPrompts(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select number of prompts</option>
                <option value="1">1</option>
                <option value="3-5">3-5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>

            {/* GENERATE BUTTON */}
            <button
              onClick={generatePrompts}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Your Prompts...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Journal Prompts
                </>
              )}
            </button>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
                <p className="text-red-600 text-xs mt-2">
                  Make sure your backend server is running on http://localhost:3001
                </p>
              </div>
            )}

            {/* ============================================================ */}
            {/* RESULTS SECTION */}
            {/* ============================================================ */}
            {generatedPrompts && (
              <div className="mt-8 space-y-4">
                
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Your Journal Prompts</h2>
                  
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
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
                
                <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                  <div className="whitespace-pre-wrap text-sm text-gray-700">
                    {generatedPrompts}
                  </div>
                </div>

                <button
                  onClick={resetForm}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Generate New Prompts
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Powered by Claude AI • Your prompts are generated in real-time</p>
        </div>
      </div>
    </div>
  );
}
