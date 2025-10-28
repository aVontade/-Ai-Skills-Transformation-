import React, { useState } from 'react';
import DashboardCard from './DashboardCard';
import Modal from './Modal';
import { ICONS, DATA_SOURCES_DATA } from '../constants';
import { DataSource } from '../types';

const statusStyles: { [key in DataSource['status']]: { text: string; bg: string; } } = {
    Connected: { text: 'text-success', bg: 'bg-success' },
    Degraded: { text: 'text-warning', bg: 'bg-warning' },
    Offline: { text: 'text-danger', bg: 'bg-danger' },
};

const DataSourceItem: React.FC<{ item: DataSource; onClick: () => void }> = ({ item, onClick }) => {
    const { text, bg } = statusStyles[item.status];
    return (
        <li>
            <button 
                onClick={onClick}
                className="w-full flex items-center justify-between py-2 px-3 bg-bg-tertiary rounded-lg hover:bg-opacity-70 transition-colors duration-200 text-left"
                aria-label={`View details for ${item.name}`}
            >
                <div>
                    <p className="font-semibold text-text-primary">{item.name}</p>
                    <p className="text-sm text-text-secondary">{item.type} - Last sync: {item.lastSync}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${bg}`} />
                    <span className={`text-sm font-medium ${text}`}>{item.status}</span>
                </div>
            </button>
        </li>
    );
};

const DataSourcesSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null);
    const [dataSources, setDataSources] = useState<DataSource[]>(DATA_SOURCES_DATA);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleOpenModal = (item: DataSource) => {
        setSelectedDataSource(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDataSource(null);
    };
    
    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            const refreshedData = dataSources.map(source => ({
                ...source,
                lastSync: 'Just now',
            }));
            setDataSources(refreshedData);
            setIsRefreshing(false);
        }, 1500); // Simulate network delay
    };

    const refreshButton = (
        <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-sm bg-scheme-teal/20 text-scheme-teal font-semibold py-1 px-3 rounded-md hover:bg-scheme-teal/40 disabled:bg-bg-tertiary disabled:text-text-secondary disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
        >
            {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
        </button>
    );

    return (
        <>
            <DashboardCard title="Data Sources & Inputs" icon={ICONS.DATA_SOURCES} headerAction={refreshButton} colorScheme="teal">
                <ul className="space-y-3">
                    {dataSources.map(item => (
                        <DataSourceItem key={item.id} item={item} onClick={() => handleOpenModal(item)} />
                    ))}
                </ul>
            </DashboardCard>
            
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedDataSource?.name || 'Data Source Details'}>
                {selectedDataSource && (
                    <div className="space-y-4 text-text-secondary">
                        <div>
                            <h4 className="font-semibold text-text-secondary">Connection String</h4>
                            <p className="font-mono bg-bg-primary p-2 rounded text-sm break-all">{selectedDataSource.connectionString}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-text-secondary">Update Frequency</h4>
                            <p>{selectedDataSource.updateFrequency}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-text-secondary">Responsible Team</h4>
                            <p>{selectedDataSource.responsibleTeam}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default DataSourcesSection;