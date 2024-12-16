import React, { useState } from 'react';
import { Question as QuestionType, FormData } from '../types/questionnaire';

interface QuestionProps {
  question: QuestionType;
  value: any;
  onChange: (value: any) => void;
  formData: FormData;
}

export function Question({ question, value, onChange, formData }: QuestionProps) {
  const [otherValue, setOtherValue] = useState('');

  if (question.conditional && 
      formData[question.conditional.dependsOn] !== question.conditional.showIf) {
    return null;
  }

  const renderInput = () => {
    switch (question.type) {
      case 'single':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {question.options?.map((option) => (
              <label
                key={option}
                className={`flex flex-col p-6 rounded-xl border backdrop-blur-lg cursor-pointer 
                  transform transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1
                  shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)]
                  ${value === option 
                    ? 'border-blue-500/50 bg-gradient-to-br from-blue-900/40 to-blue-800/40 shadow-lg shadow-blue-500/20' 
                    : 'border-white/5 bg-gradient-to-br from-gray-900/90 to-gray-800/90 hover:from-gray-800/90 hover:to-gray-700/90'}`}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={value === option}
                    onChange={(e) => onChange(e.target.value)}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${value === option ? 'border-blue-400' : 'border-white/30'}`}>
                    {value === option && (
                      <div className="w-3 h-3 rounded-full bg-blue-400" />
                    )}
                  </div>
                  <span className="ml-3 text-lg font-medium text-white/90">{option}</span>
                </div>
                {option === 'Other' && value === 'Other' && (
                  <input
                    type="text"
                    value={otherValue}
                    onChange={(e) => {
                      setOtherValue(e.target.value);
                      onChange('Other:' + e.target.value);
                    }}
                    className="mt-4 w-full p-2 bg-black/20 border border-white/10 rounded-lg 
                      text-white focus:outline-none focus:border-blue-400"
                    placeholder="Please specify..."
                  />
                )}
              </label>
            ))}
          </div>
        );

      case 'multiple':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {question.options?.map((option) => (
              <label
                key={option}
                className={`flex flex-col p-6 rounded-xl border backdrop-blur-lg cursor-pointer 
                  transform transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1
                  shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)]
                  ${selectedValues.includes(option)
                    ? 'border-blue-500/50 bg-gradient-to-br from-blue-900/40 to-blue-800/40 shadow-lg shadow-blue-500/20'
                    : 'border-white/5 bg-gradient-to-br from-gray-900/90 to-gray-800/90 hover:from-gray-800/90 hover:to-gray-700/90'}`}
              >
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedValues.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...selectedValues, option]);
                      } else {
                        onChange(selectedValues.filter((v: string) => v !== option));
                      }
                    }}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center
                    ${selectedValues.includes(option) ? 'border-blue-400 bg-blue-400' : 'border-white/30'}`}>
                    {selectedValues.includes(option) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="ml-3 text-lg font-medium text-white/90">{option}</span>
                </div>
                {option === 'Other' && selectedValues.includes('Other') && (
                  <input
                    type="text"
                    value={otherValue}
                    onChange={(e) => {
                      setOtherValue(e.target.value);
                      const newValues = selectedValues.filter(v => !v.startsWith('Other:'));
                      onChange([...newValues, 'Other:' + e.target.value]);
                    }}
                    className="mt-4 w-full p-2 bg-black/20 border border-white/10 rounded-lg 
                      text-white focus:outline-none focus:border-blue-400"
                    placeholder="Please specify..."
                  />
                )}
              </label>
            ))}
          </div>
        );

      case 'text':
        return (
          <div>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-4 bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/5 
                rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none 
                resize-none text-white backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)] transition-all duration-300"
              rows={6}
              placeholder="Enter your answer..."
            />
            {question.prompts && (
              <div className="mt-4 p-4 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg 
                rounded-xl space-y-2 border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)] transition-all duration-300">
                <p className="font-medium text-white/90">Consider including:</p>
                {question.prompts.map((prompt, index) => (
                  <p key={index} className="text-white/70">• {prompt}</p>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-medium text-white">
        {question.question}
      </h3>
      {renderInput()}
    </div>
  );
}