import React from 'react';
import { Question } from '../../../types/questionnaire';

interface QuestionResponseProps {
  question: Question;
  response: any;
}

export function QuestionResponse({ question, response }: QuestionResponseProps) {
  const renderResponse = () => {
    if (!response) {
      return <p className="text-white/50 italic">No response provided</p>;
    }

    if (Array.isArray(response)) {
      return (
        <ul className="space-y-1">
          {response.map((item, index) => (
            <li key={index} className="text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return <p className="text-white">{response}</p>;
  };

  return (
    <div className="group bg-white/5 rounded-2xl p-6 transition-all duration-300
      hover:bg-white/[0.07] hover:shadow-lg hover:shadow-white/5">
      <h3 className="text-lg font-medium text-white mb-4 group-hover:text-blue-400 transition-colors">
        {question.question}
      </h3>

      <div className="pl-4 border-l-2 border-white/10 group-hover:border-blue-500/30 transition-colors">
        {renderResponse()}
      </div>

      {question.options && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-white/50 mb-2">Available Options:</p>
          <div className="flex flex-wrap gap-2">
            {question.options.map((option, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-white/5 text-white/70"
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}