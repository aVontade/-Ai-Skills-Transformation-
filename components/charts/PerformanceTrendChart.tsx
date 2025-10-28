
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AIModelPerformanceDataPoint, Theme } from '../../types';

interface PerformanceTrendChartProps {
    data: AIModelPerformanceDataPoint[];
    theme: Theme;
}

const PerformanceTrendChart: React.FC<PerformanceTrendChartProps> = ({ data, theme }) => {
    const themeColors = {
        dark: { text: '#a0aec0', grid: '#4a5568', tooltipBg: '#2d3748', tooltipBorder: '#4a5568', line: '#00BFFF', cursor: '#8A2BE2' },
        light: { text: '#4a5568', grid: '#e2e8f0', tooltipBg: '#ffffff', tooltipBorder: '#e2e8f0', line: '#3182ce', cursor: '#805ad5' },
        'high-contrast': { text: '#f0f0f0', grid: '#666666', tooltipBg: '#1a1a1a', tooltipBorder: '#666666', line: '#00ffff', cursor: '#ff00ff' }
    };
    const colors = themeColors[theme];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: colors.tooltipBg, border: `1px solid ${colors.tooltipBorder}`}} className="p-3 rounded-lg shadow-xl text-sm">
                    <p style={{color: colors.text}} className="font-bold mb-1">{`Month: ${label}`}</p>
                    <p style={{color: colors.line}}>{`Accuracy: ${payload[0].value.toFixed(1)}%`}</p>
                </div>
            );
        }
        return null;
    };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis dataKey="month" stroke={colors.text} tick={{ fill: colors.text }} />
        <YAxis 
          stroke={colors.text} 
          tick={{ fill: colors.text }} 
          domain={['dataMin - 1', 'dataMax + 1']}
          tickFormatter={(tick) => `${tick.toFixed(1)}%`}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: colors.cursor, strokeWidth: 1 }}
        />
        <Line type="monotone" dataKey="accuracy" stroke={colors.line} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceTrendChart;