import React from 'react';
import DashboardCard from './DashboardCard';
import { ICONS } from '../constants';

const CLIENTS = [
    'Engen', 'Petronas', 'PPC', 'SAP', 'Telkom', 'De Beers Group',
    'Transnet', 'Standard Bank', 'SABS', 'Woolworths', 'City of Cape Town', 'Dept. of Public Works',
    'Absa Bank', 'Barclays Bank', 'Eqtech Africa'
];

const AboutUsSection: React.FC = () => {
    return (
        <DashboardCard title="About Avontade PDS" icon={ICONS.ABOUT_US}>
            {/* Top Row: Core Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Core Services & Founder's Note */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-brand-blue mb-3">Our Core Services</h3>
                        <ul className="list-disc list-inside text-text-secondary space-y-2 text-sm">
                            <li>AI Change Impact Assessment & Readiness</li>
                            <li>Leadership Alignment & Executive Coaching</li>
                            <li>Stakeholder Engagement & Communication Strategy</li>
                            <li>Custom AI Training & Capability Building</li>
                            <li>Resistance Management & Mitigation</li>
                            <li>Developing KPIs to Measure & Sustain Change</li>
                        </ul>
                    </div>
                    <div className="bg-bg-tertiary p-4 rounded-lg italic border-l-4 border-brand-purple">
                        <p className="text-text-secondary">"I have been practicing in the change management space for more than 20 years but have never witnessed such an acceleration."</p>
                        <p className="text-right text-text-secondary mt-2 text-sm">- Hamede Ali, Founder &amp; CEO</p>
                    </div>
                </div>

                {/* Right Column: Why Choose Us */}
                <div className="space-y-6">
                     <div>
                        <h3 className="text-lg font-semibold text-brand-purple mb-3">Why Choose Us?</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-scheme-teal mr-3 mt-1 font-bold text-lg">✓</span>
                                <div>
                                    <h4 className="font-semibold text-text-primary">Deep Expertise</h4>
                                    <p className="text-sm text-text-secondary">Over 20 years of dedicated experience in managing complex organizational transformations.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                 <span className="text-scheme-teal mr-3 mt-1 font-bold text-lg">✓</span>
                                <div>
                                    <h4 className="font-semibold text-text-primary">Proven Methodology</h4>
                                    <p className="text-sm text-text-secondary">Blending Prosci's ADKAR model with agile principles for a robust, flexible, and effective approach.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                 <span className="text-scheme-teal mr-3 mt-1 font-bold text-lg">✓</span>
                                <div>
                                    <h4 className="font-semibold text-text-primary">People-Centric & Data-Driven</h4>
                                    <p className="text-sm text-text-secondary">Focusing on empathy and psychological safety, informed by data analytics to guide strategy and ensure success.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Clients & Recommendations */}
            <div className="mt-8 pt-6 border-t border-border-color grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Clients */}
                <div>
                    <h3 className="text-lg font-semibold text-brand-blue mb-3">Our Valued Clients</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {CLIENTS.map(client => (
                            <div key={client} className="bg-bg-tertiary p-3 rounded-md text-center flex items-center justify-center">
                                <span className="text-sm font-medium text-text-secondary">{client}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-brand-purple mb-3">What Our Clients Say</h3>
                    <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-brand-purple">
                        <blockquote className="italic text-text-secondary text-sm">
                            “Hamede's extensive exposure to corporate problems places him in an ideal position to provide solutions and value at all level of the organisation. He has provided world class systems and methodology, that has assisted our organisation in reaching our goals.”
                        </blockquote>
                        <cite className="block text-right text-text-secondary mt-2 text-xs not-italic">
                            - Deva Chetty, CEO Eqtech Africa
                        </cite>
                    </div>
                    <div className="bg-bg-tertiary p-4 rounded-lg border-l-4 border-brand-purple">
                        <blockquote className="italic text-text-secondary text-sm">
                            “Hamede has lots of energy and a "can-do" attitude and when he combines these together with his excellent subject matter knowledge is someone who delivers and does an excellent job. He is also a great guy... I have no hesitation in recommending him”
                        </blockquote>
                        <cite className="block text-right text-text-secondary mt-2 text-xs not-italic">
                            - Dave Wright, GM: Corporate Planning, Engen Petroleum Ltd
                        </cite>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default AboutUsSection;