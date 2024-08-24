"use client";
import React from 'react'; // Import React
import { useUser } from '@clerk/nextjs';
import { Container, Box, Grid, Typography, Button, AppBar, Toolbar } from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import getStripe from '@/utils/get-stripe';

const Pricing = () => {
  const { isSignedIn } = useUser(); // Ensure this is called within a client component

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
    <>
      <Head>
        <title>Pricing - CardGPT</title>
        <meta name="description" content="Choose a plan that fits your needs" />
      </Head>

      {/* Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: 'background.paper', mb: 4, width: '100%' }}>
        <Toolbar sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              component="a" // This makes the Typography act as a link
              sx={{
                textDecoration: 'none', // Remove the default underline of links
                color: '#e8b4b8', // Text color
                flexGrow: 1, // Make it expand to use the available space
                cursor: 'pointer', // Change cursor to pointer to indicate it's clickable
              }}
            >
              CardGPT
            </Typography>
          </Link>
          <Link href="/sign-in" passHref>
            <Button sx={{ color: 'white' }}>Sign In</Button>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#924759ff', mb: 8 }}>
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
    </>
  );
};

export default Pricing;
