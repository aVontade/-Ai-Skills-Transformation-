
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Initiative, Theme } from '../../types';

interface InitiativeStatusChartProps {
    data: Initiative[];
    theme: Theme;
}

const InitiativeStatusChart: React.FC<InitiativeStatusChartProps> = ({ data, theme }) => {
    const statusCounts = data.reduce((acc, initiative) => {
        acc[initiative.status] = (acc[initiative.status] || 0) + 1;
        return acc;
    }, {} as Record<Initiative['status'], number>);
    
    const chartData = Object.keys(statusCounts).map(key => ({
        name: key,
        count: statusCounts[key as Initiative['status']],
    }));
    
    const themeColors = {
        dark: { text: '#a0aec0', grid: '#4a5568', tooltipBg: '#1a202c', tooltipBorder: '#4a5568', cursor: '#2d3748', bar: '#8A2BE2' },
        light: { text: '#4a5568', grid: '#e2e8f0', tooltipBg: '#ffffff', tooltipBorder: '#e2e8f0', cursor: '#edf2f7', bar: '#805ad5' },
        'high-contrast': { text: '#f0f0f0', grid: '#666666', tooltipBg: '#1a1a1a', tooltipBorder: '#666666', cursor: '#333333', bar: '#ff00ff' }
    };
    const colors = themeColors[theme];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis dataKey="name" stroke={colors.text} tick={{ fill: colors.text }}/>
        <YAxis stroke={colors.text} allowDecimals={false} tick={{ fill: colors.text }}/>
        <Tooltip
          contentStyle={{ backgroundColor: colors.tooltipBg, border: `1px solid ${colors.tooltipBorder}`, color: colors.text }}
          cursor={{ fill: colors.cursor }}
        />
        <Bar dataKey="count" fill={colors.bar} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InitiativeStatusChart;