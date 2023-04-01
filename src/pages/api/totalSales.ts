// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // recieve id as param
    const { id } = req.query;
    const { data, error } = await supabase.from('totalsaleslive').select('*').eq('productId', id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    const { message } = error as PostgrestError;
    console.error('Error fetching totalSales:', message);
    res.status(500).json({ error: 'Error fetching totalSales' });
  }
}