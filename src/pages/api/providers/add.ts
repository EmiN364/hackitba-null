// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError, createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Receive formdata
    const body = JSON.parse(req.body)
    const { name, email } = body

    const { data, error } = await supabase
        .from('providers')
        .insert([
            { name, email }
        ]);

    if (error) throw error;
    res.status(200).json({status: 'success'});

  } catch (error) {
    const { message } = error as PostgrestError;
    console.error('Error adding provider:', message);
    res.status(500).json({ error: 'Error adding provider' });
  }
}