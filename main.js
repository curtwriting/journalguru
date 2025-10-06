import React, { useState } from 'react';
import { BookOpen, Sparkles, Copy, Check } from 'lucide-react';

export default function JournalPromptGenerator() {
  const [age, setAge] = useState('');
  const [issue, setIssue] = useState('');
  const [lens, setLens] = useState('');
  const [numPrompts, setNumPrompts] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLLMPrompt = () => {
    if (!age || !issue || !lens || !numPrompts) {
      alert('Please fill out all fields before generating your prompt.');
      return;
    }

    const promptCount = numPrompts === '3-5' ? '3 to 5' : numPrompts;
    
    const llmPrompt = `You are a thoughtful journaling coach helping someone develop meaningful self-reflection practices. Please create ${promptCount} journal prompt${numPrompts === '1' ? '' : 's'} for the following person:

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

    setGeneratedPrompt(llmPrompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setAge('');
    setIssue('');
    setLens('');
    setNumPrompts('');
    setGeneratedPrompt('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Journal Prompt Generator</h1>
          </div>
          
          <p className="text-gray-600 text-center mb-8">
            Create personalized journal prompts tailored to your life situation and philosophical perspective
          </p>

          <div className="space-y-6">
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
              </select>
            </div>

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
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many prompts would you like to start with?
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

            <button
              onClick={generateLLMPrompt}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate LLM Prompt
            </button>

            {generatedPrompt && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Your Custom LLM Prompt</h2>
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
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {generatedPrompt}
                  </pre>
                </div>

                <p className="text-sm text-gray-600 italic">
                  Copy this prompt and paste it into your favorite LLM (ChatGPT, Claude, etc.) to receive your personalized journal prompts.
                </p>

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

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Use this generated prompt with any LLM to receive thoughtful, personalized journal prompts</p>
        </div>
      </div>
    </div>
  );
}
