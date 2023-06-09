import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import Title from './Title';

type Order = {
  date: string;
  name: string;
  shipTo: string;
  paymentMethod: string;
  amount: number;
}

// Generate Order Data
function createData(
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number
) {
  return {  date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {

  const [rows, setRows] = React.useState<Order[]>([])

  // get last sales from supabase db by calling /api/lastSales
  React.useEffect(() => { 
    fetch('/api/lastsales')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data = data.map((sale: any) => {
            sale.month = new Date(sale.month).toLocaleString('default', { month: 'short', year: 'numeric' })
            return createData(sale.month, sale.name, "Argentina", "Online", sale.total_sales)
        })
        setRows(data)
      })
  }, [])

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Units Sold</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: Order, index: number) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
