import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import DashboardCard from './DashboardCard';
import { ICONS } from '../constants';
import { Goal, ChartDataPoint, Theme } from '../types';

interface DashboardControlsProps {
    visionAlignment: number;
    setVisionAlignment: (value: number) => void;
    psychSafetyScore: number;
    setPsychSafetyScore: (value: number) => void;
    experimentationRate: number;
    setExperimentationRate: (value: number) => void;
    goalsData: Goal[];
    setGoalsData: (data: Goal[]) => void;
    communicationData: ChartDataPoint[];
    setCommunicationData: (data: ChartDataPoint[]) => void;
    budgetData: ChartDataPoint[];
    setBudgetData: (data: ChartDataPoint[]) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ControlSlider: React.FC<{ label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min?: number, max?: number, step?: number, unit?: string }> = 
({ label, value, onChange, min = 0, max = 100, step = 1, unit = '' }) => (
    <div>
        <label className="flex justify-between text-sm font-medium text-text-secondary">
            <span>{label}</span>
            <span className="font-bold text-brand-blue">{value}{unit}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer themed-slider"
        />
    </div>
);


const DashboardControls: React.FC<DashboardControlsProps> = ({
    visionAlignment, setVisionAlignment,
    psychSafetyScore, setPsychSafetyScore,
    experimentationRate, setExperimentationRate,
    goalsData, setGoalsData,
    communicationData, setCommunicationData,
    budgetData, setBudgetData,
    theme, setTheme,
}) => {
    // State for AI Content Search
    const [companyUrl, setCompanyUrl] = useState('');
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);

    const handleGoalProgressChange = (id: string, newProgress: number) => {
        const updatedGoals = goalsData.map(goal => 
            goal.id === id ? { ...goal, currentProgress: newProgress } : goal
        );
        setGoalsData(updatedGoals);
    };

    const handleCommunicationChange = (name: string, newValue: number) => {
        const updatedData = communicationData.map(item =>
            item.name === name ? { ...item, value: newValue } : item
        );
        setCommunicationData(updatedData);
    };

     const handleBudgetChange = (name: string, newValue: number) => {
        const updatedData = budgetData.map(item =>
            item.name === name ? { ...item, value: newValue } : item
        );
        setBudgetData(updatedData);
    };

