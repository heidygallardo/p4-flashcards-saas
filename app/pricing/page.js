'use client';
import { useUser } from '@clerk/nextjs';
import { Container, Box, Grid, Typography, Button } from "@mui/material";
import Head from "next/head";
import getStripe from '@/utils/get-stripe';

const Pricing = () => {
  const { isSignedIn } = useUser();

  const handlePlanSelect = async (plan) => {
    if (!isSignedIn) {
      window.location.href = '/sign-in'; // Redirect to sign-in if not signed in
      return;
    }

    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: window.location.origin,
      },
      body: JSON.stringify({ plan }),
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Pricing - Flashcard SaaS</title>
        <meta name="description" content="Choose a plan that fits your needs" />
      </Head>

      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
          Choose Your Plan
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.700',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                $5 / month
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                Access basic flashcard features with limited storage.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handlePlanSelect('basic')}>
                Choose Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.700',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                $10 / month
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                Unlimited flashcards and storage with priority support.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handlePlanSelect('pro')}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Pricing;
