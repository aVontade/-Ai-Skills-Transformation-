
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartDataPoint, Theme } from '../../types';

interface BudgetChartProps {
    data: ChartDataPoint[];
    theme: Theme;
}

const BudgetChart: React.FC<BudgetChartProps> = ({ data, theme }) => {
  const themeColors = {
      dark: { palette: ['#00BFFF', '#8A2BE2', '#32CD32'], text: '#a0aec0', tooltipBg: '#1a202c', tooltipBorder: '#4a5568' },
      light: { palette: ['#3182ce', '#805ad5', '#38a169'], text: '#4a5568', tooltipBg: '#ffffff', tooltipBorder: '#e2e8f0' },
      'high-contrast': { palette: ['#00ffff', '#ff00ff', '#00ff00'], text: '#f0f0f0', tooltipBg: '#1a1a1a', tooltipBorder: '#666666' }
  };
  const colors = themeColors[theme];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors.palette[index % colors.palette.length]} />
          ))}
        </Pie>
        <Tooltip
            contentStyle={{ backgroundColor: colors.tooltipBg, border: `1px solid ${colors.tooltipBorder}`, color: colors.text }}
        />
        <Legend wrapperStyle={{color: colors.text}} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetChart;