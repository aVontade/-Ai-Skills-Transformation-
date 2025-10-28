import React from 'react';
import DashboardCard from './DashboardCard';
import CommunicationChart from './charts/CommunicationChart';
import { ICONS } from '../constants';
import { ChartDataPoint, Theme } from '../types';

interface CommunicationSectionProps {
    data: ChartDataPoint[];
    theme: Theme;
}

const CommunicationSection: React.FC<CommunicationSectionProps> = ({ data, theme }) => {
    return (
        <DashboardCard title="Transparency & Communication" icon={ICONS.COMMUNICATION} colorScheme="blue">
            <div>
                <h3 className="text-md font-semibold text-text-primary mb-2">Channel Effectiveness</h3>
                <CommunicationChart data={data} theme={theme} />
                <div className="mt-4 flex justify-around text-center">
                    <div>
                        <p className="text-2xl font-bold text-scheme-blue">1,200+</p>
                        <p className="text-sm text-text-secondary">Feedback Items Received</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-scheme-blue">85%</p>
                        <p className="text-sm text-text-secondary">Feedback Addressed</p>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default CommunicationSection;