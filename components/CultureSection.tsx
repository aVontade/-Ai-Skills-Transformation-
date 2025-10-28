import React from 'react';
import DashboardCard from './DashboardCard';
import { ICONS } from '../constants';

interface CultureSectionProps {
    psychSafetyScore: number;
    experimentationRate: number;
}

const CultureSection: React.FC<CultureSectionProps> = ({ psychSafetyScore, experimentationRate }) => {
    return (
        <DashboardCard title="Culture of Experimentation" icon={ICONS.CULTURE} colorScheme="purple">
            <div className="space-y-4 text-center">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-3xl font-bold text-scheme-purple">{psychSafetyScore.toFixed(1)}<span className="text-xl">/10</span></p>
                        <p className="text-sm text-text-secondary">Psychological Safety Score</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-scheme-purple">+{experimentationRate}%</p>
                        <p className="text-sm text-text-secondary">Experimentation Rate (QoQ)</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-text-primary mt-4 mb-2">Celebrated Learnings</h3>
                    <div className="bg-bg-tertiary p-3 rounded-lg text-left">
                        <p className="text-sm text-text-secondary">
                           <span className="font-bold text-scheme-purple">Project Phoenix:</span> An AI model for churn prediction underperformed, but revealed critical flaws in our legacy data pipeline, leading to a major infrastructure upgrade.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default CultureSection;