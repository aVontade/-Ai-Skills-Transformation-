
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartDataPoint, Theme } from '../../types';

interface CommunicationChartProps {
    data: ChartDataPoint[];
    theme: Theme;
}

const CommunicationChart: React.FC<CommunicationChartProps> = ({ data, theme }) => {
    const themeColors = {
        dark: { text: '#a0aec0', grid: '#4a5568', tooltipBg: '#1a202c', tooltipBorder: '#4a5568', cursor: '#2d3748', bar: '#00BFFF' },
        light: { text: '#4a5568', grid: '#e2e8f0', tooltipBg: '#ffffff', tooltipBorder: '#e2e8f0', cursor: '#edf2f7', bar: '#3182ce' },
        'high-contrast': { text: '#f0f0f0', grid: '#666666', tooltipBg: '#1a1a1a', tooltipBorder: '#666666', cursor: '#333333', bar: '#00ffff' }
    };
    const colors = themeColors[theme];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis type="number" stroke={colors.text} domain={[0, 100]} tick={{ fill: colors.text }} tickFormatter={(tick) => `${tick}%`}/>
        <YAxis type="category" dataKey="name" stroke={colors.text} width={100} tick={{ fill: colors.text }} />
        <Tooltip
          contentStyle={{ backgroundColor: colors.tooltipBg, border: `1px solid ${colors.tooltipBorder}`, color: colors.text }}
          cursor={{ fill: colors.cursor }}
        />
        <Bar dataKey="value" fill={colors.bar} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CommunicationChart;