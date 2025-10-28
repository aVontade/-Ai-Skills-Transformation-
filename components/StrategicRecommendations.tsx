import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import DashboardCard from './DashboardCard';
import { ICONS } from '../constants';
import { Goal, ChartDataPoint, Recommendation } from '../types';

interface StrategicRecommendationsProps {
    visionAlignment: number;
    psychSafetyScore: number;
    experimentationRate: number;
    goalsData: Goal[];
    communicationData: ChartDataPoint[];
    budgetData: ChartDataPoint[];
}

const StrategicRecommendations: React.FC<StrategicRecommendationsProps> = (props) => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateRecommendations = async () => {
        setLoading(true);
        setError(null);
        setRecommendations([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

            const prompt = `
                Act as an expert AI transformation consultant advising a CEO. 
                Based on the following dashboard KPIs, provide exactly three concise, distinct, and actionable strategic recommendations. 
                Each recommendation should have a clear title and a description (2-3 sentences).
                Focus on the most critical areas needing attention.

                Current KPIs:
                - Strategic Vision Alignment: ${props.visionAlignment}%
                - Psychological Safety Score: ${props.psychSafetyScore}/10
                - Experimentation Rate (QoQ Growth): ${props.experimentationRate}%
                - Goal Progress: 
                  ${props.goalsData.map(g => `- ${g.description}: ${g.currentProgress}% complete (Target: ${g.targetMetric})`).join('\n                  ')}
                - Communication Channel Effectiveness:
                  ${props.communicationData.map(c => `- ${c.name}: ${c.value}%`).join('\n                  ')}
                - Budget Allocation:
                  ${props.budgetData.map(b => `- ${b.name}: ${b.value}%`).join('\n                  ')}
            `;

            const responseSchema = {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: {
                      type: Type.STRING,
                      description: 'A concise title for the recommendation.',
                    },
                    description: {
                      type: Type.STRING,
                      description: 'A brief, actionable description of the recommendation (2-3 sentences).',
                    },
                  },
                  required: ["title", "description"],
                },
            };
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                },
            });
            
            const parsedRecommendations = JSON.parse(response.text);
            setRecommendations(parsedRecommendations);

        } catch (e) {
            console.error("Error generating recommendations:", e);
            setError("Failed to generate recommendations. Please check the API key and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardCard title="AI-Powered Strategic Recommendations" icon={ICONS.RECOMMENDATIONS} colorScheme="purple">
            <div className="flex flex-col h-full min-h-[250px]">
                <div className="flex-grow space-y-4">
                    {loading && (
                         <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scheme-purple"></div>
                         </div>
                    )}
                    {error && <p className="text-danger text-center">{error}</p>}
                    {!loading && !error && recommendations.length > 0 && (
                        <ul className="space-y-4">
                            {recommendations.map((rec, index) => (
                                <li key={index} className="bg-bg-tertiary p-3 rounded-lg">
                                    <h4 className="font-bold text-scheme-purple">{rec.title}</h4>
                                    <p className="text-sm text-text-secondary mt-1">{rec.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                     {!loading && !error && recommendations.length === 0 && (
                        <div className="text-center text-text-secondary flex flex-col items-center justify-center h-full">
                            <p>Click the button to generate AI-powered recommendations based on the current dashboard data.</p>
                        </div>
                     )}
                </div>
                <div className="mt-4 text-center">
                    <button
                        onClick={generateRecommendations}
                        disabled={loading}
                        className="bg-scheme-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-violet-500 disabled:bg-bg-tertiary disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {loading ? 'Generating...' : 'Generate Recommendations'}
                    </button>
                </div>
            </div>
        </DashboardCard>
    );
};

export default StrategicRecommendations;