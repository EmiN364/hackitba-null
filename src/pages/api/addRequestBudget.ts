// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
var nodemailer = require('nodemailer');

import supabase from '../../lib/supabase';

async function getProviderEmail(providerId : number) {
    try {
        const { data, error } = await supabase
            .from('providers')
            .select('email')
            .eq('id', providerId);
        if (error) throw error;
        return data[0].email;
    } catch (error) {
        const { message } = error as PostgrestError;
        console.error('Error fetching provider email:', message);
        return { error: 'Error fetching provider email' };
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = JSON.parse(req.body);
    const emails = [];

    // for provider in body.providers, get email using provider id
    for (let provider of body.providers) {
        let email = await getProviderEmail(provider);
        emails.push(email)
    }


    console.log(emails);
    

    var transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS
        }
      });

    var mailOptions = {
        from: 'budgets@company.com',
        to: emails[0],
        subject: 'Request for budget',
        text: body.mail
    };

    transport.sendMail(mailOptions, function(error: any, info: { response: string; }){
    if (error) {
        console.log(error);
        throw error
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
    
    const { data, error } = await supabase
        .from('budget_requests')
        .insert([
            { products: body.products, provider_ids: body.providers, quantity: JSON.stringify(body.stock), status: 'pending' },
        ]);
    if (error) throw error;

    return res.status(200).json({ message: 'Success' });
    
  } catch (error) {
    const { message } = error as PostgrestError;
    console.error('Error while adding budget request:', message);
    res.status(500).json({ error: 'Error while adding budget request' });
  }
}