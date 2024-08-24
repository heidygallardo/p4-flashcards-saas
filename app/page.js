'use client';
import { useUser } from '@clerk/nextjs';
import { Container, Button, AppBar, Box, Typography, Toolbar } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from 'next/navigation';
import FeaturesSlideshow from './FeaturesSlideshow'; // Ensure this path is correct

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
    <>
      <Head>
        <title>CardGPT</title>
        <meta name="description" content="Create flashcards from your text using AI" />
      </Head>

      {/* Navigation Bar */}
      <Box sx={{ width: '100vw' }}>
        <AppBar position="static" sx={{ bgcolor: 'background.paper', mb: 4, width: '100%' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ color: '#e8b4b8',flexGrow: 1 }}>
            CardGPT
            </Typography>

            <SignedOut>
              <Button csx={{ color: 'white' }} href="/sign-in">Login</Button>
            </SignedOut>

            <SignedIn>
              <Button sx={{ color: 'white' }}   onClick={() => router.push('/flashcards')}>My Flashcards</Button>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{textAlign: 'center', my: 10 }}>
          <Typography variant="h2" gutterBottom sx={{ color: '#924759ff'}}>
          Instant Flashcards, Zero Hassle
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.primary', mb: 1 }}>
          AI-Driven Flashcards Tailored Just for You
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 5 }} onClick={handleGetStarted}>
            Get Started
          </Button>
        </Box>

        {/* Feature Section */}
        <FeaturesSlideshow />

        {/* Footer */}
        <Box sx={{ mt: 10, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body2">© 2024 CardGPT. All rights reserved.</Typography>
          <Box sx={{ mt: 2 }}>
            <Button color="secondary" href="/terms">
              Terms of Service
            </Button>
            <Button color="secondary" href="/privacy" sx={{ ml: 1 }}>
              Privacy Policy
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
