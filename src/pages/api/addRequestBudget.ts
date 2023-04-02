// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../lib/supabase';

async function getProviderEmail(providerId : number) {
    try {
        const { data, error } = await supabase
            .from('providers')
            .select('email')
            .eq('id', providerId);
        if (error) throw error;
        return data;
    } catch (error) {
        const { message } = error as PostgrestError;
        console.error('Error fetching provider email:', message);
        return { error: 'Error fetching provider email' };
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = JSON.parse(req.body);
    console.log(body);
    
    const emails = [];

    // for provider in body.providers, get email using provider id
    for (let provider of body.providers) {
        emails.push(await getProviderEmail(provider))
    }

    // generate email using openai


    // for each email, send email to provider
    // for each email, add to budget_requests table
    
    var { data, error } = await supabase
        .from('budget_requests')
        .insert([
            { product_id: body.product_id, provider_id: body.provider_id, quantity: body.quantity, status: 'pending' },
        ]);
    if (error) throw error;



    return res.status(200).json({ message: 'Success' });
    
  } catch (error) {
    res.status(500).json({ error: 'Error while adding budget request' });
  }
}