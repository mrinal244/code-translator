import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Enhanced mock translation with better language support
const mockTranslate = (sourceCode, sourceLang, targetLang) => {
  // More comprehensive translation patterns
  const translations = {
    'Python': {
      'JavaScript': (code) => {
        return code
          .replace(/def\s+(\w+)\s*\((.*?)\):/g, 'function $1($2) {')
          .replace(/print\s*\((.*?)\)/g, 'console.log($1);')
          .replace(/True/g, 'true')
          .replace(/False/g, 'false')
          .replace(/None/g, 'null')
          .replace(/elif/g, 'else if')
          .replace(/^\s*#(.*)$/gm, '//$1')
          .replace(/:\s*$/gm, ' {')
          .replace(/^\s{4}/gm, '  ') // Convert 4-space to 2-space indentation
          + '\n}';
      },
      'Java': (code) => {
        const className = 'CodeTranslation';
        return `public class ${className} {
    public static void main(String[] args) {
        ${code
          .replace(/def\s+(\w+)\s*\((.*?)\):/g, 'public static void $1($2) {')
          .replace(/print\s*\((.*?)\)/g, 'System.out.println($1);')
          .replace(/True/g, 'true')
          .replace(/False/g, 'false')
          .replace(/None/g, 'null')
          .replace(/^\s*#(.*)$/gm, '//$1')
          .split('\n').map(line => '        ' + line).join('\n')
        }
    }
}`;
      },
      'C++': (code) => {
        return `#include <iostream>
#include <string>
using namespace std;

int main() {
${code
  .replace(/def\s+(\w+)\s*\((.*?)\):/g, 'void $1($2) {')
  .replace(/print\s*\((.*?)\)/g, 'cout << $1 << endl;')
  .replace(/True/g, 'true')
  .replace(/False/g, 'false')
  .replace(/None/g, 'NULL')
  .replace(/^\s*#(.*)$/gm, '//$1')
  .split('\n').map(line => '    ' + line).join('\n')
}
    return 0;
}`;
      },
      'C#': (code) => {
        return `using System;

class Program {
    static void Main() {
${code
  .replace(/def\s+(\w+)\s*\((.*?)\):/g, 'static void $1($2) {')
  .replace(/print\s*\((.*?)\)/g, 'Console.WriteLine($1);')
  .replace(/True/g, 'true')
  .replace(/False/g, 'false')
  .replace(/None/g, 'null')
  .replace(/^\s*#(.*)$/gm, '//$1')
  .split('\n').map(line => '        ' + line).join('\n')
}
    }
}`;
      }
    },
    'JavaScript': {
      'Python': (code) => {
        return code
          .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'def $1($2):')
          .replace(/console\.log\s*\((.*?)\);?/g, 'print($1)')
          .replace(/true/g, 'True')
          .replace(/false/g, 'False')
          .replace(/null/g, 'None')
          .replace(/else if/g, 'elif')
          .replace(/^\s*\/\/(.*)$/gm, '#$1')
          .replace(/\s*\{\s*$/gm, ':')
          .replace(/^\s*\}\s*$/gm, '')
          .replace(/^\s{2}/gm, '    '); // Convert 2-space to 4-space indentation
      },
      'Java': (code) => {
        return `public class CodeTranslation {
    public static void main(String[] args) {
        ${code
          .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'public static void $1($2) {')
          .replace(/console\.log\s*\((.*?)\);?/g, 'System.out.println($1);')
          .replace(/true/g, 'true')
          .replace(/false/g, 'false')
          .replace(/null/g, 'null')
          .split('\n').map(line => '        ' + line).join('\n')
        }
    }
}`;
      }
    },
    'Java': {
      'Python': (code) => {
        return code
          .replace(/public\s+static\s+void\s+(\w+)\s*\((.*?)\)\s*\{/g, 'def $1($2):')
          .replace(/System\.out\.println\s*\((.*?)\);?/g, 'print($1)')
          .replace(/public class.*?\{/g, '')
          .replace(/public static void main.*?\{/g, '')
          .replace(/^\s*\}\s*$/gm, '')
          .replace(/^\s*\/\/(.*)$/gm, '#$1')
          .split('\n')
          .filter(line => line.trim() !== '')
          .map(line => line.replace(/^\s{8}/, '    ').replace(/^\s{4}/, ''))
          .join('\n');
      },
      'JavaScript': (code) => {
        return code
          .replace(/public\s+static\s+void\s+(\w+)\s*\((.*?)\)\s*\{/g, 'function $1($2) {')
          .replace(/System\.out\.println\s*\((.*?)\);?/g, 'console.log($1);')
          .replace(/public class.*?\{/g, '')
          .replace(/public static void main.*?\{/g, '')
          .split('\n')
          .filter(line => line.trim() !== '' && !line.includes('public class'))
          .map(line => line.replace(/^\s{8}/, '  ').replace(/^\s{4}/, ''))
          .join('\n');
      }
    },
    'C++': {
      'Python': (code) => {
        return code
          .replace(/#include.*$/gm, '')
          .replace(/using namespace.*$/gm, '')
          .replace(/int main\(\)\s*\{/g, '')
          .replace(/return 0;/g, '')
          .replace(/void\s+(\w+)\s*\((.*?)\)\s*\{/g, 'def $1($2):')
          .replace(/cout\s*<<\s*(.*?)\s*<<\s*endl;/g, 'print($1)')
          .replace(/cout\s*<<\s*(.*?);/g, 'print($1)')
          .replace(/true/g, 'True')
          .replace(/false/g, 'False')
          .replace(/NULL/g, 'None')
          .replace(/^\s*\/\/(.*)$/gm, '#$1')
          .split('\n')
          .filter(line => line.trim() !== '')
          .map(line => line.replace(/^\s{4}/, ''))
          .join('\n');
      }
    },
    'C#': {
      'Python': (code) => {
        return code
          .replace(/using System;/g, '')
          .replace(/class Program\s*\{/g, '')
          .replace(/static void Main\(\)\s*\{/g, '')
          .replace(/static\s+void\s+(\w+)\s*\((.*?)\)\s*\{/g, 'def $1($2):')
          .replace(/Console\.WriteLine\s*\((.*?)\);?/g, 'print($1)')
          .replace(/true/g, 'True')
          .replace(/false/g, 'False')
          .replace(/null/g, 'None')
          .replace(/^\s*\/\/(.*)$/gm, '#$1')
          .split('\n')
          .filter(line => line.trim() !== '' && !line.includes('}'))
          .map(line => line.replace(/^\s{8}/, '    ').replace(/^\s{4}/, ''))
          .join('\n');
      }
    }
  };

  const sourceTranslations = translations[sourceLang];
  if (sourceTranslations && sourceTranslations[targetLang]) {
    return sourceTranslations[targetLang](sourceCode);
  }
  
  // Generic fallback
  return `// Translated from ${sourceLang} to ${targetLang}
// Note: This is a basic translation. For production use, consider using specialized AI models.

${sourceCode}`;
};

app.post('/translate', (req, res) => {
  try {
    const { sourceCode, sourceLanguage, targetLanguage } = req.body;
    
    console.log(`Translation request: ${sourceLanguage} -> ${targetLanguage}`);
    console.log('Source code length:', sourceCode?.length || 0);
    
    if (!sourceCode || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({ 
        error: 'Missing required parameters: sourceCode, sourceLanguage, targetLanguage' 
      });
    }
    
    if (sourceLanguage === targetLanguage) {
      return res.status(400).json({ 
        error: 'Source and target languages must be different' 
      });
    }
    
    // Simulate processing time (1-2 seconds)
    const processingTime = 1000 + Math.random() * 1000;
    
    setTimeout(() => {
      const translatedCode = mockTranslate(sourceCode, sourceLanguage, targetLanguage);
      
      console.log('Translation completed successfully');
      
      res.json({ 
        translatedCode,
        metadata: {
          sourceLanguage,
          targetLanguage,
          processingTime: Math.round(processingTime),
          timestamp: new Date().toISOString()
        }
      });
    }, processingTime);
    
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ 
      error: 'Internal server error during translation',
      details: error.message 
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    supportedLanguages: ['Python', 'JavaScript', 'Java', 'C++', 'C#']
  });
});

app.get('/languages', (req, res) => {
  res.json({
    supported: ['Python', 'JavaScript', 'Java', 'C++', 'C#'],
    pairs: [
      { from: 'Python', to: ['JavaScript', 'Java', 'C++', 'C#'] },
      { from: 'JavaScript', to: ['Python', 'Java', 'C++', 'C#'] },
      { from: 'Java', to: ['Python', 'JavaScript', 'C++', 'C#'] },
      { from: 'C++', to: ['Python', 'JavaScript', 'Java', 'C#'] },
      { from: 'C#', to: ['Python', 'JavaScript', 'Java', 'C++'] }
    ]
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Mock Translation Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Supported languages: http://localhost:${PORT}/languages`);
});