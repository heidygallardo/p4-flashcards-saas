'use client';
import { useUser } from '@clerk/nextjs';
import { Container, Button, AppBar, Box, Grid, Typography, Toolbar } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/pricing'); // Navigate to the new pricing page
    } else {
      router.push('/sign-up'); // Redirect to sign-up page
    }
  };

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text using AI" />
      </Head>

      {/* Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: 'background.paper', mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>

          <SignedOut>
            <Button color="secondary" href="/sign-in">Login</Button>
          </SignedOut>

          <SignedIn>
         
            <Button color="inherit" onClick={() => router.push('/flashcards')}>My Flashcards</Button>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', my: 6 }}>
        <Typography variant="h2" gutterBottom sx={{ color: 'primary.main' }}>
          Create Flashcards Effortlessly
        </Typography>
        <Typography variant="h5" sx={{ color: 'text.secondary', mb: 4 }}>
          Use AI to generate personalized flashcards from your own content.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleGetStarted}>
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', textAlign: 'center' }}>
          Why Choose Flashcard SaaS?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              AI-Powered Flashcards
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Our AI breaks down complex content into easy-to-digest flashcards.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Accessible Anywhere
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Study on any device, anywhere, anytime.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Simple and Intuitive
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              No learning curve. Just enter your text and let the AI do the rest.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 10, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="body2">© 2024 Flashcard SaaS. All rights reserved.</Typography>
        <Box sx={{ mt: 2 }}>
          <Button color="secondary" href="/terms">
            Terms of Service
          </Button>
          <Button color="secondary" href="/privacy" sx={{ ml: 2 }}>
            Privacy Policy
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
