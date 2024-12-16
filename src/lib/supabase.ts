import { createClient } from '@supabase/supabase-js';
import type { BusinessReport } from './report';

const supabaseUrl = 'https://vmhsyjugjqfawyfragvs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtaHN5anVnanFmYXd5ZnJhZ3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwMzM5MjksImV4cCI6MjA0NzYwOTkyOX0.YY9pVXynWyF9JsHSoQXUq2vT-h7Me3zIwMsmACHPFsw';

// Initialize Supabase with retry logic
const initSupabase = () => {
  try {
    return createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'X-Client-Info': 'ai-consultant'
        }
      }
    });
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return null;
  }
};

export const supabase = initSupabase();

// Helper function to handle Supabase operations with fallback
const handleSupabaseOperation = async <T>(
  operation: () => Promise<T>,
  fallback: T,
  storageKey?: string
): Promise<T> => {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    const result = await operation();
    if (storageKey && result) {
      localStorage.setItem(storageKey, JSON.stringify(result));
    }
    return result;
  } catch (error) {
    console.error('Supabase operation failed:', error);
    if (storageKey) {
      const localData = localStorage.getItem(storageKey);
      if (localData) {
        try {
          return JSON.parse(localData);
        } catch (parseError) {
          console.error('Failed to parse local data:', parseError);
        }
      }
    }
    return fallback;
  }
};

// Helper function to get or create a session
export async function getOrCreateSession(): Promise<string> {
  let sessionId = localStorage.getItem('sessionId');

  if (!sessionId) {
    sessionId = `local_${Date.now()}`;
    
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('sessions')
          .insert([{ created_at: new Date().toISOString() }])
          .select('id')
          .single();

        if (!error && data) {
          sessionId = data.id;
        }
      } catch (error) {
        console.error('Failed to create session in Supabase:', error);
      }
    }

    localStorage.setItem('sessionId', sessionId);
  }

  return sessionId;
}

// Helper function to save questionnaire response
export async function saveResponse(
  sessionId: string,
  sectionId: string,
  questionId: string,
  answer: any
): Promise<void> {
  const storageKey = `response_${sessionId}_${sectionId}_${questionId}`;
  const data = { answer: JSON.stringify(answer) };

  await handleSupabaseOperation(
    async () => {
      if (supabase) {
        await supabase
          .from('responses')
          .delete()
          .match({
            session_id: sessionId,
            section_id: sectionId,
            question_id: questionId
          });

        await supabase
          .from('responses')
          .insert({
            session_id: sessionId,
            section_id: sectionId,
            question_id: questionId,
            answer: JSON.stringify(answer)
          });
      }
    },
    undefined,
    storageKey
  );
}

// Helper function to save business report
export async function saveBusinessReport(
  sessionId: string,
  report: BusinessReport
): Promise<void> {
  const storageKey = `report_${sessionId}`;

  await handleSupabaseOperation(
    async () => {
      if (supabase) {
        await supabase
          .from('business_reports')
          .delete()
          .match({ session_id: sessionId });

        await supabase
          .from('business_reports')
          .insert({
            session_id: sessionId,
            report: JSON.stringify(report),
            created_at: new Date().toISOString()
          });
      }
    },
    undefined,
    storageKey
  );
}

// Helper function to fetch business report
export async function fetchBusinessReport(
  sessionId: string
): Promise<BusinessReport | null> {
  const storageKey = `report_${sessionId}`;

  return handleSupabaseOperation(
    async () => {
      if (!supabase) return null;
      
      const { data, error } = await supabase
        .from('business_reports')
        .select('report')
        .eq('session_id', sessionId)
        .single();

      if (error || !data) return null;
      return JSON.parse(data.report);
    },
    null,
    storageKey
  );
}

// Helper function to save chat message
export async function saveChatMessage(
  sessionId: string,
  profile: string,
  role: 'user' | 'assistant',
  content: string
): Promise<void> {
  const storageKey = `chat_${sessionId}`;
  const message = {
    profile,
    role,
    content,
    created_at: new Date().toISOString()
  };

  await handleSupabaseOperation(
    async () => {
      if (supabase) {
        await supabase
          .from('chat_messages')
          .insert(message);
      }
    },
    undefined,
    storageKey
  );
}

// Helper function to save goal
export async function saveGoal(
  sessionId: string,
  text: string
): Promise<void> {
  const storageKey = `goals_${sessionId}`;
  const goal = {
    session_id: sessionId,
    text,
    completed: false,
    created_at: new Date().toISOString()
  };

  await handleSupabaseOperation(
    async () => {
      if (supabase) {
        await supabase
          .from('goals')
          .insert(goal);
      }
    },
    undefined,
    storageKey
  );
}

// Helper function to update goal status
export async function updateGoalStatus(
  goalId: string,
  completed: boolean
): Promise<void> {
  const sessionId = localStorage.getItem('sessionId');
  const storageKey = sessionId ? `goals_${sessionId}` : null;

  await handleSupabaseOperation(
    async () => {
      if (supabase) {
        await supabase
          .from('goals')
          .update({ completed })
          .eq('id', goalId);
      }
    },
    undefined,
    storageKey
  );
}

// Helper function to delete goal
export async function deleteGoal(
  goalId: string
): Promise<void> {
  const sessionId = localStorage.getItem('sessionId');
  const storageKey = sessionId ? `goals_${sessionId}` : null;

  await handleSupabaseOperation(
    async () => {
      if (supabase) {
        await supabase
          .from('goals')
          .delete()
          .eq('id', goalId);
      }
    },
    undefined,
    storageKey
  );
}

// Helper function to fetch chat history
export async function fetchChatHistory(
  sessionId: string
): Promise<any[]> {
  const storageKey = `chat_${sessionId}`;

  return handleSupabaseOperation(
    async () => {
      if (!supabase) return [];

      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error || !data) return [];
      return data;
    },
    [],
    storageKey
  );
}

// Helper function to fetch goals
export async function fetchGoals(
  sessionId: string
): Promise<any[]> {
  const storageKey = `goals_${sessionId}`;

  return handleSupabaseOperation(
    async () => {
      if (!supabase) return [];

      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error || !data) return [];
      return data;
    },
    [],
    storageKey
  );
}