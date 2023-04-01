// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data, error } = await supabase.from('sales').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Error fetching products' });
  }
}