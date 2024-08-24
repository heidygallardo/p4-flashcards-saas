
"use client"; // This directive tells Next.js that this is a client component

import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { useTheme } from '@mui/material/styles';

export default function SignUpPage() {
  const theme = useTheme(); // Get the theme object

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: 'background.paper', mb: 4, width: '100%' }}>
        <Toolbar>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                color: '#e8b4b8',
              }}
            >
              CardGPT
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 4, width: '100%' }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.background.paper }}>
            Sign Up
          </Typography>
          <SignUp />
        </Box>
      </Container>
    </>
  );
}