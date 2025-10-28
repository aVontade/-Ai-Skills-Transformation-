import React from 'react';
import DashboardCard from './DashboardCard';
import { ICONS, LEARNING_MODULES_DATA, ETHICAL_AMBASSADORS_DATA } from '../constants';
import { LearningModule } from '../types';

const LearningModuleItem: React.FC<{ module: LearningModule }> = ({ module }) => (
    <li className="flex items-center justify-between py-2">
        <span className={`${module.completed ? 'text-text-secondary line-through' : 'text-text-primary'}`}>{module.title}</span>
        {module.completed ? (
            <span className="text-success">✔️</span>
        ) : (
            <button className="text-xs bg-scheme-purple/80 hover:bg-scheme-purple text-white font-bold py-1 px-2 rounded">
                Start
            </button>
        )}
    </li>
);

const LeadershipSection: React.FC = () => {
    return (
        <DashboardCard title="Leadership Role-Modeling" icon={ICONS.LEADERSHIP} colorScheme="purple">
            <div className="space-y-4">
                <div>
                    <h3 className="text-md font-semibold text-text-primary mb-2">Personal Learning Journey</h3>
                    <ul className="divide-y divide-border-color">
                        {LEARNING_MODULES_DATA.map(module => <LearningModuleItem key={module.id} module={module} />)}
                    </ul>
                </div>
                <div>
                    <h3 className="text-md font-semibold text-text-primary mb-2">Ethical AI Ambassadors</h3>
                    <ul className="space-y-3">
                        {ETHICAL_AMBASSADORS_DATA.map(ambassador => (
                             <li key={ambassador.id} className="flex items-center space-x-3 bg-bg-tertiary p-2 rounded-lg">
                                <img src={ambassador.avatar} alt={ambassador.name} className="h-10 w-10 rounded-full"/>
                                <div>
                                    <p className="font-semibold text-text-primary">{ambassador.name}</p>
                                    <p className="text-sm text-text-secondary">{ambassador.department}</p>
                                </div>
                             </li>
                        ))}
                    </ul>
                </div>
                <div className="text-center bg-bg-tertiary p-3 rounded-lg">
                    <p className="text-2xl font-bold text-scheme-purple">Top 5%</p>
                    <p className="text-sm text-text-secondary">Leadership Engagement Score (Company-wide)</p>
                </div>
            </div>
        </DashboardCard>
    );
};

export default LeadershipSection;