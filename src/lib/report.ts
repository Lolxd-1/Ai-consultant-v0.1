import { supabase, saveBusinessReport, fetchBusinessReport, saveChatMessage } from './supabase';
import { FormData } from '../types/questionnaire';

export interface BusinessReport {
  overview: {
    businessType: string;
    targetAudience: string[];
    services: string[];
    operationalHours: string[];
    targetAgeRange?: string;
    cuisineType?: string[];
    cuisineSpecialty?: string;
    menuUpdateFrequency?: string;
  };
  financial: {
    revenue: {
      streams: string[];
      targetAchievement: string;
    };
    expenses: string[];
    debt: {
      exists: boolean;
      amount?: string;
    };
    techInvestment?: string;
    operationalExpenseCoverage?: string;
    seasonalVariations?: {
      exists: boolean;
      patterns?: string;
    };
  };
  operations: {
    peakHours: string[];
    peakSeasons: string[];
    staffing: {
      avgSalary: string;
      management: string;
    };
    wasteManagement?: string;
  };
  marketing: {
    strategies: string[];
    analytics: {
      usage: boolean;
      tools?: string;
    };
    pricing: {
      dynamic: boolean;
      strategy?: string;
    };
    discounts?: string[];
    referralProgram?: {
      exists: boolean;
      details?: string;
    };
  };
  competition: {
    mainCompetitor?: string;
    goals: {
      shortTerm: string[];
      longTerm: string[];
    };
  };
  recommendations: string[];
}

// Default report when no data is available
const defaultReport: BusinessReport = {
  overview: {
    businessType: 'Not specified',
    targetAudience: [],
    services: [],
    operationalHours: []
  },
  financial: {
    revenue: {
      streams: [],
      targetAchievement: 'Not specified'
    },
    expenses: [],
    debt: {
      exists: false
    }
  },
  operations: {
    peakHours: [],
    peakSeasons: [],
    staffing: {
      avgSalary: 'Not specified',
      management: 'Not specified'
    }
  },
  marketing: {
    strategies: [],
    analytics: {
      usage: false
    },
    pricing: {
      dynamic: false
    }
  },
  competition: {
    goals: {
      shortTerm: [],
      longTerm: []
    }
  },
  recommendations: [
    'Complete the questionnaire to receive personalized recommendations',
    'Explore different sections to get comprehensive insights',
    'Set goals to track your business progress'
  ]
};

async function shareReportWithProfiles(sessionId: string, report: BusinessReport) {
  const profiles = ['sales', 'finance', 'hr', 'strategy', 'business'];
  
  const formatReportForProfile = (profile: string) => {
    const messages = [
      `📊 Business Analysis Report Summary`,
      `\nBusiness Overview:`,
      `• Type: ${report.overview.businessType}`,
      `• Target Audience: ${report.overview.targetAudience.join(', ')}`,
      `• Services: ${report.overview.services.join(', ')}`,
      `• Cuisine Type: ${report.overview.cuisineType?.join(', ') || 'Not specified'}`,
      `• Menu Updates: ${report.overview.menuUpdateFrequency || 'Not specified'}`,
      
      `\nFinancial Status:`,
      `• Revenue Streams: ${report.financial.revenue.streams.join(', ')}`,
      `• Target Achievement: ${report.financial.revenue.targetAchievement}`,
      `• Has Debt: ${report.financial.debt.exists ? 'Yes' : 'No'}${report.financial.debt.exists ? ` (Amount: ${report.financial.debt.amount})` : ''}`,
      `• Tech Investment Plan: ${report.financial.techInvestment || 'Not specified'}`,
      `• Expense Coverage: ${report.financial.operationalExpenseCoverage || 'Not specified'}`,
      
      `\nOperational Details:`,
      `• Peak Hours: ${report.operations.peakHours.join(', ')}`,
      `• Peak Seasons: ${report.operations.peakSeasons.join(', ')}`,
      `• Average Staff Salary: ${report.operations.staffing.avgSalary}`,
      `• Management: ${report.operations.staffing.management}`,
      `• Waste Management: ${report.operations.wasteManagement || 'Not specified'}`,
      
      `\nMarketing & Strategy:`,
      `• Marketing Strategies: ${report.marketing.strategies.join(', ')}`,
      `• Analytics Usage: ${report.marketing.analytics.usage ? 'Yes' : 'No'}${report.marketing.analytics.usage ? ` (Tools: ${report.marketing.analytics.tools})` : ''}`,
      `• Dynamic Pricing: ${report.marketing.pricing.dynamic ? 'Yes' : 'No'}${report.marketing.pricing.strategy ? ` (Strategy: ${report.marketing.pricing.strategy})` : ''}`,
      `• Discounts & Promotions: ${report.marketing.discounts?.join(', ') || 'Not specified'}`,
      `• Referral Program: ${report.marketing.referralProgram?.exists ? `Yes - ${report.marketing.referralProgram.details}` : 'No'}`,
      
      `\nCompetition & Goals:`,
      `• Main Competitor: ${report.competition.mainCompetitor || 'Not identified'}`,
      `\nShort-term Goals:`,
      ...report.competition.goals.shortTerm.map(goal => `• ${goal}`),
      `\nLong-term Goals:`,
      ...report.competition.goals.longTerm.map(goal => `• ${goal}`),
      
      `\nRecommendations:`,
      ...report.recommendations.map(rec => `• ${rec}`)
    ].join('\n');

    return messages;
  };

  for (const profile of profiles) {
    const message = formatReportForProfile(profile);
    await saveChatMessage(sessionId, profile, 'assistant', message);
  }
}

