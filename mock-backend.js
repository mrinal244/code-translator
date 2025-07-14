const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock translation logic with basic patterns
const mockTranslate = (sourceCode, sourceLang, targetLang) => {
  // Simple mock translations with basic patterns
  const translations = {
    'Python-JavaScript': (code) => {
      return code
        .replace(/def\s+(\w+)\s*\(/g, 'function $1(')
        .replace(/:\s*$/gm, ' {')
        .replace(/print\(/g, 'console.log(')
        .replace(/True/g, 'true')
        .replace(/False/g, 'false')
        .replace(/None/g, 'null')
        .replace(/elif/g, 'else if')
        .replace(/^\s*#/gm, '//')
        + '\n}';
    },
    'JavaScript-Python': (code) => {
      return code
        .replace(/function\s+(\w+)\s*\(/g, 'def $1(')
        .replace(/\s*\{\s*$/gm, ':')
        .replace(/console\.log\(/g, 'print(')
        .replace(/true/g, 'True')
        .replace(/false/g, 'False')
        .replace(/null/g, 'None')
        .replace(/else if/g, 'elif')
        .replace(/^\s*\/\//gm, '#')
        .replace(/\}$/gm, '');
    },
    'Python-Java': (code) => {
      return `public class Main {
    public static void main(String[] args) {
        ${code
          .replace(/def\s+(\w+)\s*\(/g, 'public static void $1(')
          .replace(/print\(/g, 'System.out.println(')
          .replace(/True/g, 'true')
          .replace(/False/g, 'false')
          .replace(/:\s*$/gm, ' {')
        }
    }
}`;
    },
    'Java-Python': (code) => {
      return code
        .replace(/public\s+static\s+void\s+(\w+)\s*\(/g, 'def $1(')
        .replace(/System\.out\.println\(/g, 'print(')
        .replace(/true/g, 'True')
        .replace(/false/g, 'False')
        .replace(/\s*\{\s*$/gm, ':')
        .replace(/public class.*?\{/g, '')
        .replace(/\}$/gm, '');
    },
    'Python-C++': (code) => {
      return `#include <iostream>
using namespace std;

int main() {
    ${code
      .replace(/def\s+(\w+)\s*\(/g, 'void $1(')
      .replace(/print\(/g, 'cout << ')
      .replace(/True/g, 'true')
      .replace(/False/g, 'false')
      .replace(/:\s*$/gm, ' {')
    }
    return 0;
}`;
    },
    'C++-Python': (code) => {
      return code
        .replace(/void\s+(\w+)\s*\(/g, 'def $1(')
        .replace(/cout\s*<<\s*/g, 'print(')
        .replace(/true/g, 'True')
        .replace(/false/g, 'False')
        .replace(/\s*\{\s*$/gm, ':')
        .replace(/#include.*$/gm, '')
        .replace(/using namespace.*$/gm, '')
        .replace(/int main\(\).*?\{/g, '')
        .replace(/return 0;/g, '')
        .replace(/\}$/gm, '');
    },
    'Python-C#': (code) => {
      return `using System;

class Program {
    static void Main() {
        ${code
          .replace(/def\s+(\w+)\s*\(/g, 'static void $1(')
          .replace(/print\(/g, 'Console.WriteLine(')
          .replace(/True/g, 'true')
          .replace(/False/g, 'false')
          .replace(/:\s*$/gm, ' {')
        }
    }
}`;
    },
    'C#-Python': (code) => {
      return code
        .replace(/static\s+void\s+(\w+)\s*\(/g, 'def $1(')
        .replace(/Console\.WriteLine\(/g, 'print(')
        .replace(/true/g, 'True')
        .replace(/false/g, 'False')
        .replace(/\s*\{\s*$/gm, ':')
        .replace(/using System;/g, '')
        .replace(/class Program.*?\{/g, '')
        .replace(/static void Main\(\).*?\{/g, '')
        .replace(/\}$/gm, '');
    }
  };

  const key = `${sourceLang}-${targetLang}`;
  const translator = translations[key];
  
  if (translator) {
    return translator(sourceCode);
  }
  
  // Fallback: return source code with a comment
  return `// Translated from ${sourceLang} to ${targetLang}\n${sourceCode}`;
};

app.post('/translate', (req, res) => {
  try {
    const { sourceCode, sourceLanguage, targetLanguage } = req.body;
    
    if (!sourceCode || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    if (sourceLanguage === targetLanguage) {
      return res.status(400).json({ error: 'Source and target languages must be different' });
    }
    
    // Simulate processing time
    setTimeout(() => {
      const translatedCode = mockTranslate(sourceCode, sourceLanguage, targetLanguage);
      res.json({ translatedCode });
    }, 1000);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
});