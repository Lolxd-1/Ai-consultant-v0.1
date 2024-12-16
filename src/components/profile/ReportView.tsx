import React from 'react';
import { useReport } from '../../hooks/useReport';
import { questionData } from '../../data/questions';
import { Loader2, AlertCircle } from 'lucide-react';
import { QuestionResponse } from './report/QuestionResponse';
import { SectionHeader } from './report/SectionHeader';

export function ReportView() {
  const { report, isLoading, error, refreshReport } = useReport();

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-white/70">{error}</p>
          <button
            onClick={refreshReport}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg
              text-white flex items-center gap-2 mx-auto transition-all duration-300"
          >
            <span className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white/70">No report data available</p>
      </div>
    );
  }

  const getResponseForQuestion = (questionId: string) => {
    // Map question IDs to their corresponding data in the report
    const responseMap: { [key: string]: any } = {
      // Establishment section
      restaurant_type: report.overview?.businessType,
      target_audience: report.overview?.targetAudience,
      target_age_range: report.overview?.targetAgeRange,
      
      // Services section
      additional_services: report.overview?.services,
      cuisine_specialty: report.overview?.cuisineSpecialty,
      menu_update_frequency: report.overview?.menuUpdateFrequency,
      cuisine_type: report.overview?.cuisineType,
      
      // Operations section
      peak_hours: report.operations?.peakHours,
      peak_season: report.operations?.peakSeasons,
      waste_management: report.operations?.wasteManagement,
      operational_expenses: report.financial?.expenses,
      
      // Feedback & Revenue section
      receive_complaints: report.operations?.complaints?.exists ? 'Yes' : 'No',
      common_complaints: report.operations?.complaints?.details,
      revenue_streams: report.financial?.revenue?.streams,
      sales_target_achievement: report.financial?.revenue?.targetAchievement,
      customer_feedback_methods: report.marketing?.feedbackMethods,
      
      // Financial Health section
      has_debt: report.financial?.debt?.exists ? 'Yes' : 'No',
      total_debt_amount: report.financial?.debt?.amount,
      tech_investment_plan: report.financial?.techInvestment,
      operational_expense_coverage: report.financial?.operationalExpenseCoverage,
      seasonal_revenue_variations: report.financial?.seasonalVariations?.exists ? 'Yes' : 'No',
      seasonal_patterns: report.financial?.seasonalVariations?.patterns,
      
      // Management & Marketing section
      operational_management: report.operations?.staffing?.management,
      marketing_strategies: report.marketing?.strategies,
      dynamic_pricing_strategy: report.marketing?.pricing?.dynamic ? 'Yes' : 'No',
      dynamic_pricing_description: report.marketing?.pricing?.strategy,
      discounts_promotions: report.marketing?.discounts,
      referral_program: report.marketing?.referralProgram?.exists ? 'Yes' : 'No',
      referral_program_details: report.marketing?.referralProgram?.details,
      data_analytics_tools: report.marketing?.analytics?.usage ? 'Yes' : 'No',
      analytics_tools_used: report.marketing?.analytics?.tools,
      
      // Financials & Staffing section
      average_monthly_salary: report.operations?.staffing?.avgSalary,
      monthly_expenses: report.financial?.expenses,
      raw_materials_suppliers: report.operations?.suppliers,
      
      // Competition & Goals section
      aware_biggest_competitor: report.competition?.mainCompetitor ? 'Yes' : 'No',
      biggest_competitor_name: report.competition?.mainCompetitor,
      business_goals: [
        ...(report.competition?.goals?.shortTerm || []).map(goal => `Short-Term: ${goal}`),
        ...(report.competition?.goals?.longTerm || []).map(goal => `Long-Term: ${goal}`)
      ]
    };

    const response = responseMap[questionId];
    
    // Handle empty arrays and undefined values
    if (Array.isArray(response) && response.length === 0) {
      return null;
    }
    
    // Handle empty strings
    if (typeof response === 'string' && response.trim() === '') {
      return null;
    }
    
    return response;
  };

  return (
    <div className="h-full overflow-y-auto px-6 py-4 space-y-8
      scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {questionData.map((section) => (
        <section key={section.id} className="space-y-6">
          <SectionHeader 
            title={section.title} 
            description={section.description} 
          />

          <div className="space-y-8">
            {section.questions.map((question) => {
              // Skip conditional questions if their condition is not met
              if (question.conditional) {
                const dependentResponse = getResponseForQuestion(question.conditional.dependsOn);
                if (dependentResponse !== question.conditional.showIf) {
                  return null;
                }
              }

              return (
                <QuestionResponse
                  key={question.id}
                  question={question}
                  response={getResponseForQuestion(question.id)}
                />
              );
            })}
          </div>
        </section>
      ))}

      <div className="h-20" /> {/* Spacing for scrolling */}
    </div>
  );
}