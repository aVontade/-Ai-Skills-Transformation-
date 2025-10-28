import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import Modal from './Modal';
import { ICONS, SURVEY_DATA, FEEDBACK_DATA, PROGRESS_REPORT_DATA, RAW_SURVEY_INSIGHTS_DATA, RAW_FEEDBACK_DATA, RAW_PROGRESS_REPORTS_DATA } from '../constants';
import { RawFeedbackItem, RawProgressReport, SurveyInsight } from '../types';

type ModalContentType = 'surveys' | 'feedback' | 'reports';

const sentimentStyles = {
    Positive: { text: 'text-success', bg: 'bg-success/20', border: 'border-success' },
    Neutral: { text: 'text-warning', bg: 'bg-warning/20', border: 'border-warning' },
    Negative: { text: 'text-danger', bg: 'bg-danger/20', border: 'border-danger' },
};

const InputSourcesSection: React.FC = () => {
    const [modalContent, setModalContent] = useState<ModalContentType | null>(null);

    const reportCompliance = Math.round((PROGRESS_REPORT_DATA.submitted / PROGRESS_REPORT_DATA.expected) * 100);

    const handleOpenModal = (contentType: ModalContentType) => setModalContent(contentType);
    const handleCloseModal = () => setModalContent(null);

    const getModalTitle = () => {
        if (modalContent === 'surveys') return `Raw Insights: ${SURVEY_DATA.latestTopic}`;
        if (modalContent === 'feedback') return 'Raw Feedback Log';
        if (modalContent === 'reports') return 'Progress Report Submissions';
        return 'Details';
    };

    const renderModalContent = () => {
        switch (modalContent) {
            case 'surveys':
                return (
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                        {RAW_SURVEY_INSIGHTS_DATA.map((item: SurveyInsight) => (
                            <div key={item.id} className="bg-bg-primary p-3 rounded-lg">
                                <p className="font-semibold text-text-primary">{item.theme}</p>
                                <p className="text-sm text-text-secondary mt-1">{item.insight}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'feedback':
                return (
                     <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                        {RAW_FEEDBACK_DATA.map((item: RawFeedbackItem) => (
                             <div key={item.id} className={`p-3 rounded-lg border-l-4 ${sentimentStyles[item.sentiment].bg} ${sentimentStyles[item.sentiment].border}`}>
                                <p className="text-sm text-text-primary">"{item.comment}"</p>
                                <div className="text-xs text-text-secondary mt-2 flex justify-between">
                                    <span>{item.submittedBy} - {item.department}</span>
                                    <span className={sentimentStyles[item.sentiment].text}>{item.sentiment}</span>
                                    <span>{item.timestamp}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'reports':
                return (
                    <div className="max-h-[60vh] overflow-y-auto">
                        <table className="w-full text-sm text-left text-text-secondary">
                            <thead className="text-xs text-text-primary uppercase bg-bg-primary">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Team</th>
                                    <th scope="col" className="px-4 py-3">Report Title</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RAW_PROGRESS_REPORTS_DATA.map((item: RawProgressReport) => (
                                    <tr key={item.id} className="border-b border-border-color">
                                        <td className="px-4 py-3 font-medium text-text-primary">{item.team}</td>
                                        <td className="px-4 py-3">{item.title}</td>
                                        <td className={`px-4 py-3 font-semibold ${item.status === 'On Time' ? 'text-success' : 'text-warning'}`}>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <DashboardCard title="Data Inputs & Visualisation Feeds" icon={ICONS.INPUTS} colorScheme="blue">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Surveys */}
                    <button onClick={() => handleOpenModal('surveys')} className="text-left bg-bg-tertiary p-4 rounded-lg space-y-3 hover:bg-opacity-80 transition-all duration-200 transform hover:scale-105" aria-label={`View survey details for ${SURVEY_DATA.latestTopic}`}>
                        <h3 className="font-semibold text-text-primary text-lg">Surveys</h3>
                        <p className="text-sm text-text-secondary">Latest: <span className="font-medium text-text-primary">{SURVEY_DATA.latestTopic}</span></p>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-medium text-scheme-blue">Participation Rate</span>
                                <span className="text-sm font-medium text-scheme-blue">{SURVEY_DATA.participationRate}%</span>
                            </div>
                            <div className="w-full bg-bg-secondary rounded-full h-2.5">
                                <div className="bg-scheme-blue h-2.5 rounded-full" style={{ width: `${SURVEY_DATA.participationRate}%` }}></div>
                            </div>
                        </div>
                        <p className="text-sm text-text-secondary">Next Due: <span className="font-medium text-text-primary">{SURVEY_DATA.nextDueDate}</span></p>
                    </button>

                    {/* Feedback */}
                    <button onClick={() => handleOpenModal('feedback')} className="text-left bg-bg-tertiary p-4 rounded-lg space-y-3 hover:bg-opacity-80 transition-all duration-200 transform hover:scale-105" aria-label="View detailed feedback log">
                        <h3 className="font-semibold text-text-primary text-lg">Feedback Channels</h3>
                        <div className="flex justify-around text-center">
                            <div>
                                <p className="text-2xl font-bold text-scheme-blue">{FEEDBACK_DATA.totalItems}</p>
                                <p className="text-sm text-text-secondary">Total Items</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-scheme-blue">{FEEDBACK_DATA.positiveSentiment}%</p>
                                <p className="text-sm text-text-secondary">Positive Sentiment</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary mb-2">Key Themes:</p>
                            <div className="flex flex-wrap gap-2">
                                {FEEDBACK_DATA.keyThemes.map(theme => (
                                    <span key={theme} className="text-xs font-semibold bg-bg-secondary text-text-primary px-2 py-1 rounded-full">{theme}</span>
                                ))}
                            </div>
                        </div>
                    </button>

                    {/* Progress Reports */}
                    <button onClick={() => handleOpenModal('reports')} className="text-left bg-bg-tertiary p-4 rounded-lg space-y-3 hover:bg-opacity-80 transition-all duration-200 transform hover:scale-105" aria-label="View progress report submissions">
                        <h3 className="font-semibold text-text-primary text-lg">Progress Reports</h3>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-medium text-success">Submission Compliance</span>
                                <span className="text-sm font-medium text-success">{reportCompliance}%</span>
                            </div>
                            <div className="w-full bg-bg-secondary rounded-full h-2.5">
                                <div className="bg-success h-2.5 rounded-full" style={{ width: `${reportCompliance}%` }}></div>
                            </div>
                        </div>
                        <p className="text-center text-text-primary"><span className="text-3xl font-bold">{PROGRESS_REPORT_DATA.submitted}</span> / {PROGRESS_REPORT_DATA.expected} reports submitted this cycle.</p>
                    </button>
                </div>
            </DashboardCard>

            <Modal isOpen={!!modalContent} onClose={handleCloseModal} title={getModalTitle()}>
                {renderModalContent()}
            </Modal>
        </>
    );
};

export default InputSourcesSection;