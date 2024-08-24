import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
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
                cursor: 'pointer',
                }
              }
            >
              CardGPT
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4, width: '100%' }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Sign In
        </Typography>
        {/* Use the redirectUrl prop to redirect to /generate after successful login */}
        <SignIn redirectUrl="/generate" />
      </Box>
    </>
  );
}

