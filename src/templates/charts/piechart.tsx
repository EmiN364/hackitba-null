import React, { PureComponent } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import Title from '../../src/pages/dashboard/Title';

export interface GeometrySector {
    cx?: number;
    cy?: number;
    innerRadius?: number;
    outerRadius?: number;
    startAngle?: number;
    endAngle?: number;
    cornerRadius?: number;
    forceCornerRadius?: boolean;
    cornerIsExternal?: boolean;
}
interface SectorProps extends GeometrySector {
    className?: string;
}
export interface Coordinate {
    x: number;
    y: number;
}
declare type PieSectorDataItem = SectorProps & {
    percent?: number;
    name?: string | number;
    midAngle?: number;
    middleRadius?: number;
    tooltipPosition?: Coordinate;
    value?: number;
    paddingAngle?: number;
};


const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent } : PieSectorDataItem) => {
   
    if (innerRadius === undefined || outerRadius === undefined || midAngle === undefined || cx === undefined || cy === undefined || percent === undefined)
        return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieGraph extends PureComponent {
  render() {
    return (
        <>
            <Title>Graph</Title>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                </PieChart>
            </ResponsiveContainer>
        </>
    );
  }
}
