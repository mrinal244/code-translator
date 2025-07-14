import React, { useState } from 'react';
import { Code, ArrowRight, Copy, Check } from 'lucide-react';
import Editor from '@monaco-editor/react';

const LANGUAGES = ['Python', 'C++', 'Java', 'C#', 'JavaScript'];

const SAMPLE_CODE = {
  Python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`,
  'C++': `#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    cout << fibonacci(10) << endl;
    return 0;
}`,
  Java: `public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n-1) + fibonacci(n-2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
    }
}`,
  'C#': `using System;

class Program {
    static int Fibonacci(int n) {
        if (n <= 1) return n;
        return Fibonacci(n-1) + Fibonacci(n-2);
    }
    
    static void Main() {
        Console.WriteLine(Fibonacci(10));
    }
}`,
  JavaScript: `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

console.log(fibonacci(10));`
};

function App() {
  const [sourceLanguage, setSourceLanguage] = useState('Python');
  const [targetLanguage, setTargetLanguage] = useState('Java');
  const [sourceCode, setSourceCode] = useState(SAMPLE_CODE.Python);
  const [translatedCode, setTranslatedCode] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceCode.trim()) {
      setError('Please enter some code to translate');
      return;
    }

    if (sourceLanguage === targetLanguage) {
      setError('Source and target languages must be different');
      return;
    }

    setIsTranslating(true);
    setError('');
    setTranslatedCode('');

    try {
      const response = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceCode,
          sourceLanguage,
          targetLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      setTranslatedCode(data.translatedCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during translation');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSourceLanguageChange = (lang: string) => {
    setSourceLanguage(lang);
    setSourceCode(SAMPLE_CODE[lang as keyof typeof SAMPLE_CODE]);
    setTranslatedCode('');
    setError('');
  };

  const handleCopy = async () => {
    if (translatedCode) {
      await navigator.clipboard.writeText(translatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Code className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Code Translator</h1>
          </div>
          <p className="text-gray-600 text-lg">
            AI-powered code translation between Python, C++, Java, C#, and JavaScript
          </p>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={sourceLanguage}
              onChange={(e) => handleSourceLanguageChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <ArrowRight className="w-8 h-8 text-indigo-600 mt-6" />

          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {LANGUAGES.filter((lang) => lang !== sourceLanguage).map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Code Editors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Source Code Editor */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                Source Code ({sourceLanguage})
              </h3>
            </div>
            <div className="h-96">
              <Editor
                height="100%"
                language={sourceLanguage.toLowerCase() === 'c++' ? 'cpp' : sourceLanguage.toLowerCase() === 'c#' ? 'csharp' : sourceLanguage.toLowerCase()}
                value={sourceCode}
                onChange={(value) => setSourceCode(value || '')}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          {/* Translated Code Editor */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Translated Code ({targetLanguage})
              </h3>
              {translatedCode && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="h-96">
              <Editor
                height="100%"
                language={targetLanguage.toLowerCase() === 'c++' ? 'cpp' : targetLanguage.toLowerCase() === 'c#' ? 'csharp' : targetLanguage.toLowerCase()}
                value={translatedCode}
                theme="vs-light"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        </div>

        {/* Translate Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isTranslating ? 'Translating...' : 'Translate Code'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-600">
          <p>Powered by CodeT5 AI Model • Supports Python, C++, Java, C#, and JavaScript</p>
        </div>
      </div>
    </div>
  );
}

export default App;