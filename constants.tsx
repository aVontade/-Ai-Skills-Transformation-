import React from 'react';
import { ChartDataPoint, Initiative, LearningModule, EthicalAmbassador, AIModelMetrics, Goal, ModelTrainingStatus, DataSource, SurveySummary, FeedbackSummary, ProgressReportSummary, RawFeedbackItem, RawProgressReport, SurveyInsight } from './types';

export const ICONS = {
  ORIENTATION: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
    </svg>
  ),
  VISION: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  CULTURE: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  COMMUNICATION: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H17z" />
    </svg>
  ),
  EMPOWERMENT: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
  LEADERSHIP: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  ETHICS: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 21a12.02 12.02 0 009-17.056z" />
    </svg>
  ),
  MODEL_PERFORMANCE: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2m1-11a7 7 0 11-14 0 7 7 0 0114 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l2 2" />
    </svg>
  ),
  GOAL_SETTING: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
  ),
  TRAINING: (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  DATA_SOURCES: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M4 11h16M4 17h16M12 4v16" />
    </svg>
  ),
  INPUTS: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h4M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4h2a2 2 0 012 2v4M16 4l4 4m-4-4l-4 4" />
    </svg>
  ),
   CONTROLS: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414m14.142 0l-1.414 1.414M5.636 18.364l-1.414 1.414M12 18a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
  ),
  RECOMMENDATIONS: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  ABOUT_US: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-8h1m-1 4h1m-1 4h1M9 3h6l-3 3-3-3z" />
    </svg>
  )
};

export const INITIAL_COMMUNICATION_DATA: ChartDataPoint[] = [
    { name: 'Town Halls', value: 85 },
    { name: 'Newsletters', value: 72 },
    { name: 'Team Meetings', value: 91 },
    { name: 'Intranet', value: 65 },
];

export const INITIAL_BUDGET_DATA: ChartDataPoint[] = [
    { name: 'Training & Reskilling', value: 40 },
    { name: 'Tools & Platforms', value: 35 },
    { name: 'Co-Creation Labs', value: 25 },
];

export const INITIAL_INITIATIVES_DATA: Initiative[] = [
    { id: '1', name: 'Sales Forecasting AI', lead: 'Marketing', status: 'Completed' },
    { id: '2', name: 'HR Chatbot Assistant', lead: 'HR', status: 'In Progress' },
    { id: '3', name: 'Supply Chain Optimization', lead: 'Operations', status: 'In Progress' },
    { id: '4', name: 'Predictive Maintenance', lead: 'Engineering', status: 'Idea' },
    { id: '5', name: 'Customer Sentiment Analysis', lead: 'Support', status: 'On Hold' },
];

export const LEARNING_MODULES_DATA: LearningModule[] = [
    { id: '1', title: 'AI Fundamentals for Leaders', completed: true },
    { id: '2', title: 'Ethical AI Frameworks', completed: true },
    { id: '3', title: 'Leading Change in the AI Era', completed: false },
    { id: '4', title: 'Data-Driven Decision Making', completed: false },
];

export const ETHICAL_AMBASSADORS_DATA: EthicalAmbassador[] = [
    { id: '1', name: 'Dr. Anya Sharma', department: 'R&D', avatar: 'https://picsum.photos/id/1027/100/100'},
    { id: '2', name: 'Ben Carter', department: 'Legal', avatar: 'https://picsum.photos/id/1005/100/100'},
    { id: '3', name: 'Chloe Davis', department: 'Product', avatar: 'https://picsum.photos/id/1011/100/100'},
];

export const AI_MODELS_PERFORMANCE_DATA: Record<string, AIModelMetrics> = {
    'Sales Forecasting AI': {
        accuracy: 98.7,
        latency: 150,
        precision: 0.99,
        recall: 0.98,
        f1Score: 0.985,
        trendData: [
            { month: 'Jan', accuracy: 97.5 },
            { month: 'Feb', accuracy: 97.8 },
            { month: 'Mar', accuracy: 98.1 },
            { month: 'Apr', accuracy: 98.5 },
            { month: 'May', accuracy: 98.7 },
        ],
    },
    'HR Chatbot Assistant': {
        accuracy: 94.2,
        latency: 80,
        precision: 0.95,
        recall: 0.93,
        f1Score: 0.94,
        trendData: [
            { month: 'Jan', accuracy: 92.1 },
            { month: 'Feb', accuracy: 93.0 },
            { month: 'Mar', accuracy: 93.5 },
            { month: 'Apr', accuracy: 94.0 },
            { month: 'May', accuracy: 94.2 },
        ],
    },
    'Supply Chain Optimization': {
        accuracy: 99.1,
        latency: 220,
        precision: 0.99,
        recall: 0.99,
        f1Score: 0.99,
        trendData: [
            { month: 'Jan', accuracy: 98.8 },
            { month: 'Feb', accuracy: 98.9 },
            { month: 'Mar', accuracy: 99.0 },
            { month: 'Apr', accuracy: 99.0 },
            { month: 'May', accuracy: 99.1 },
        ],
    },
    'Predictive Maintenance': {
        accuracy: 97.5,
        latency: 300,
        precision: 0.96,
        recall: 0.92,
        f1Score: 0.94,
        trendData: [
            { month: 'Jan', accuracy: 95.0 },
            { month: 'Feb', accuracy: 96.1 },
            { month: 'Mar', accuracy: 96.8 },
            { month: 'Apr', accuracy: 97.2 },
            { month: 'May', accuracy: 97.5 },
        ],
    },
};

