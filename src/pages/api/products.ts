// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../lib/supabase';

type totalSales = {
  productId: number;
  month: string;
  total_sales: number;
}

type Product = {
  productId: number;
  month: string;
  total_sales: number;
};

type Stock = {
  productId: number;
  stock: number;
};

function calculateStockPrediction(
  products: totalSales[],
  stock: number,
  productId: number
): number {
  let currentDate = new Date();
  // subtract 1 month from current date
  currentDate.setMonth(currentDate.getMonth() - 2);
  const lastYearDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth()
  );

  const lastYearMonth = `${lastYearDate.getFullYear()}-${
    ('0' + (lastYearDate.getMonth() + 1)).slice(-2)
  }`;
  const lastYearLastMonth = `${lastYearDate.getFullYear()}-${
    ('0' + (lastYearDate.getMonth())).slice(-2)
  }`;

  const currentMonth = `${currentDate.getFullYear()}-${
    ('0' + (currentDate.getMonth() + 1)).slice(-2)
  }`;
  const currentLastMonth = `${currentDate.getFullYear()}-${
    ('0' + (currentDate.getMonth())).slice(-2)
  }`;

  const lastYearSales = products.find(
    (product) => product.month.includes(lastYearMonth)
  )?.total_sales;

  /* const currentSales = products.find(
    (product) => product.month.includes(currentMonth)
  )?.total_sales; */

  const lastYearLastMonthSales = products.find(
    (product) => product.month.includes(lastYearLastMonth)
  )?.total_sales;

  const currentLastMonthSales = products.find(
    (product) => product.month.includes(currentLastMonth)
  )?.total_sales;

  // console.log(lastYearSales, lastYearLastMonthSales, currentLastMonthSales);
  

  if (!lastYearSales || !lastYearLastMonthSales || !currentLastMonthSales)
    return -1;  

  const salesIncrease = ((currentLastMonthSales - lastYearLastMonthSales) / lastYearLastMonthSales) * 100;
  
  const expectedSalesNextMonth = lastYearSales * (1 + salesIncrease / 100);

  let expectedOutOfStock = expectedSalesNextMonth / 30;
  expectedOutOfStock = Math.round(stock / expectedOutOfStock);

/*   const monthsLeft = Math.floor(stock / currentSales);

  const expectedIncrease = salesIncrease;

  const expectedStock = stock + monthsLeft * (currentSales * (1 + expectedIncrease / 100)); */

  return expectedOutOfStock;
}


async function getOutOfStock(productId: number) {
  const { data, error } = await supabase
    .from('totalsaleslive')
    .select('*')
    .eq('productId', productId)
  if (error) throw error;

  // convert data to totalSales[]
  const totalSales = data.map((item) => {
    return {
      productId: item.productId,
      month: item.month,
      total_sales: item.total_sales
    }
  })

  const product = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
  if (product.error || !product.data) throw product.error;

  const stock = product.data[0].stock

  return calculateStockPrediction(
    totalSales,
    stock,
    productId
  )
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;

    const products = await Promise.all(data.map(async (product) => {
      const outofstock = await getOutOfStock(product.id);
      
      return {
        ...product,
        outofstock: outofstock
      };
    }));
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Error fetching products' });
  }
}