    const handleAnalysis = async () => {
        if (!companyUrl) return;

        setIsAnalyzing(true);
        setAnalysisResult(null);
        setAnalysisError(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            const prompt = `
                You are a world-class AI strategy consultant performing an external analysis based on publicly available information.
                Your task is to analyze the company associated with the website URL provided and suggest potential AI integration strategies.

                **Target Website URL:** ${companyUrl}

                **Instructions:**
                1.  Use your search tool to gather information about the company at the provided URL. Find out what they do, their industry, and who their customers might be.
                2.  If direct analysis of the website's content is limited, perform searches for the company name or key terms found on the site to build a more complete picture.
                3.  Based on your findings, provide a concise analysis and strategic recommendations formatted in Markdown.
                4.  If you cannot find sufficient information to perform a meaningful analysis, state that clearly and explain that the website might not be extensively indexed or publicly detailed. Do not invent information.

                **Required Output Format (Markdown):**
                *   **Company Overview:** A brief summary of what the company does, its industry, and its target audience, based on your search findings.
                *   **AI Integration Opportunities:** A bulleted list of specific, actionable ways the company could integrate AI to:
                    *   Improve operational efficiency.
                    *   Increase profit margins.
                    *   Enhance customer satisfaction.
                *   **Source Acknowledgment:** Briefly mention that the analysis is based on publicly available, indexed web content.

                For each recommendation, briefly explain the potential impact. Keep the language professional, clear, and geared towards a CEO.
            `;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }],
                },
            });

            setAnalysisResult(response.text);

        } catch (e) {
            console.error("Error during website analysis:", e);
            setAnalysisError("Failed to analyze the website. Please ensure the URL is correct and publically accessible, and check your API key.");
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const themes: { name: string; value: Theme }[] = [
        { name: 'Dark', value: 'dark' },
        { name: 'Light', value: 'light' },
        { name: 'High Contrast', value: 'high-contrast' },
    ];

    return (
        <DashboardCard title="Scenario Simulator & Settings" icon={ICONS.CONTROLS}>
            <div className="space-y-4">
                 <div className="space-y-2 pb-4">
                    <h3 className="text-md font-semibold text-text-primary">Theme Customization</h3>
                    <div className="flex space-x-2 rounded-lg bg-bg-tertiary p-1">
                        {themes.map(t => (
                            <button
                                key={t.value}
                                onClick={() => setTheme(t.value)}
                                className={`w-full rounded-md py-1.5 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-secondary focus:ring-brand-blue ${
                                    theme === t.value
                                        ? 'bg-brand-blue text-white'
                                        : 'text-text-secondary hover:bg-bg-primary'
                                }`}
                            >
                                {t.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 pt-4 border-t border-border-color">
                    <ControlSlider 
                        label="Vision Alignment Score"
                        value={visionAlignment}
                        onChange={(e) => setVisionAlignment(Number(e.target.value))}
                        unit="%"
                    />
                    <ControlSlider 
                        label="Psychological Safety"
                        value={psychSafetyScore}
                        onChange={(e) => setPsychSafetyScore(Number(e.target.value))}
                        max={10}
                        step={0.1}
                        unit="/10"
                    />
                     <ControlSlider 
                        label="Experimentation Rate (QoQ)"
                        value={experimentationRate}
                        onChange={(e) => setExperimentationRate(Number(e.target.value))}
                        unit="%"
                    />
                    
                    <div className="md:col-span-2 lg:col-span-3 space-y-4 pt-4 border-t border-border-color">
                        <h3 className="text-md font-semibold text-text-primary">Communication Channel Effectiveness</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {communicationData.map(channel => (
                                <ControlSlider 
                                    key={channel.name}
                                    label={channel.name}
                                    value={channel.value}
                                    onChange={(e) => handleCommunicationChange(channel.name, Number(e.target.value))}
                                    unit="%"
                                />
                            ))}
                        </div>
                    </div>

                     <div className="md:col-span-2 lg:col-span-3 space-y-4 pt-4 border-t border-border-color">
                        <h3 className="text-md font-semibold text-text-primary">Budget Allocation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                             {budgetData.map(item => (
                                <ControlSlider 
                                    key={item.name}
                                    label={item.name}
                                    value={item.value}
                                    onChange={(e) => handleBudgetChange(item.name, Number(e.target.value))}
                                    unit="%"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-4 pt-4 border-t border-border-color">
                        <h3 className="text-md font-semibold text-text-primary">Goal Progress</h3>
                        {goalsData.map(goal => (
                             <ControlSlider 
                                key={goal.id}
                                label={goal.description}
                                value={goal.currentProgress}
                                onChange={(e) => handleGoalProgressChange(goal.id, Number(e.target.value))}
                                unit="%"
                            />
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-border-color">
                    <h3 className="text-md font-semibold text-text-primary mb-2">AI Content Search & Analysis</h3>
                    <p className="text-sm text-text-secondary mb-3">Enter a company's website URL to get AI-powered insights on potential integration opportunities.</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                         <input
                            type="url"
                            value={companyUrl}
                            onChange={(e) => setCompanyUrl(e.target.value)}
                            placeholder="https://www.example-company.com"
                            className="flex-grow p-2 bg-bg-tertiary text-text-primary rounded-md border border-border-color focus:outline-none focus:ring-2 focus:ring-brand-purple"
                            aria-label="Company website URL"
                        />
                        <button
                            onClick={handleAnalysis}
                            disabled={isAnalyzing || !companyUrl}
                            className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg hover:bg-violet-500 disabled:bg-bg-tertiary disabled:text-text-secondary disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {isAnalyzing ? 'Analyzing...' : 'Analyze Website'}
                        </button>
                    </div>
                    {isAnalyzing && (
                        <div className="flex justify-center items-center pt-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple"></div>
                        </div>
                    )}
                    {analysisError && <p className="text-danger text-center pt-4">{analysisError}</p>}
                    {analysisResult && (
                        <div className="mt-4 p-4 bg-bg-primary rounded-lg border border-border-color">
                            <h4 className="text-lg font-semibold text-brand-purple mb-3">Analysis & Recommendations</h4>
                            <div className="text-text-secondary whitespace-pre-wrap">{analysisResult}</div>
                        </div>
                    )}
                </div>

            </div>
        </DashboardCard>
    );
};

export default DashboardControls;