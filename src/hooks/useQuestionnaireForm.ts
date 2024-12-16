import { useState } from 'react';
import { FormData } from '../types/questionnaire';
import { getOrCreateSession, saveResponse } from '../lib/supabase';

export function useQuestionnaireForm() {
  const [formData, setFormData] = useState<FormData>({});
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Initialize session
  useState(() => {
    const initSession = async () => {
      try {
        const sid = await getOrCreateSession();
        setSessionId(sid);
      } catch (error) {
        console.error('Failed to initialize session:', error);
      }
    };

    initSession();
  });

  const updateFormData = async (sectionId: string, questionId: string, value: any) => {
    if (!sessionId) return;

    try {
      await saveResponse(sessionId, sectionId, questionId, value);
      
      const newFormData = {
        ...formData,
        [questionId]: value,
      };
      setFormData(newFormData);
    } catch (error) {
      console.error('Failed to save response:', error);
    }
  };

  return {
    formData,
    updateFormData,
  };
}