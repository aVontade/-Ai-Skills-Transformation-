import React from 'react';
import DashboardCard from './DashboardCard';
import { ICONS } from '../constants';
import { Goal } from '../types';

const GoalItem: React.FC<{ goal: Goal }> = ({ goal }) => (
    <div className="bg-bg-tertiary p-4 rounded-lg">
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="font-semibold text-text-primary">{goal.description}</p>
                <p className="text-sm text-text-secondary">Target: {goal.targetMetric} | Deadline: {goal.deadline}</p>
            </div>
            <span className="text-lg font-bold text-scheme-blue">{goal.currentProgress}%</span>
        </div>
        <div className="w-full bg-bg-primary rounded-full h-2.5">
            <div className="bg-scheme-blue h-2.5 rounded-full" style={{ width: `${goal.currentProgress}%` }}></div>
        </div>
    </div>
);

interface GoalSettingSectionProps {
    goals: Goal[];
}

const GoalSettingSection: React.FC<GoalSettingSectionProps> = ({ goals }) => {
    return (
        <DashboardCard title="AI Transformation Goals" icon={ICONS.GOAL_SETTING} colorScheme="blue">
            <div className="space-y-4">
                {goals.map(goal => (
                    <GoalItem key={goal.id} goal={goal} />
                ))}
            </div>
        </DashboardCard>
    );
};

export default GoalSettingSection;