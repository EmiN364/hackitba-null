import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  const [salesLastMonth, setSalesLastMonth] = React.useState(0)
  const [lastMonth, setLastMonth] = React.useState<String>(new Date().toLocaleDateString('en', { month: 'long', year: 'numeric' }))
  //function to get total sales of last month calling /api/sales/lastmonth
  React.useEffect(() => {
    const fetchSales = async () => {
      const response = await axios.get('/api/salesLastMonth')
      setSalesLastMonth(response.data.sales)
      setLastMonth(new Date(response.data.month).toLocaleDateString('en', { month: 'long', year: 'numeric' }))
    }
    fetchSales()
  })

  return (
    <React.Fragment>
      <Title>Recent Sales</Title>
      <Typography component="p" variant="h4">
        {salesLastMonth}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {lastMonth}
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
