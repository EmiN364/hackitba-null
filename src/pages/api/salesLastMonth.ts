// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase
        .from('totalsaleslastmonth')
        .select('*');
    
    if (error) throw error;
    res.status(200).json({sales: data[0].totalsales, month: data[0].month})
  } catch (error) {
    const { message } = error as PostgrestError;
    console.error('Error fetching sales:', message);
    res.status(500).json({ error: 'Error fetching sales' });
  }
}