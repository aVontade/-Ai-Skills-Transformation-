import React from 'react';
import DashboardCard from './DashboardCard';
import { ICONS, ETHICAL_AMBASSADORS_DATA } from '../constants';

const EthicsSection: React.FC = () => {
    return (
        <DashboardCard title="Ethical Governance & Inclusion" icon={ICONS.ETHICS} colorScheme="purple">
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-3xl font-bold text-success">A+</p>
                        <p className="text-sm text-text-secondary">Bias Mitigation Audit</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-success">98%</p>
                        <p className="text-sm text-text-secondary">Inclusivity Index (Training)</p>
                    </div>
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
            </div>
        </DashboardCard>
    );
};

export default EthicsSection;