function generateRecommendations(formData: FormData): string[] {
  const recommendations: string[] = [];

  try {
    // Financial Recommendations
    if (formData.has_debt === 'Yes') {
      recommendations.push('Develop a structured debt management strategy to improve financial health');
    }
    if (formData.sales_target_achievement === 'Rarely (<50%)') {
      recommendations.push('Review and adjust sales targets, implement comprehensive performance tracking systems');
    }
    if (formData.operational_expense_coverage === 'No' || formData.operational_expense_coverage === 'Mostly (with occasional difficulties)') {
      recommendations.push('Implement stricter expense management and cash flow monitoring systems');
    }

    // Marketing Recommendations
    if (!formData.data_analytics_tools || formData.data_analytics_tools === 'No') {
      recommendations.push('Implement data analytics tools to better understand customer behavior and optimize operations');
    }
    if (!formData.dynamic_pricing_strategy || formData.dynamic_pricing_strategy === 'No') {
      recommendations.push('Consider implementing dynamic pricing strategies to optimize revenue during peak hours');
    }
    if (!formData.referral_program || formData.referral_program === 'No') {
      recommendations.push('Establish a referral program to leverage word-of-mouth marketing');
    }

    // Operational Recommendations
    if (Array.isArray(formData.peak_hours) && formData.peak_hours.length > 0) {
      recommendations.push('Optimize staffing levels during identified peak hours to improve service efficiency');
    }
    if (formData.receive_complaints === 'Yes') {
      recommendations.push('Implement a systematic approach to address and prevent common customer complaints');
    }
    if (formData.waste_management) {
      recommendations.push('Enhance waste management practices to reduce operational costs and improve sustainability');
    }

    // Marketing Strategy Recommendations
    if (!Array.isArray(formData.marketing_strategies) || formData.marketing_strategies.length < 2) {
      recommendations.push('Diversify marketing channels to reach a broader customer base');
    }

    // Seasonal Recommendations
    if (formData.seasonal_revenue_variations === 'Yes') {
      recommendations.push('Develop targeted strategies to address seasonal revenue fluctuations');
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
  }

  // Add default recommendations if none were generated
  if (recommendations.length === 0) {
    recommendations.push(
      'Complete the questionnaire to receive personalized recommendations',
      'Explore different sections to get comprehensive insights',
      'Set goals to track your business progress'
    );
  }

  return recommendations;
}

export async function generateBusinessReport(sessionId: string): Promise<BusinessReport> {
  try {
    const { data: responses, error } = await supabase
      .from('responses')
      .select('*')
      .eq('session_id', sessionId);

    if (error) {
      console.error('Error fetching responses:', error);
      return defaultReport;
    }

    if (!responses?.length) {
      return defaultReport;
    }

    const formData: FormData = {};
    responses.forEach(response => {
      try {
        const answer = typeof response.answer === 'string' 
          ? JSON.parse(response.answer) 
          : response.answer;
        
        formData[response.question_id] = answer;
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        return;
      }
    });

    const report: BusinessReport = {
      overview: {
        businessType: formData.restaurant_type || 'Not specified',
        targetAudience: Array.isArray(formData.target_audience) 
          ? formData.target_audience.filter(item => !item.startsWith('Other:'))
          : [],
        services: Array.isArray(formData.additional_services) 
          ? formData.additional_services.filter(item => !item.startsWith('Other:'))
          : [],
        operationalHours: Array.isArray(formData.peak_hours) 
          ? formData.peak_hours 
          : [],
        targetAgeRange: formData.target_age_range,
        cuisineType: Array.isArray(formData.cuisine_type) 
          ? formData.cuisine_type 
          : undefined,
        cuisineSpecialty: formData.cuisine_specialty,
        menuUpdateFrequency: formData.menu_update_frequency
      },
      financial: {
        revenue: {
          streams: formData.revenue_streams 
            ? [formData.revenue_streams].flat().filter(Boolean)
            : [],
          targetAchievement: formData.sales_target_achievement || 'Not specified'
        },
        expenses: Array.isArray(formData.monthly_expenses) 
          ? formData.monthly_expenses 
          : [],
        debt: {
          exists: formData.has_debt === 'Yes',
          amount: formData.has_debt === 'Yes' ? formData.total_debt_amount : undefined
        },
        techInvestment: formData.tech_investment_plan,
        operationalExpenseCoverage: formData.operational_expense_coverage,
        seasonalVariations: {
          exists: formData.seasonal_revenue_variations === 'Yes',
          patterns: formData.seasonal_patterns
        }
      },
      operations: {
        peakHours: Array.isArray(formData.peak_hours) 
          ? formData.peak_hours 
          : [],
        peakSeasons: Array.isArray(formData.peak_season) 
          ? formData.peak_season 
          : [],
        staffing: {
          avgSalary: formData.average_monthly_salary || 'Not specified',
          management: formData.operational_management || 'Not specified'
        },
        wasteManagement: formData.waste_management
      },
      marketing: {
        strategies: Array.isArray(formData.marketing_strategies) 
          ? formData.marketing_strategies 
          : [],
        analytics: {
          usage: formData.data_analytics_tools === 'Yes',
          tools: formData.data_analytics_tools === 'Yes' 
            ? formData.analytics_tools_used 
            : undefined
        },
        pricing: {
          dynamic: formData.dynamic_pricing_strategy === 'Yes',
          strategy: formData.dynamic_pricing_strategy === 'Yes' 
            ? formData.dynamic_pricing_description 
            : undefined
        },
        discounts: Array.isArray(formData.discounts_promotions)
          ? formData.discounts_promotions
          : undefined,
        referralProgram: {
          exists: formData.referral_program === 'Yes',
          details: formData.referral_program === 'Yes'
            ? formData.referral_program_details
            : undefined
        }
      },
      competition: {
        mainCompetitor: formData.aware_biggest_competitor === 'Yes' 
          ? formData.biggest_competitor_name 
          : undefined,
        goals: {
          shortTerm: [],
          longTerm: []
        }
      },
      recommendations: generateRecommendations(formData)
    };

    if (formData.business_goals) {
      try {
        const goals = typeof formData.business_goals === 'string' 
          ? formData.business_goals.split('\n')
          : [];
          
        report.competition.goals.shortTerm = goals
          .filter(g => g.toLowerCase().includes('short-term'))
          .map(g => g.replace(/Short-Term.*?:/i, '').trim());

        report.competition.goals.longTerm = goals
          .filter(g => g.toLowerCase().includes('long-term'))
          .map(g => g.replace(/Long-Term.*?:/i, '').trim());
      } catch (goalsError) {
        console.error('Error parsing goals:', goalsError);
      }
    }

    await shareReportWithProfiles(sessionId, report);

    try {
      await saveBusinessReport(sessionId, report);
    } catch (saveError) {
      console.error('Error saving report:', saveError);
    }

    return report;
  } catch (error) {
    console.error('Error generating business report:', error);
    return defaultReport;
  }
}

export async function getReport(sessionId: string): Promise<BusinessReport> {
  try {
    const report = await fetchBusinessReport(sessionId);
    
    if (report) {
      return report;
    }

    return await generateBusinessReport(sessionId);
  } catch (error) {
    console.error('Error in getReport:', error);
    return defaultReport;
  }
}