export const INITIAL_GOALS_DATA: Goal[] = [
    { 
        id: '1', 
        description: 'Automate 50% of Tier-1 Customer Support Queries', 
        targetMetric: '50% Automation Rate', 
        currentProgress: 35, 
        deadline: 'Q4 2024' 
    },
    { 
        id: '2', 
        description: 'Increase AI Literacy Across All Departments', 
        targetMetric: '80% Employee Certification', 
        currentProgress: 60, 
        deadline: 'Q3 2024' 
    },
    { 
        id: '3', 
        description: 'Reduce Supply Chain Inefficiencies using AI', 
        targetMetric: '15% Cost Reduction', 
        currentProgress: 10, 
        deadline: 'Q1 2025' 
    },
];

export const MODEL_TRAINING_DATA: ModelTrainingStatus[] = [
    { id: '1', modelName: 'Sentiment Analysis v2', currentEpoch: 78, totalEpochs: 100 },
    { id: '2', modelName: 'Fraud Detection Engine', currentEpoch: 150, totalEpochs: 200 },
    { id: '3', modelName: 'Logistics Router AI', currentEpoch: 45, totalEpochs: 50 },
];

export const DATA_SOURCES_DATA: DataSource[] = [
    { id: '1', name: 'Salesforce CRM API', type: 'API', status: 'Connected', lastSync: '1 min ago', connectionString: 'api.salesforce.com/v53.0/data', updateFrequency: 'Real-time', responsibleTeam: 'CRM Integrations' },
    { id: '2', name: 'ERP PostgreSQL DB', type: 'Database', status: 'Connected', lastSync: '5 mins ago', connectionString: 'postgres://user:pass@host:port/db', updateFrequency: '15 minutes', responsibleTeam: 'Data Engineering' },
    { id: '3', name: 'IoT Sensor Stream', type: 'Real-time Stream', status: 'Degraded', lastSync: '15 mins ago', connectionString: 'kafka://broker.address:9092/topic', updateFrequency: 'Streaming', responsibleTeam: 'Platform Ops' },
    { id: '4', name: 'Marketing Snowflake DW', type: 'Data Warehouse', status: 'Offline', lastSync: '2 hours ago', connectionString: 'account.snowflakecomputing.com', updateFrequency: 'Daily', responsibleTeam: 'Marketing Analytics' },
];

// Summary Data
export const SURVEY_DATA: SurveySummary = {
    latestTopic: 'AI Tool Adoption & Sentiment (Q2)',
    participationRate: 82,
    nextDueDate: 'Aug 15, 2024',
};

export const FEEDBACK_DATA: FeedbackSummary = {
    totalItems: 1245,
    positiveSentiment: 78,
    keyThemes: ['More Training', 'Tool Access', 'Integration'],
};

export const PROGRESS_REPORT_DATA: ProgressReportSummary = {
    submitted: 45,
    expected: 50,
};

// Raw Data for Drill-down
export const RAW_SURVEY_INSIGHTS_DATA: SurveyInsight[] = [
    { id: 's1', theme: 'Training Gaps', insight: 'Engineers feel the Python for AI course is too basic and request advanced, domain-specific modules.', sentimentScore: 4.5 },
    { id: 's2', theme: 'Tooling', insight: 'The new data labeling tool is praised for its UI but is criticized for slow performance on large datasets.', sentimentScore: 7.2 },
    { id: 's3', theme: 'Communication', insight: 'Marketing team appreciates the bi-weekly AI newsletter but wants more success stories from other departments.', sentimentScore: 8.5 },
    { id: 's4', theme: 'Ethical Concerns', insight: 'Multiple respondents expressed concern about the potential for bias in the new customer segmentation model.', sentimentScore: 3.0 },
];

export const RAW_FEEDBACK_DATA: RawFeedbackItem[] = [
    { id: 'f1', submittedBy: 'Anonymous', department: 'Sales', sentiment: 'Positive', comment: 'The new sales forecasting AI is incredibly accurate. It saved me hours this week.', timestamp: '2 days ago' },
    { id: 'f2', submittedBy: 'Jane Doe', department: 'HR', sentiment: 'Neutral', comment: 'The HR chatbot is helpful for basic queries, but it often fails on complex questions about benefits.', timestamp: '3 days ago' },
    { id: 'f3', submittedBy: 'Anonymous', department: 'Engineering', sentiment: 'Negative', comment: 'Access to the GPU cluster is still a bottleneck for my model training.', timestamp: '4 days ago' },
    { id: 'f4', submittedBy: 'John Smith', department: 'Marketing', sentiment: 'Positive', comment: "Love the initiative! The co-creation labs have been a game-changer for brainstorming.", timestamp: '5 days ago' },
];

export const RAW_PROGRESS_REPORTS_DATA: RawProgressReport[] = [
    { id: 'r1', team: 'Marketing', title: 'Q2 Customer Sentiment Analysis Initiative', submittedBy: 'Alice Johnson', timestamp: '1 day ago', status: 'On Time' },
    { id: 'r2', team: 'Operations', title: 'Supply Chain AI - Milestone 2 Reached', submittedBy: 'Bob Williams', timestamp: '2 days ago', status: 'On Time' },
    { id: 'r3', team: 'HR', title: 'Chatbot Phase 1 Rollout Report', submittedBy: 'Carol White', timestamp: '4 days ago', status: 'Late' },
    { id: 'r4', team: 'Engineering', title: 'Predictive Maintenance Model - Data Ingestion', submittedBy: 'David Green', timestamp: '5 days ago', status: 'On Time' },
];