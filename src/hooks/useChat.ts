import { useState, useCallback } from 'react';
import { getReport } from '../lib/report';
import { getOrCreateSession } from '../lib/supabase';
import type { BusinessReport } from '../lib/report';

// API keys for different profiles
const API_KEYS: Record<string, string> = {
  finance: 'AIzaSyBo-2gZG4ZILRyAyxNXe9wCbla9a3pe60Q',
  sales: 'AIzaSyBTcGhYpyt2_Hxgh1SVqvHyrs5Vusp_iao',
  hr: 'AIzaSyCj0FRKmWU32bCgKLRQryyC8rwOkQ5Q4VE',
  business: 'AIzaSyCHizr_5axThfc05t-_GJtpk3ghJPhZWRM',
  strategy: 'AIzaSyAhQXALXetH0AQulYJXxLtw4WOR31JYPtg'
};

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface ChatResponse {
  role: 'assistant';
  content: string;
}

// Helper function to safely format lists
const formatList = (items: string[] | undefined): string => {
  if (!items || items.length === 0) return 'None specified';
  if (items.length === 1) return items[0];
  const lastItem = items[items.length - 1];
  const otherItems = items.slice(0, -1);
  return `${otherItems.join(', ')} and ${lastItem}`;
};

// Helper function to generate profile-specific instructions
const getProfileInstructions = (profile: string, report: BusinessReport): string => {
  const baseContext = `
BUSINESS ANALYSIS REPORT

1. BUSINESS OVERVIEW
   • Type of Business: ${report.overview?.businessType || 'Not specified'}
   • Target Customer Base: ${formatList(report.overview?.targetAudience)}
   • Available Services: ${formatList(report.overview?.services)}

2. OPERATIONAL DETAILS
   • Peak Business Hours: ${formatList(report.operations?.peakHours)}
   • Seasonal Peak Periods: ${formatList(report.operations?.peakSeasons)}
   • Current Management Structure: ${report.operations?.staffing?.management || 'Not specified'}
   • Staff Average Monthly Salary: ${report.operations?.staffing?.avgSalary || 'Not specified'}

3. FINANCIAL OVERVIEW
   • Active Revenue Streams: ${formatList(report.financial?.revenue?.streams)}
   • Sales Target Achievement Rate: ${report.financial?.revenue?.targetAchievement || 'Not specified'}
   • Current Debt Status: ${report.financial?.debt?.exists ? `Yes - Amount: ${report.financial.debt.amount}` : 'No outstanding debt'}
   • Major Monthly Expenses: ${formatList(report.financial?.expenses)}

4. MARKETING AND PRICING
   • Active Marketing Channels: ${formatList(report.marketing?.strategies)}
   • Analytics Implementation: ${report.marketing?.analytics?.usage ? `Yes - Using: ${report.marketing.analytics.tools}` : 'No analytics tools in use'}
   • Dynamic Pricing System: ${report.marketing?.pricing?.dynamic ? `Yes - Strategy: ${report.marketing.pricing.strategy}` : 'No dynamic pricing implemented'}

5. COMPETITIVE LANDSCAPE
   • Primary Competitor: ${report.competition?.mainCompetitor || 'Not identified'}
   • Short-term Business Objectives: ${formatList(report.competition?.goals?.shortTerm)}
   • Long-term Business Objectives: ${formatList(report.competition?.goals?.longTerm)}

6. KEY RECOMMENDATIONS
${(report.recommendations || []).map((rec, index) => `   ${index + 1}. ${rec}`).join('\n')}

This data represents the current state of your business based on the comprehensive analysis conducted.`;

  const baseInstructions = `
IMPORTANT: You are analyzing a real business. The data provided is from an actual business analysis report.
- Always reference specific data points from the report in your responses
- Provide concrete advice based on the actual numbers and information shown
- When discussing any aspect of the business, refer to the exact data provided
- If asked about specific metrics, quote the actual values from the report
- Never say you don't have information that's clearly stated in the report
- If information is truly missing from the report, suggest ways to collect that data`;

  switch (profile) {
    case 'sales':
      return `You are an experienced sales professional specializing in the hotel, restaurant, and dining sector.

${baseContext}

${baseInstructions}

Additional Instructions:
- Focus on revenue streams: ${formatList(report.financial?.revenue?.streams)}
- Consider peak hours: ${formatList(report.operations?.peakHours)}
- Target audience: ${formatList(report.overview?.targetAudience)}
- Use this data to provide specific sales strategies`;

    case 'finance':
      return `You are an experienced financial consultant from India specializing in the Indian hotel, restaurant, and dining industry.

${baseContext}

${baseInstructions}

Additional Instructions:
- Focus on financial metrics and performance
- Consider the debt situation: ${report.financial?.debt?.exists ? 'Yes' : 'No'}
- Revenue achievement: ${report.financial?.revenue?.targetAchievement || 'Not specified'}
- Monthly expenses: ${formatList(report.financial?.expenses)}`;

    case 'hr':
      return `You are an experienced Human Resources consultant from India specializing in the Indian hotel, restaurant, and dining industry.

${baseContext}

${baseInstructions}

Additional Instructions:
- Focus on staffing and management structure
- Consider peak hours for scheduling: ${formatList(report.operations?.peakHours)}
- Average salary: ${report.operations?.staffing?.avgSalary || 'Not specified'}
- Management type: ${report.operations?.staffing?.management || 'Not specified'}`;

    case 'business':
      return `You are an experienced business consultant from India specializing in the Indian hotel, restaurant, and dining industry.

${baseContext}

${baseInstructions}

Additional Instructions:
- Provide comprehensive business analysis
- Consider all aspects of the business
- Focus on overall performance and growth
- Reference specific metrics from each section`;

    case 'strategy':
      return `You are an experienced strategy consultant from India specializing in the Indian hotel, restaurant, and dining industry.

${baseContext}

${baseInstructions}

Additional Instructions:
- Focus on strategic positioning and growth
- Consider competition: ${report.competition?.mainCompetitor || 'Not specified'}
- Marketing strategies: ${formatList(report.marketing?.strategies)}
- Business goals alignment`;

    default:
      return `You are an AI consultant specializing in ${profile}.

${baseContext}

${baseInstructions}`;
  }
};

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (profile: string, message: string): Promise<ChatResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const sessionId = await getOrCreateSession();
      const report = await getReport(sessionId);

      if (!report) {
        throw new Error('Failed to load business report data');
      }

      const apiKey = API_KEYS[profile] || API_KEYS.business;
      const promptText = getProfileInstructions(profile, report);

      const response = await fetch(`${API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${promptText}\n\nUser Question: ${message}\n\nProvide a detailed response using the specific data points from the business report above:`
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to get response from AI');
      }

      const data = await response.json();
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from AI');
      }

      const content = data.candidates[0].content.parts[0].text;

      return {
        role: 'assistant',
        content
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendMessage,
    isLoading,
    error
  };
}