// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../lib/supabase';

const getProductProviders = async (productIds : string) => {
  const { data, error } = await supabase
    .from("product_providers")
    .select("*")
    
  if (error) throw error;

  productIds = JSON.parse(productIds);

  data.filter((productProvider) => productIds.includes(productProvider.product_id));
  return data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const productProviders = await getProductProviders(req.body);
    
    const seenIds : any = {};
    const uniqueArr = productProviders.filter(obj => {
      if (seenIds[obj.providerId]) {
        return false;
      }
      seenIds[obj.providerId] = true;
      return true;
    });

    res.status(200).json(uniqueArr);

  } catch (error) {
    const { message } = error as PostgrestError;
    console.error('Error fetching providers:', message);
    res.status(500).json({ error: 'Error fetching providers' });
  }
}