import React, { useState, useEffect } from 'react';
import { 
  Code, 
  ArrowRight, 
  Copy, 
  Check, 
  Brain, 
  BarChart3, 
  Zap, 
  AlertCircle,
  TrendingUp,
  FileText,
  Sparkles,
  Activity,
  Target,
  Clock,
  Shield
} from 'lucide-react';
import Editor from '@monaco-editor/react';

const LANGUAGES = ['Python', 'C++', 'Java', 'C#', 'JavaScript'];

const SAMPLE_CODE = {
  Python: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load and prepare data
data = pd.read_csv('dataset.csv')
X = data.drop('target', axis=1)
y = data['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict and evaluate
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Model accuracy: {accuracy:.2f}")`,
  'C++': `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

class NeuralNetwork {
private:
    std::vector<std::vector<double>> weights;
    std::vector<double> biases;
    
public:
    double sigmoid(double x) {
        return 1.0 / (1.0 + exp(-x));
    }
    
    std::vector<double> forward(const std::vector<double>& input) {
        std::vector<double> output;
        for (size_t i = 0; i < weights.size(); ++i) {
            double sum = biases[i];
            for (size_t j = 0; j < input.size(); ++j) {
                sum += weights[i][j] * input[j];
            }
            output.push_back(sigmoid(sum));
        }
        return output;
    }
};

int main() {
    NeuralNetwork nn;
    std::vector<double> input = {0.5, 0.3, 0.8};
    auto result = nn.forward(input);
    
    std::cout << "Neural network output: ";
    for (double val : result) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`,
  Java: `import java.util.*;
import java.util.stream.Collectors;

public class DataAnalyzer {
    private List<Double> dataset;
    
    public DataAnalyzer(List<Double> data) {
        this.dataset = new ArrayList<>(data);
    }
    
    public double calculateMean() {
        return dataset.stream()
                     .mapToDouble(Double::doubleValue)
                     .average()
                     .orElse(0.0);
    }
    
    public double calculateStandardDeviation() {
        double mean = calculateMean();
        double variance = dataset.stream()
                                .mapToDouble(x -> Math.pow(x - mean, 2))
                                .average()
                                .orElse(0.0);
        return Math.sqrt(variance);
    }
    
    public List<Double> detectOutliers() {
        double mean = calculateMean();
        double stdDev = calculateStandardDeviation();
        double threshold = 2.0;
        
        return dataset.stream()
                     .filter(x -> Math.abs(x - mean) > threshold * stdDev)
                     .collect(Collectors.toList());
    }
    
    public static void main(String[] args) {
        List<Double> data = Arrays.asList(1.0, 2.0, 3.0, 4.0, 100.0, 5.0, 6.0);
        DataAnalyzer analyzer = new DataAnalyzer(data);
        
        System.out.println("Mean: " + analyzer.calculateMean());
        System.out.println("Standard Deviation: " + analyzer.calculateStandardDeviation());
        System.out.println("Outliers: " + analyzer.detectOutliers());
    }
}`,
  'C#': `using System;
using System.Collections.Generic;
using System.Linq;

public class MLModel {
    private double[] weights;
    private double bias;
    private double learningRate;
    
    public MLModel(int inputSize, double lr = 0.01) {
        weights = new double[inputSize];
        Random rand = new Random();
        for (int i = 0; i < inputSize; i++) {
            weights[i] = rand.NextDouble() * 2 - 1; // Random between -1 and 1
        }
        bias = rand.NextDouble() * 2 - 1;
        learningRate = lr;
    }
    
    public double Predict(double[] input) {
        double sum = bias;
        for (int i = 0; i < input.Length; i++) {
            sum += weights[i] * input[i];
        }
        return Sigmoid(sum);
    }
    
    private double Sigmoid(double x) {
        return 1.0 / (1.0 + Math.Exp(-x));
    }
    
    public void Train(double[] input, double target) {
        double prediction = Predict(input);
        double error = target - prediction;
        
        // Update weights and bias
        for (int i = 0; i < weights.Length; i++) {
            weights[i] += learningRate * error * input[i];
        }
        bias += learningRate * error;
    }
    
    static void Main() {
        MLModel model = new MLModel(2);
        double[] input = {0.5, 0.3};
        double prediction = model.Predict(input);
        Console.WriteLine($"Prediction: {prediction:F4}");
    }
}`,
  JavaScript: `class DataScientist {
    constructor(data) {
        this.data = data;
    }
    
    // Statistical analysis
    mean() {
        return this.data.reduce((sum, val) => sum + val, 0) / this.data.length;
    }
    
    median() {
        const sorted = [...this.data].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0 
            ? (sorted[mid - 1] + sorted[mid]) / 2 
            : sorted[mid];
    }
    
    standardDeviation() {
        const mean = this.mean();
        const variance = this.data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / this.data.length;
        return Math.sqrt(variance);
    }
    
    // Simple linear regression
    linearRegression(xData, yData) {
        const n = xData.length;
        const sumX = xData.reduce((sum, x) => sum + x, 0);
        const sumY = yData.reduce((sum, y) => sum + y, 0);
        const sumXY = xData.reduce((sum, x, i) => sum + x * yData[i], 0);
        const sumXX = xData.reduce((sum, x) => sum + x * x, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        return { slope, intercept };
    }
    
    // Anomaly detection using Z-score
    detectAnomalies(threshold = 2) {
        const mean = this.mean();
        const stdDev = this.standardDeviation();
        
        return this.data.map((value, index) => ({
            index,
            value,
            zScore: Math.abs((value - mean) / stdDev),
            isAnomaly: Math.abs((value - mean) / stdDev) > threshold
        })).filter(item => item.isAnomaly);
    }
}

// Example usage
const dataset = [1, 2, 3, 4, 5, 100, 6, 7, 8, 9, 10];
const ds = new DataScientist(dataset);

console.log('Mean:', ds.mean());
console.log('Median:', ds.median());
console.log('Standard Deviation:', ds.standardDeviation());
console.log('Anomalies:', ds.detectAnomalies());`
};

interface CodeAnalysis {
  complexity: number;
  maintainability: number;
  performance: number;
  security: number;
  aiReadiness: number;
}

interface TranslationMetrics {
  confidence: number;
  executionTime: number;
  codeQuality: number;
  optimizationSuggestions: string[];
}

function App() {
  const [sourceLanguage, setSourceLanguage] = useState('Python');
  const [targetLanguage, setTargetLanguage] = useState('Java');
  const [sourceCode, setSourceCode] = useState(SAMPLE_CODE.Python);
  const [translatedCode, setTranslatedCode] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  // New AI/ML features state
  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysis | null>(null);
  const [translationMetrics, setTranslationMetrics] = useState<TranslationMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);

  // Simulate AI-powered code analysis
  const analyzeCode = async (code: string, language: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock analysis results based on code characteristics
    const lines = code.split('\n').length;
    const complexity = Math.min(100, Math.max(20, lines * 2 + Math.random() * 30));
    const maintainability = Math.max(40, 100 - complexity * 0.5 + Math.random() * 20);
    const performance = Math.max(30, 90 - lines * 0.8 + Math.random() * 25);
    const security = Math.max(50, 85 + Math.random() * 15);
    const aiReadiness = language === 'Python' ? Math.max(70, 90 + Math.random() * 10) : Math.max(40, 70 + Math.random() * 20);
    
    setCodeAnalysis({
      complexity: Math.round(complexity),
      maintainability: Math.round(maintainability),
      performance: Math.round(performance),
      security: Math.round(security),
      aiReadiness: Math.round(aiReadiness)
    });
    
    // Generate AI insights
    const insights = [
      `Code contains ${lines} lines with ${language} syntax patterns`,
      `Detected ${Math.floor(Math.random() * 5) + 1} potential optimization opportunities`,
      `ML/AI compatibility score: ${Math.round(aiReadiness)}%`,
      `Recommended for ${language === 'Python' ? 'data science workflows' : 'enterprise applications'}`
    ];
    setAiInsights(insights);
    
    setIsAnalyzing(false);
  };

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
    setTranslationMetrics(null);

    const startTime = Date.now();

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

      const executionTime = Date.now() - startTime;
      setTranslatedCode(data.translatedCode);
      
      // Generate mock translation metrics
      const confidence = Math.max(75, 95 - Math.random() * 20);
      const codeQuality = Math.max(70, 90 - Math.random() * 20);
      const suggestions = [
        'Consider adding error handling for edge cases',
        'Optimize loops for better performance',
        'Add type annotations for better code clarity',
        'Consider using more efficient data structures'
      ].slice(0, Math.floor(Math.random() * 3) + 1);
      
      setTranslationMetrics({
        confidence: Math.round(confidence),
        executionTime,
        codeQuality: Math.round(codeQuality),
        optimizationSuggestions: suggestions
      });

      // Auto-analyze translated code
      if (showAdvancedFeatures) {
        analyzeCode(data.translatedCode, targetLanguage);
      }

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
    setCodeAnalysis(null);
    setTranslationMetrics(null);
    setAiInsights([]);
  };

  const handleCopy = async () => {
    if (translatedCode) {
      await navigator.clipboard.writeText(translatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  useEffect(() => {
    if (showAdvancedFeatures && sourceCode) {
      analyzeCode(sourceCode, sourceLanguage);
    }
  }, [showAdvancedFeatures, sourceCode, sourceLanguage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Code className="w-12 h-12 text-indigo-600 mr-3" />
              <Sparkles className="w-6 h-6 text-purple-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Code Translator Pro
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-4">
            Advanced AI-powered code translation with ML/Data Science intelligence
          </p>
          
          {/* Feature Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                showAdvancedFeatures 
                  ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' 
                  : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
              }`}
            >
              <Brain className="w-5 h-5" />
              <span>AI Analysis</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Activity className="w-4 h-4" />
              <span>Real-time insights</span>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        {showAdvancedFeatures && (
          <div className="mb-8 bg-white rounded-xl shadow-lg border border-purple-100">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-4 rounded-t-xl">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6" />
                <h2 className="text-xl font-semibold">AI Code Intelligence</h2>
                {isAnalyzing && (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span className="text-sm">Analyzing...</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {codeAnalysis ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${getScoreBg(codeAnalysis.complexity)}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Complexity</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(100 - codeAnalysis.complexity)}`}>
                      {100 - codeAnalysis.complexity}%
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${getScoreBg(codeAnalysis.maintainability)}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Maintainability</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(codeAnalysis.maintainability)}`}>
                      {codeAnalysis.maintainability}%
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${getScoreBg(codeAnalysis.performance)}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Performance</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(codeAnalysis.performance)}`}>
                      {codeAnalysis.performance}%
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${getScoreBg(codeAnalysis.security)}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Security</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(codeAnalysis.security)}`}>
                      {codeAnalysis.security}%
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${getScoreBg(codeAnalysis.aiReadiness)}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">AI Ready</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(codeAnalysis.aiReadiness)}`}>
                      {codeAnalysis.aiReadiness}%
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Enter code to see AI analysis</p>
                </div>
              )}
              
              {aiInsights.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    AI Insights
                  </h3>
                  <ul className="space-y-2">
                    {aiInsights.map((insight, index) => (
                      <li key={index} className="flex items-start space-x-2 text-blue-700">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Language Selection */}
        <div className="flex items-center justify-center mb-8 space-x-4">
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={sourceLanguage}
              onChange={(e) => handleSourceLanguageChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center">
            <ArrowRight className="w-8 h-8 text-indigo-600 mt-6 animate-pulse" />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Source Code ({sourceLanguage})
                </h3>
                {showAdvancedFeatures && (
                  <button
                    onClick={() => analyzeCode(sourceCode, sourceLanguage)}
                    disabled={isAnalyzing}
                    className="flex items-center space-x-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    <Brain className="w-4 h-4" />
                    <span>{isAnalyzing ? 'Analyzing...' : 'Analyze'}</span>
                  </button>
                )}
              </div>
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
                  wordWrap: 'on',
                }}
              />
            </div>
          </div>

          {/* Translated Code Editor */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
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
                  wordWrap: 'on',
                }}
              />
            </div>
          </div>
        </div>

        {/* Translation Metrics */}
        {translationMetrics && showAdvancedFeatures && (
          <div className="mb-6 bg-white rounded-xl shadow-lg border border-green-100">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-4 rounded-t-xl">
              <h3 className="text-lg font-semibold flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Translation Metrics
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Confidence</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {translationMetrics.confidence}%
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Execution Time</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {translationMetrics.executionTime}ms
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Code Quality</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {translationMetrics.codeQuality}%
                  </div>
                </div>
              </div>
              
              {translationMetrics.optimizationSuggestions.length > 0 && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Optimization Suggestions
                  </h4>
                  <ul className="space-y-2">
                    {translationMetrics.optimizationSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2 text-yellow-700">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Translate Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
          >
            {isTranslating ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Translating with AI...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Translate Code</span>
              </div>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Enhanced Footer */}
        <div className="text-center text-gray-600">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-indigo-500" />
              <span>CodeT5 AI Model</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-500" />
              <span>ML Analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-green-500" />
              <span>Real-time Processing</span>
            </div>
          </div>
          <p>Advanced AI-powered code translation with ML/Data Science intelligence</p>
          <p className="text-sm mt-2">Supports Python, C++, Java, C#, and JavaScript with intelligent analysis</p>
        </div>
      </div>
    </div>
  );
}

export default App;