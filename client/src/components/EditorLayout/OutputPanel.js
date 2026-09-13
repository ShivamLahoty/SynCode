import React, { useState } from 'react';

const OutputPanel = ({ output, isError, currentLanguage, onClear, previewData, onRunWithInput }) => {
  const [userInput, setUserInput] = useState('');
  const [showInputSection, setShowInputSection] = useState(false);

  const needsInput = ['python', 'cpp', 'java'].includes(currentLanguage);

  const handleRunWithInput = () => {
    console.log('=== OutputPanel: Running code with input ===');
    console.log('Input value:', JSON.stringify(userInput));
    console.log('Input length:', userInput.length);
    console.log('Input lines:', userInput.split('\n'));
    
    if (onRunWithInput) {
      onRunWithInput(userInput);
    } else {
      console.error('onRunWithInput function not provided');
    }
  };

  const clearOutput = () => {
    if (onClear) {
      onClear();
      setUserInput('');
    }
  };

  return (
    <div className="w-full h-full bg-zinc-900 flex flex-col">
      {/* Output Header */}
      <div className="bg-zinc-800/50 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-sm font-medium text-zinc-200">
            {previewData?.isPreview ? 'Preview' : 'Output'}
          </h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide
            ${previewData?.isPreview 
              ? 'bg-emerald-500/15 text-emerald-400' 
              : 'bg-zinc-700 text-zinc-400'
            }`}>
            {previewData?.isPreview ? 'Live' : currentLanguage}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {needsInput && (
            <button 
              onClick={() => setShowInputSection(!showInputSection)}
              className={`text-xs px-2.5 py-1 rounded-lg transition-all duration-200 flex items-center space-x-1.5
                         ${showInputSection 
                           ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30' 
                           : 'bg-zinc-800 text-zinc-400 hover:text-zinc-300 border border-zinc-700'
                         }`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Input</span>
            </button>
          )}
          
          <button 
            onClick={clearOutput}
            className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-400 
                       hover:text-zinc-300 border border-zinc-700 transition-all duration-200"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Input Section */}
      {needsInput && showInputSection && (
        <div className="bg-zinc-800/30 border-b border-zinc-800 p-4">
          <div className="space-y-3">
            <label className="text-xs text-zinc-400 font-medium">Program Input</label>
            <div className="flex space-x-2">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter input (each line = separate input)..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 
                         text-zinc-200 text-sm font-mono placeholder-zinc-600
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
                         custom-scrollbar resize-none transition-all duration-200"
                rows={3}
              />
              <button
                onClick={handleRunWithInput}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm 
                         font-medium rounded-lg transition-all duration-200 self-end"
              >
                Run
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Output Content */}
      <div className={`flex-1 overflow-hidden flex flex-col ${isError ? 'bg-red-500/5' : ''}`}>
        {/* Text Output */}
        {output && (
          <div className="p-4 border-b border-zinc-800 overflow-y-auto flex-1 custom-scrollbar">
            <pre className={`font-mono text-sm leading-relaxed whitespace-pre-wrap
                            ${isError ? 'text-red-400' : 'text-zinc-300'}`}>
              {output}
            </pre>
          </div>
        )}

        {/* HTML/CSS Preview */}
        {previewData?.isPreview && previewData.htmlContent ? (
          <div className="flex-1 bg-white overflow-hidden">
            <iframe
              srcDoc={previewData.htmlContent}
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin"
              title={`${previewData.previewType} Preview`}
            />
          </div>
        ) : !output ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-zinc-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-zinc-500">No output yet</p>
              <p className="text-xs text-zinc-600 mt-1">
                {currentLanguage === 'html' || currentLanguage === 'css' 
                  ? 'Run code to see live preview'
                  : 'Run code to see output'
                }
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OutputPanel;
