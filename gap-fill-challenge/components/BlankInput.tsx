import React, { useState } from 'react';
import { InputStatus } from '../types';
import { getHintForBlank } from '../services/geminiService';

interface BlankInputProps {
  number: number;
  value: string;
  onChange: (value: string) => void;
  status: InputStatus;
  correctAnswer: string;
  context: string;
}

export const BlankInput: React.FC<BlankInputProps> = ({ 
  number, 
  value, 
  onChange, 
  status, 
  correctAnswer,
  context 
}) => {
  const [hint, setHint] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const fetchHint = async () => {
    if (hint) return; // Already have a hint
    setIsLoadingHint(true);
    const result = await getHintForBlank(context, number, correctAnswer.charAt(0));
    setHint(result);
    setIsLoadingHint(false);
  };

  // Dynamic border color based on status
  const getBorderColor = () => {
    switch (status) {
      case InputStatus.CORRECT: return 'border-green-500 bg-green-50 text-green-900';
      case InputStatus.INCORRECT: return 'border-red-500 bg-red-50 text-red-900';
      default: return 'border-blue-300 focus:border-blue-600 focus:bg-white bg-slate-50';
    }
  };

  return (
    <span className="inline-flex flex-col align-top mx-1 mb-2 relative group">
      <span className="relative">
        <span className="absolute -top-2 -left-1 text-[10px] font-bold text-slate-500 bg-white px-0.5 rounded-full border border-slate-200 z-10">
          {number}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={status === InputStatus.CORRECT}
          className={`
            h-8 px-2 pt-1 pb-0 min-w-[100px] w-[14ch] 
            text-sm font-medium rounded-md border-b-2 outline-none transition-colors
            ${getBorderColor()}
          `}
          autoComplete="off"
          placeholder="..."
        />
        {/* Helper Icon */}
        {status !== InputStatus.CORRECT && (
          <button 
            onClick={fetchHint}
            className="absolute -top-3 -right-2 text-blue-400 hover:text-blue-600 transition-colors bg-white rounded-full p-0.5 shadow-sm"
            title="Get a hint from AI"
          >
            {isLoadingHint ? (
              <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}
      </span>
      
      {/* Hint Tooltip */}
      {hint && status !== InputStatus.CORRECT && (
        <span className="absolute bottom-full mb-2 left-0 w-48 bg-blue-900 text-white text-xs p-2 rounded shadow-lg z-50 pointer-events-none">
          <span className="font-bold block mb-1">Hint:</span>
          {hint}
          <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-blue-900"></div>
        </span>
      )}
    </span>
  );
};
