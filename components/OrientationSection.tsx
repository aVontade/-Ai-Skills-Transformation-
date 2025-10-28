

import React from 'react';
import DashboardCard from './DashboardCard';
import { ICONS } from '../constants';

const OrientationSection: React.FC = () => {
    return (
        <DashboardCard title="Orientation: The Why & The How" icon={ICONS.ORIENTATION}>
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-brand-blue mb-2">The Imperative for Change</h3>
                    <p className="text-text-secondary">
                        The AI economy is not on the horizon; it is here. To remain leaders and innovators, we must fundamentally reshape how we work, create, and deliver value. This transformation is not about replacing our people, but augmenting their intelligence and creativity with powerful AI tools. The need is clear: adapt and thrive, or risk becoming obsolete.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-brand-purple mb-2">Our Guiding Principles</h3>
                    <p className="text-text-secondary">
                       Our journey is guided by our core constitution: to foster an environment of psychological safety, empower bottom-up innovation, and ensure every team member has the agency to experiment and grow. We will lead with transparency, govern with ethics, and commit to continuous learning, together.
                    </p>
                </div>
            </div>
        </DashboardCard>
    );
};

export default OrientationSection;