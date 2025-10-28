import React from 'react';
import DashboardCard from './DashboardCard';
import { ICONS, MODEL_TRAINING_DATA } from '../constants';
import { ModelTrainingStatus } from '../types';

const TrainingItem: React.FC<{ item: ModelTrainingStatus }> = ({ item }) => {
    const progress = (item.currentEpoch / item.totalEpochs) * 100;
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-text-primary">{item.modelName}</p>
                <p className="text-sm text-text-secondary">Epoch {item.currentEpoch}/{item.totalEpochs}</p>
            </div>
            <div className="w-full bg-bg-tertiary rounded-full h-2.5">
                <div 
                    className="bg-scheme-teal h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.modelName} training progress`}
                ></div>
            </div>
        </div>
    );
};

const TrainingStatusSection: React.FC = () => {
    return (
        <DashboardCard title="Model Training Status" icon={ICONS.TRAINING} colorScheme="teal">
            <div className="space-y-4">
                {MODEL_TRAINING_DATA.map(item => (
                    <TrainingItem key={item.id} item={item} />
                ))}
            </div>
        </DashboardCard>
    );
};

export default TrainingStatusSection;