import { Section } from '../types/questionnaire';

export const questionData: Section[] = [
  {
    id: 'establishment',
    title: 'Establishment Overview',
    description: 'Let\'s start with some basic information about your restaurant.',
    questions: [
      {
        id: 'restaurant_type',
        type: 'single',
        question: 'What type of restaurant do you operate?',
        options: [
          'Fine Dining',
          'Casual Dining',
          'Fast Food',
          'Specialty Cuisine',
          'Other'
        ]
      },
      {
        id: 'target_audience',
        type: 'multiple',
        question: 'Who is your primary target audience?',
        options: [
          'Families with Children',
          'Young Professionals (25-40)',
          'Couples',
          'Tourists',
          'Other'
        ]
      },
      {
        id: 'target_age_range',
        type: 'single',
        question: 'What is the typical age range of your target audience?',
        options: [
          '18-24',
          '25-40',
          '41-55',
          '56+',
          'Mixed/Across All Ages'
        ]
      }
    ]
  },
  {
    id: 'services',
    title: 'Services and Cuisine',
    description: 'Tell us about your services and specialties.',
    questions: [
      {
        id: 'additional_services',
        type: 'multiple',
        question: 'What additional services do you provide?',
        options: [
          'Delivery',
          'Catering',
          'Events',
          'Takeaway',
          'Online Ordering',
          'Other'
        ]
      },
      {
        id: 'cuisine_specialty',
        type: 'single',
        question: 'What type of cuisine do you specialize in?',
        options: [
          'Italian',
          'Chinese',
          'Indian',
          'Modern European',
          'Other'
        ]
      },
      {
        id: 'menu_update_frequency',
        type: 'single',
        question: 'How often do you update your menu?',
        options: [
          'Weekly',
          'Monthly',
          'Quarterly',
          'Annually',
          'As Needed'
        ]
      },
      {
        id: 'cuisine_type',
        type: 'multiple',
        question: 'What is your restaurant\'s cuisine type?',
        options: [
          '100% Vegetarian',
          '100% Non-Vegetarian',
          'Mix (Both Vegetarian and Non-Vegetarian)',
          'Other'
        ]
      }
    ]
  },
  {
    id: 'operations',
    title: 'Operations',
    description: 'Let\'s understand your operational details.',
    questions: [
      {
        id: 'peak_hours',
        type: 'multiple',
        question: 'What are your peak operating hours?',
        options: [
          '11am-3pm (Lunch)',
          '5pm-10pm (Dinner)',
          '12pm-11pm (All Day)',
          'Varies'
        ]
      },
      {
        id: 'peak_season',
        type: 'multiple',
        question: 'When is your peak season?',
        options: [
          'Summer (June-Aug)',
          'Holiday Season (Dec-Jan)',
          'Spring Break (Mar-Apr)',
          'Fall Foliage (Sep-Oct)',
          'Year-Round Consistent',
          'Other'
        ]
      },
      {
        id: 'waste_management',
        type: 'text',
        question: 'How do you manage waste in your restaurant?',
        prompts: [
          'Recycling Practices',
          'Waste Reduction Strategies',
          'Composting (if applicable)'
        ]
      },
      {
        id: 'operational_expenses',
        type: 'multiple',
        question: 'What are the biggest areas of expenses for your restaurant?',
        options: [
          'Staffing Costs',
          'Ingredient/Supply Costs',
          'Rent/Mortgage',
          'Marketing Expenses',
          'Other'
        ]
      }
    ]
  },
  {
    id: 'feedback_revenue',
    title: 'Customer Feedback and Revenue',
    description: 'Let\'s analyze your customer feedback and revenue streams.',
    questions: [
      {
        id: 'receive_complaints',
        type: 'single',
        question: 'Do you receive customer complaints?',
        options: [
          'Yes',
          'No'
        ]
      },
      {
        id: 'common_complaints',
        type: 'text',
        question: 'What are the most common complaints?',
        conditional: {
          dependsOn: 'receive_complaints',
          showIf: 'Yes'
        }
      },
      {
        id: 'revenue_streams',
        type: 'text',
        question: 'What are your primary revenue streams?',
        prompts: [
          'Main Revenue Stream(s): (e.g., dine-in, delivery, catering)',
          'Percentage of Total Revenue (Approximate)',
          'Diversification Efforts (if any)'
        ]
      },
      {
        id: 'sales_target_achievement',
        type: 'single',
        question: 'How often do you meet your sales targets?',
        options: [
          'Always (≥90%)',
          'Most of the Time (70-89%)',
          'Sometimes (50-69%)',
          'Rarely (<50%)'
        ]
      },
      {
        id: 'customer_feedback_methods',
        type: 'multiple',
        question: 'How do you gather customer feedback?',
        options: [
          'Online Reviews (e.g., Google, Yelp)',
          'In-Person Surveys',
          'Social Media',
          'Comment Cards',
          'Other'
        ]
      }
    ]
  },
  {
    id: 'financial_health',
    title: 'Financial Health',
    description: 'Let\'s assess your financial situation and future plans.',
    questions: [
      {
        id: 'has_debt',
        type: 'single',
        question: 'Do you have any debt?',
        options: [
          'Yes',
          'No'
        ]
      },
      {
        id: 'total_debt_amount',
        type: 'text',
        question: 'Total Debt Amount:',
        conditional: {
          dependsOn: 'has_debt',
          showIf: 'Yes'
        }
      },
      {
        id: 'tech_investment_plan',
        type: 'text',
        question: 'How much do you plan to invest in technology upgrades in the next 12 months?'
      },
      {
        id: 'operational_expense_coverage',
        type: 'single',
        question: 'Are you able to consistently cover your operational expenses?',
        options: [
          'Yes',
          'No',
          'Mostly (with occasional difficulties)'
        ]
      },
      {
        id: 'seasonal_revenue_variations',
        type: 'single',
        question: 'Do you experience any seasonal revenue variations?',
        options: [
          'Yes',
          'No'
        ]
      },
      {
        id: 'seasonal_patterns',
        type: 'text',
        question: 'Describe Seasonal Patterns:',
        conditional: {
          dependsOn: 'seasonal_revenue_variations',
          showIf: 'Yes'
        }
      }
    ]
  },
  {
    id: 'management_marketing',
    title: 'Management, Marketing, & Analytics',
    description: 'Let\'s understand your management and marketing approach.',
    questions: [
      {
        id: 'operational_management',
        type: 'single',
        question: 'Who manages the day-to-day operations?',
        options: [
          'Owner',
          'Manager',
          'Shared Responsibility'
        ]
      },
      {
        id: 'marketing_strategies',
        type: 'multiple',
        question: 'How do you market your restaurant?',
        options: [
          'Social Media Advertising',
          'Email Marketing',
          'Local Print Media',
          'Word of Mouth Incentives',
          'Other'
        ]
      },
      {
        id: 'dynamic_pricing_strategy',
        type: 'single',
        question: 'Do you have a dynamic pricing strategy?',
        options: [
          'Yes',
          'No'
        ]
      },
      {
        id: 'dynamic_pricing_description',
        type: 'text',
        question: 'Describe Strategy:',
        conditional: {
          dependsOn: 'dynamic_pricing_strategy',
          showIf: 'Yes'
        }
      },
      {
        id: 'discounts_promotions',
        type: 'multiple',
        question: 'Do you offer discounts or promotions?',
        options: [
          'Monthly Offers',
          'Weekly Specials',
          'Loyalty Program Discounts',
          'Other'
        ]
      },
      {
        id: 'referral_program',
        type: 'single',
        question: 'Do you have a referral program in place?',
        options: [
          'Yes',
          'No'
        ]
      },
      {
        id: 'referral_program_details',
        type: 'text',
        question: 'Describe Program Details:',
        conditional: {
          dependsOn: 'referral_program',
          showIf: 'Yes'
        }
      },
      {
        id: 'data_analytics_tools',
        type: 'single',
        question: 'Do you utilize tools for data analytics to inform business decisions?',
        options: [
          'Yes',
          'No'
        ]
      },
      {
        id: 'analytics_tools_used',
        type: 'text',
        question: 'Specify Tools Used:',
        conditional: {
          dependsOn: 'data_analytics_tools',
          showIf: 'Yes'
        }
      }
    ]
  },
  {
    id: 'financials_staffing',
    title: 'Financials & Staffing',
    description: 'Let\'s review your financial and staffing details.',
    questions: [
      {
        id: 'average_monthly_salary',
        type: 'text',
        question: 'What is the average monthly salary for your staff?'
      },
      {
        id: 'monthly_expenses',
        type: 'multiple',
        question: 'What are your typical monthly expenses?',
        options: [
          'Rent/Mortgage',
          'Staffing Costs',
          'Raw Materials/Ingredients',
          'Marketing Expenses',
          'Other'
        ]
      },
      {
        id: 'raw_materials_suppliers',
        type: 'text',
        question: 'What are your primary sources of raw materials?',
        prompts: [
          'Supplier 1',
          'Supplier 2'
        ]
      }
    ]
  },
  {
    id: 'competition_goals',
    title: 'Competition & Goals',
    description: 'Let\'s understand your competitive landscape and future plans.',
    questions: [
      {
        id: 'aware_biggest_competitor',
        type: 'single',
        question: 'Are you aware of your biggest competitor?',
        options: [
          'Yes',
          'No'
        ]
      },
      {
        id: 'biggest_competitor_name',
        type: 'text',
        question: 'Competitor Name:',
        conditional: {
          dependsOn: 'aware_biggest_competitor',
          showIf: 'Yes'
        }
      },
      {
        id: 'business_goals',
        type: 'text',
        question: 'What are your short-term and long-term goals?',
        prompts: [
          'Short-Term (Next 12 months): Goal 1',
          'Short-Term (Next 12 months): Goal 2',
          'Long-Term (Next 1-5 years): Goal 1',
          'Long-Term (Next 1-5 years): Goal 2'
        ]
      }
    ]
  }
];