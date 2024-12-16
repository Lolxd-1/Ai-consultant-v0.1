import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { FormData } from '../types/questionnaire';
import { questionData } from '../data/questions';
import { Question } from './Question';
import { Progress } from './Progress';
import { useQuestionnaireForm } from '../hooks/useQuestionnaireForm';

export function QuestionnaireForm() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { formData, updateFormData } = useQuestionnaireForm();

  const section = questionData[currentSection];
  const question = section.questions[currentQuestion];
  const totalQuestions = questionData.reduce((acc, section) => acc + section.questions.length, 0);
  const currentQuestionNumber = questionData
    .slice(0, currentSection)
    .reduce((acc, section) => acc + section.questions.length, 0) + currentQuestion + 1;

  const handleNext = () => {
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else if (currentSection < questionData.length - 1) {
      setCurrentSection(curr => curr + 1);
      setCurrentQuestion(0);
    }
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    } else if (currentSection > 0) {
      setCurrentSection(curr => curr - 1);
      setCurrentQuestion(questionData[currentSection - 1].questions.length - 1);
    }
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    localStorage.setItem('questionnaireCompleted', 'true');
    window.location.href = '/signup';
  };

  const handleQuestionChange = (value: any) => {
    updateFormData(section.id, question.id, value);
  };

  const isLastQuestion = currentSection === questionData.length - 1 && 
    currentQuestion === section.questions.length - 1;

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="fixed inset-0 -z-10">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="object-cover w-full h-full opacity-30"
        >
          <source 
            src="https://www.apple.com/105/media/us/mac-pro/2019/466faaf3-8832-4c34-8178-59c4f1af8e5e/anim/hero/large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black" />
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <Progress current={currentQuestionNumber} total={totalQuestions} />
        
        <div className="group relative mt-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl 
            blur-xl transition-all duration-500 group-hover:scale-[1.02]" />
          
          <div className="relative bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl 
            rounded-3xl border border-white/10 overflow-hidden transition-all duration-300
            hover:border-white/20 hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)]
            hover:-translate-y-1 transform-gpu">
            
            <div className="p-8">
              <h2 className="text-3xl font-semibold mb-2 text-white bg-clip-text">
                {section.title}
              </h2>
              <p className="text-white/70 mb-8">{section.description}</p>

              <Question
                question={question}
                value={formData[question.id]}
                onChange={handleQuestionChange}
                formData={formData}
              />

              <div className="flex justify-between mt-12">
                <button
                  onClick={handlePrevious}
                  disabled={currentSection === 0 && currentQuestion === 0}
                  className="flex items-center px-6 py-3 text-white/70 hover:text-white 
                    disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>

                {isLastQuestion ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 
                      rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300
                      transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-8 py-3 bg-white text-black rounded-full 
                      hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 
                      active:scale-95 shadow-lg"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}