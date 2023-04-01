// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError, createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Receive formdata
    const body = JSON.parse(req.body)
    const { products, providers } = body

    for ( let product of products ) {
        for ( let provider of providers) {
            const {error} = await supabase.from('productsProviders').insert([
                { productId: product, providerId: provider }
            ])
            if (error) throw error;
        }
    }
    res.status(200).json({status: 'success'});

  } catch (error) {
    const { message } = error as PostgrestError;
    console.error('Error adding providers:', message);
    res.status(500).json({ error: 'Error adding providers' });
  }
}