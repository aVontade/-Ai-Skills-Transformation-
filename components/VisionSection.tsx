import React from 'react';
import DashboardCard from './DashboardCard';
import { ICONS } from '../constants';

interface VisionSectionProps {
    visionAlignment: number;
}

const VisionSection: React.FC<VisionSectionProps> = ({ visionAlignment }) => {
    return (
        <DashboardCard title="Strategic Vision & Narrative" icon={ICONS.VISION} colorScheme="purple">
            <div className="space-y-4">
                <p className="text-text-secondary italic">
                    "To empower every team with intelligent tools, transforming challenges into opportunities and augmenting human creativity to deliver unparalleled value to our customers."
                </p>
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-scheme-purple">Vision Alignment Score</span>
                        <span className="text-sm font-medium text-scheme-purple">{visionAlignment}%</span>
                    </div>
                    <div className="w-full bg-bg-tertiary rounded-full h-2.5">
                        <div className="bg-scheme-purple h-2.5 rounded-full" style={{ width: `${visionAlignment}%` }}></div>
                    </div>
                </div>
                <p className="text-sm text-text-secondary">This score reflects employee survey results on understanding and believing in our AI-driven future.</p>
            </div>
        </DashboardCard>
    );
};

export default VisionSection;