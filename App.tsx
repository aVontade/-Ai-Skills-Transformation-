import React, { useState } from 'react';
import Header from './components/Header';
import VisionSection from './components/VisionSection';
import CultureSection from './components/CultureSection';
import CommunicationSection from './components/CommunicationSection';
import EmpowermentSection from './components/EmpowermentSection';
import LeadershipSection from './components/LeadershipSection';
import EthicsSection from './components/EthicsSection';
import OrientationSection from './components/OrientationSection';
import ModelPerformanceSection from './components/ModelPerformanceSection';
import GoalSettingSection from './components/GoalSettingSection';
import TrainingStatusSection from './components/TrainingStatusSection';
import DataSourcesSection from './components/DataSourcesSection';
import InputSourcesSection from './components/InputSourcesSection';
import DashboardControls from './components/DashboardControls';
import StrategicRecommendations from './components/StrategicRecommendations';
import AboutUsSection from './components/AboutUsSection';
import { 
  INITIAL_BUDGET_DATA, 
  INITIAL_GOALS_DATA, 
  INITIAL_COMMUNICATION_DATA,
  INITIAL_INITIATIVES_DATA
} from './constants';
import { ChartDataPoint, Goal, Theme } from './types';

const App: React.FC = () => {
  // State for dynamic dashboard data
  const [visionAlignment, setVisionAlignment] = useState(88);
  const [psychSafetyScore, setPsychSafetyScore] = useState(9.2);
  const [experimentationRate, setExperimentationRate] = useState(15);
  const [budgetData, setBudgetData] = useState<ChartDataPoint[]>(INITIAL_BUDGET_DATA);
  const [goalsData, setGoalsData] = useState<Goal[]>(INITIAL_GOALS_DATA);
  const [communicationData, setCommunicationData] = useState<ChartDataPoint[]>(INITIAL_COMMUNICATION_DATA);
  const [theme, setTheme] = useState<Theme>('dark');


  return (
    <div className={`min-h-screen bg-bg-primary font-sans ${theme}`}>
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="md:col-span-2 xl:col-span-3">
             <OrientationSection />
          </div>
          
           <div className="md:col-span-2 xl:col-span-3">
             <DashboardControls 
                visionAlignment={visionAlignment}
                setVisionAlignment={setVisionAlignment}
                psychSafetyScore={psychSafetyScore}
                setPsychSafetyScore={setPsychSafetyScore}
                experimentationRate={experimentationRate}
                setExperimentationRate={setExperimentationRate}
                goalsData={goalsData}
                setGoalsData={setGoalsData}
                communicationData={communicationData}
                setCommunicationData={setCommunicationData}
                budgetData={budgetData}
                setBudgetData={setBudgetData}
                theme={theme}
                setTheme={setTheme}
             />
          </div>

          <div className="md:col-span-2 xl:col-span-3">
             <StrategicRecommendations
                visionAlignment={visionAlignment}
                psychSafetyScore={psychSafetyScore}
                experimentationRate={experimentationRate}
                goalsData={goalsData}
                communicationData={communicationData}
                budgetData={budgetData}
             />
          </div>

          <VisionSection visionAlignment={visionAlignment}/>
          <CultureSection psychSafetyScore={psychSafetyScore} experimentationRate={experimentationRate} />
          <CommunicationSection data={communicationData} theme={theme} />

          <div className="md:col-span-2 xl:col-span-3">
             <InputSourcesSection />
          </div>

          <div className="md:col-span-2 xl:col-span-3">
             <EmpowermentSection budgetData={budgetData} theme={theme} />
          </div>
          <div className="md:col-span-2 xl:col-span-3">
             <GoalSettingSection goals={goalsData} />
          </div>
          <LeadershipSection />
          <EthicsSection />
          <TrainingStatusSection />
          <DataSourcesSection />
          <div className="md:col-span-2 xl:col-span-3">
            <ModelPerformanceSection theme={theme} />
          </div>
          <div className="md:col-span-2 xl:col-span-3">
            <AboutUsSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;