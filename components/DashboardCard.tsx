import React, { ReactNode } from 'react';

type ColorScheme = 'purple' | 'blue' | 'teal';

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
  colorScheme?: ColorScheme;
}

const colorMap: Record<ColorScheme, { border: string; icon: string }> = {
  purple: { border: 'border-scheme-purple', icon: 'text-scheme-purple' },
  blue: { border: 'border-scheme-blue', icon: 'text-scheme-blue' },
  teal: { border: 'border-scheme-teal', icon: 'text-scheme-teal' },
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children, className = '', headerAction, colorScheme }) => {
  const schemeStyles = colorScheme ? colorMap[colorScheme] : null;

  return (
    <div className={`bg-bg-secondary rounded-xl shadow-lg p-6 h-full flex flex-col border-t-4 ${schemeStyles ? schemeStyles.border : 'border-transparent'} ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={schemeStyles ? schemeStyles.icon : 'text-brand-blue'}>{icon}</div>
          <h2 className="text-xl font-bold ml-3 text-text-primary">{title}</h2>
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;