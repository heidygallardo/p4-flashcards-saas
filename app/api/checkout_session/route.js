/*import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const formatAmountForStripe = (amount) => {
    return Math.round(amount * 100)
}

export async function GET(req) {

    const searchParams = req.nextUrl.searchParams
    const session_id = searchParams.get('session_id')

    try {
        const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
        return NextResponse.json(checkoutSession)
    } catch (error) {
        console.error('Error retrieving checkout session: ', error)
        return NextResponse.json({error: {message: error.message}}, {status: 500})
    }
}


export async function POST(req) {
    const { plan } = await req.json();

    let unitAmount;
    let productName;

    if (plan === 'basic') {
        unitAmount = formatAmountForStripe(5);  // $5/month
        productName = 'Basic Subscription';
    } else if (plan === 'pro') {
        unitAmount = formatAmountForStripe(10); // $10/month
        productName = 'Pro Subscription';
    } else {
        return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: productName,
                    },
                    unit_amount: unitAmount,
                    recurring: {
                        interval: 'month',
                        interval_count: 1,
                    }
                },
                quantity: 1,
            },
        ],
        success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    try {
        const checkoutSession = await stripe.checkout.sessions.create(params);
        return NextResponse.json(checkoutSession, { status: 200 });
    } catch (error) {
        console.error('Error creating checkout session: ', error);
        return NextResponse.json({ error: { message: error.message } }, { status: 500 });
    }
}


*/

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

export async function POST(req) {
  const { plan } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: plan === 'basic' ? 'Basic Plan' : 'Pro Plan',
          },
          unit_amount: plan === 'basic' ? 500 : 1000, // $5 or $10
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/generate`, // Redirect to /generate after successful payment
      cancel_url: `${req.headers.get('origin')}/pricing`,
    });

    return new Response(JSON.stringify({ id: session.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
