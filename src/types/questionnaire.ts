export type QuestionType = 'single' | 'multiple' | 'text' | 'number' | 'table' | 'conditional';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  conditional?: {
    dependsOn: string;
    showIf: any;
  };
  prompts?: string[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface FormData {
  [key: string]: any;
}