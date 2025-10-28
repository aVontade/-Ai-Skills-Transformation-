import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import PerformanceTrendChart from './charts/PerformanceTrendChart';
import { ICONS, AI_MODELS_PERFORMANCE_DATA } from '../constants';
import { Theme } from '../types';

interface ModelPerformanceSectionProps {
    theme: Theme;
}

const ModelPerformanceSection: React.FC<ModelPerformanceSectionProps> = ({ theme }) => {
    const modelNames = Object.keys(AI_MODELS_PERFORMANCE_DATA);
    const [selectedModel, setSelectedModel] = useState(modelNames[0]);
    const [visibleMetrics, setVisibleMetrics] = useState({
        precision: true,
        recall: true,
        f1Score: true,
    });

    const handleMetricChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setVisibleMetrics(prev => ({ ...prev, [name]: checked }));
    };

    const modelData = AI_MODELS_PERFORMANCE_DATA[selectedModel];

    return (
        <DashboardCard title="AI Model Performance" icon={ICONS.MODEL_PERFORMANCE} colorScheme="teal">
            <div className="space-y-4">
                <div>
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full p-2 bg-bg-tertiary text-text-primary rounded-md border border-border-color focus:outline-none focus:ring-2 focus:ring-scheme-teal"
                        aria-label="Select AI Model"
                    >
                        {modelNames.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="border-t border-b border-border-color py-3">
                    <h4 className="text-sm font-semibold text-text-secondary mb-2 text-center">Show Detailed Metrics:</h4>
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                        {Object.keys(visibleMetrics).map((metric) => (
                            <label key={metric} className="flex items-center space-x-2 cursor-pointer text-text-secondary">
                                <input
                                    type="checkbox"
                                    name={metric}
                                    checked={visibleMetrics[metric as keyof typeof visibleMetrics]}
                                    onChange={handleMetricChange}
                                    className="form-checkbox h-4 w-4 bg-bg-tertiary border-border-color rounded text-scheme-teal focus:ring-scheme-teal"
                                />
                                <span className="capitalize text-xs sm:text-sm">{metric.replace('Score', '-Score')}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-3xl font-bold text-scheme-teal">{modelData.accuracy}%</p>
                        <p className="text-sm text-text-secondary">Current Accuracy</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-scheme-teal">{modelData.latency}ms</p>
                        <p className="text-sm text-text-secondary">Avg. Latency</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center pt-4 border-t border-border-color">
                    {visibleMetrics.precision && (
                        <div className="p-2">
                            <p className="text-2xl font-bold text-success">{(modelData.precision * 100).toFixed(1)}%</p>
                            <p className="text-sm text-text-secondary">Precision</p>
                        </div>
                    )}
                    {visibleMetrics.recall && (
                        <div className="p-2">
                            <p className="text-2xl font-bold text-warning">{(modelData.recall * 100).toFixed(1)}%</p>
                            <p className="text-sm text-text-secondary">Recall</p>
                        </div>
                    )}
                    {visibleMetrics.f1Score && (
                        <div className="p-2">
                            <p className="text-2xl font-bold text-orange">{(modelData.f1Score).toFixed(3)}</p>
                            <p className="text-sm text-text-secondary">F1-Score</p>
                        </div>
                    )}
                </div>
                
                <div>
                    <h3 className="text-md font-semibold text-text-primary mb-2 text-center">Accuracy Trend (5 Months)</h3>
                    <PerformanceTrendChart data={modelData.trendData} theme={theme} />
                </div>
            </div>
        </DashboardCard>
    );
};

export default ModelPerformanceSection;