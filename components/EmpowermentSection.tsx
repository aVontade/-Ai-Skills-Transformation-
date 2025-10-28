import React from 'react';
import DashboardCard from './DashboardCard';
import BudgetChart from './charts/BudgetChart';
import InitiativeStatusChart from './charts/InitiativeStatusChart';
import { ICONS, INITIAL_INITIATIVES_DATA } from '../constants';
import { ChartDataPoint, Theme } from '../types';

interface EmpowermentSectionProps {
    budgetData: ChartDataPoint[];
    theme: Theme;
}

const EmpowermentSection: React.FC<EmpowermentSectionProps> = ({ budgetData, theme }) => {
    return (
        <DashboardCard title="Empowerment & Resource Allocation" icon={ICONS.EMPOWERMENT} colorScheme="blue">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-md font-semibold text-text-primary mb-2 text-center">AI Initiative Budget Allocation</h3>
                    <BudgetChart data={budgetData} theme={theme} />
                </div>
                <div>
                    <h3 className="text-md font-semibold text-text-primary mb-2 text-center">Bottom-Up Initiative Status</h3>
                    <InitiativeStatusChart data={INITIAL_INITIATIVES_DATA} theme={theme} />
                </div>
            </div>
        </DashboardCard>
    );
};

export default EmpowermentSection;