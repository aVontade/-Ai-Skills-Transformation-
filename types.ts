import React from 'react';

export type Theme = 'light' | 'dark' | 'high-contrast';

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface Initiative {
  id: string;
  name: string;
  lead: string;
  status: 'Idea' | 'In Progress' | 'Completed' | 'On Hold';
}

export interface LearningModule {
  id: string;
  title: string;
  completed: boolean;
}

export interface EthicalAmbassador {
    id: string;
    name: string;
    department: string;
    avatar: string;
}

export interface AIModelPerformanceDataPoint {
  month: string;
  accuracy: number;
}

export interface AIModelMetrics {
  accuracy: number;
  latency: number; // in ms
  precision: number;
  recall: number;
  f1Score: number;
  trendData: AIModelPerformanceDataPoint[];
}

export interface Goal {
  id: string;
  description: string;
  targetMetric: string;
  currentProgress: number;
  deadline: string;
}

export interface ModelTrainingStatus {
  id:string;
  modelName: string;
  currentEpoch: number;
  totalEpochs: number;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'Database' | 'API' | 'Real-time Stream' | 'Data Warehouse';
  status: 'Connected' | 'Degraded' | 'Offline';
  lastSync: string;
  connectionString: string;
  updateFrequency: string;
  responsibleTeam: string;
}

export interface SurveySummary {
  latestTopic: string;
  participationRate: number;
  nextDueDate: string;
}

export interface FeedbackSummary {
  totalItems: number;
  positiveSentiment: number; // as percentage
  keyThemes: string[];
}

export interface ProgressReportSummary {
  submitted: number;
  expected: number;
}

// New types for raw data drill-down
export interface RawFeedbackItem {
  id: string;
  submittedBy: string; // Could be 'Anonymous'
  department: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  comment: string;
  timestamp: string;
}

export interface RawProgressReport {
  id: string;
  team: string;
  title: string;
  submittedBy: string;
  timestamp: string;
  status: 'On Time' | 'Late';
}

export interface SurveyInsight {
  id: string;
  theme: string;
  insight: string;
  sentimentScore: number; // e.g., out of 10
}

export interface Recommendation {
  title: string;
  description: string;
}