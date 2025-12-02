import React, { useState, useMemo, useEffect } from 'react';
import { STORY_TEXT, ANSWERS, SOUNDCLOUD_SRC } from './constants';
import { BlankInput } from './components/BlankInput';
import { InputStatus, TextSegment } from './types';

function App() {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [validationStatus, setValidationStatus] = useState<{ [key: number]: InputStatus }>({});
  const [score, setScore] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalQuestions = useMemo(() => Object.keys(ANSWERS).length, []);

  // Parse the story text into segments
  const segments: TextSegment[] = useMemo(() => {
    // Regex matches "1. __________" pattern
    const regex = /(\d+)\.\s*__________/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(STORY_TEXT)) !== null) {
      // Push text before the match
      if (match.index > lastIndex) {
        parts.push({
          text: STORY_TEXT.substring(lastIndex, match.index),
        });
      }
      
      // Push the blank info
      const blankNumber = parseInt(match[1], 10);
      // We attach the blank number to the PREVIOUS text segment if possible, 
      // or create a segment that is just a placeholder if it starts with a blank.
      // However, the cleanest way to render is to have segments that *end* with a blank, 
      // or just have an array of mixed types. 
      // Let's modify TextSegment to optionally include a blank at the end.
      
      const prevSegment = parts[parts.length - 1];
      if (prevSegment && prevSegment.blankNumber === undefined) {
         prevSegment.blankNumber = blankNumber;
      } else {
         // Should rarely happen unless text starts with a blank immediately
         parts.push({ text: '', blankNumber });
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < STORY_TEXT.length) {
      parts.push({ text: STORY_TEXT.substring(lastIndex) });
    }

    return parts;
  }, []);

  const handleInputChange = (number: number, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [number]: value }));
    // Reset status to idle when user types to remove red border
    if (validationStatus[number] === InputStatus.INCORRECT) {
        setValidationStatus(prev => {
            const next = { ...prev };
            delete next[number];
            return next;
        });
    }
  };

  const checkAnswers = () => {
    const newStatus: { [key: number]: InputStatus } = {};
    let correctCount = 0;

    Object.keys(ANSWERS).forEach((keyStr) => {
      const key = parseInt(keyStr, 10);
      const userAnswer = (userAnswers[key] || '').trim().toLowerCase();
      const correctAnswer = (ANSWERS[key] || '').trim().toLowerCase();

      // Simple exact match (case insensitive)
      // For "tidying up", allows "tidying up" or "tidying-up"
      const normalizedUser = userAnswer.replace('-', ' ');
      const normalizedCorrect = correctAnswer.replace('-', ' ');

      if (normalizedUser === normalizedCorrect && normalizedUser !== '') {
        newStatus[key] = InputStatus.CORRECT;
        correctCount++;
      } else {
        newStatus[key] = InputStatus.INCORRECT;
      }
    });

    setValidationStatus(newStatus);
    setScore(correctCount);
    
    if (correctCount === totalQuestions) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const resetExercise = () => {
    if (window.confirm("Are you sure you want to clear all your answers?")) {
      setUserAnswers({});
      setValidationStatus({});
      setScore(null);
    }
  };

  // Helper to get surrounding text for AI context
  const getContextForBlank = (segmentIndex: number): string => {
      const prev = segments[segmentIndex]?.text || "";
      const next = segments[segmentIndex + 1]?.text || "";
      // Grab last 50 chars and next 50 chars approximately
      return `...${prev.slice(-60)} [BLANK] ${next.slice(0, 60)}...`.replace(/\n/g, ' ');
  };

  // Calculate score on a 10-point scale
  const scaledScore = score !== null ? ((score / totalQuestions) * 10).toFixed(1).replace(/\.0$/, '') : null;

  return (
    <div className="min-h-screen pb-24">
      {/* Sticky Header with Audio */}
      <header className="sticky top-0 z-40 bg-white shadow-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
             <iframe 
                width="100%" 
                height="120" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay" 
                src={SOUNDCLOUD_SRC}
                title="Audio Player"
                className="block"
            ></iframe>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2 font-serif-text">Date With Destiny</h1>
            <p className="text-slate-500">Listen to the audio and fill in the missing words correctly.</p>
        </div>

        {/* Paper Container */}
        <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg border border-slate-100 font-serif-text text-lg leading-loose text-slate-700">
            {segments.map((segment, index) => (
                <React.Fragment key={index}>
                    <span className="whitespace-pre-wrap">{segment.text}</span>
                    {segment.blankNumber && (
                        <BlankInput
                            number={segment.blankNumber}
                            value={userAnswers[segment.blankNumber] || ''}
                            onChange={(val) => handleInputChange(segment.blankNumber!, val)}
                            status={validationStatus[segment.blankNumber] || InputStatus.IDLE}
                            correctAnswer={ANSWERS[segment.blankNumber]}
                            context={getContextForBlank(index)}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
      </main>

      {/* Sticky Footer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button 
                    onClick={resetExercise}
                    className="text-slate-500 hover:text-red-600 text-sm font-semibold transition-colors"
                >
                    Reset
                </button>
                {score !== null && (
                    <div className="text-lg font-bold">
                        Score: <span className={score === totalQuestions ? "text-green-600" : "text-blue-600"}>{scaledScore}</span> / 10
                    </div>
                )}
            </div>
            
            <button
                onClick={checkAnswers}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform transform active:scale-95"
            >
                Check Answers
            </button>
        </div>
      </div>

      {/* Confetti Effect (CSS only for simplicity) */}
      {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 animate-bounce text-6xl">🎉</div>
              <div className="absolute top-10 left-10 animate-pulse text-6xl">✨</div>
              <div className="absolute top-10 right-10 animate-pulse text-6xl">✨</div>
          </div>
      )}
    </div>
  );
}

export default App;