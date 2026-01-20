'use client'
import { Card } from '@radix-ui/themes';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
    const data = [
        { label: 'Open', value: open, color: '#e5484d' },
        { label: 'In Progress', value: inProgress, color: '#8e4ec6' },
        { label: 'Closed', value: closed, color: '#30a46e' },
    ];

  return (
    <Card style={{ height: '100%' }}>
        <ResponsiveContainer width='100%' height='100%' minHeight={300}>
            <BarChart data={data}>
                <XAxis dataKey='label' />
                <YAxis />
                <Bar dataKey='value' barSize={60}>
                    {data.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </Card>
  );
}

export default IssueChart
