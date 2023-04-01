import { useTheme } from '@mui/material/styles';
import { Fragment, useEffect, useState } from 'react';
import { Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

type Sale = {
  product_id: number
  month: string
  total_sales: number
}

async function getSales() {
  const response = await fetch('/api/totalSales?id=1516');
  const sales = await response.json();
  return sales;
}

/* const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
]; */

export default function Chart() {
  const theme = useTheme();
  const [sales, setSales] = useState<Sale[]>([]);
  useEffect(() => {
    getSales().then((sales) => {
      sales = sales.map((sale: Sale) => {
        let {month, total_sales} = sale
        // month = month.slice(0, 7)
        month = new Date(month).toLocaleString('default', { month: 'short', year: 'numeric' })
        return {month, total_sales}
      })
      setSales(sales);
    });
  }, []);

  return (
    <Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={sales}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="month"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="total_sales"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  );
}
