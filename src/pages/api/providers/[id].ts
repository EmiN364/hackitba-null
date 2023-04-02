// Compare this snippet from src\pages\api\productDelete.ts:
// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PostgrestError, createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            // Receive formdata
            const { id } = req.query

            const { data, error } = await supabase
                .from('providers')
                .delete()
                .eq('id', id);
        
            if (error) throw error;
            res.status(200).json({status: 'success'});
        
        } catch (error) {
            const { message } = error as PostgrestError;
            console.error('Error deleting provider:', message);
            res.status(500).json({ error: 'Error deleting provider' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}