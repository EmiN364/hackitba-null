// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../lib/supabase';

const getProductProviders = async (productIds : number[]) => {
  const { data, error } = await supabase
    .from("product_providers")
    .select("*")
    
  if (error) throw error;

  data.filter((productProvider) => productIds.includes(productProvider.product_id));
  return data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const productProviders = await getProductProviders(req.body);
    // Remove duplicates from productProviders
    const uniqueProductProviders = productProviders.filter((productProvider, index, self) =>
      index === self.findIndex((t) => (
        t.product_id === productProvider.product_id && t.provider_id === productProvider.provider_id
      ))
    );
    res.status(200).json(uniqueProductProviders);

  } catch (error) {
    const { message } = error as PostgrestError;
    console.error('Error fetching providers:', message);
    res.status(500).json({ error: 'Error fetching providers' });
  }
}