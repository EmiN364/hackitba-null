// Handle delete axios.delete(`http://localhost:3000/api/products/${id}`)
// Path: src\pages\api\products\[id].ts
// Compare this snippet from src\pages\api\productDelete.ts:
// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PostgrestError, createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import supabase from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Receive formdata
        const { id } = req.query

        const { data, error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
    
        if (error) throw error;
        res.status(200).json({status: 'success'});
    
    } catch (error) {
        const { message } = error as PostgrestError;
        console.error('Error deleting product:', message);
        res.status(500).json({ error: 'Error deleting product' });
    }
    }