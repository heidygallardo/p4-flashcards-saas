'use client';

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const router = useRouter();

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <AppBar position="fixed" sx={{ bgcolor: '#67595e', width: '100%', top: 0, left: 0 }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{ color: '#e8b4b8', flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => router.push('/')}
                    >
                        CardGPT
                    </Typography>
                    <Button sx={{ color: 'white' }} onClick={() => router.push('/generate')}>
                        Generate Flashcards
                    </Button>
                    <Button sx={{ color: 'white' }} onClick={() => router.push('/flashcards')}>
                        My Flashcards
                    </Button>
                    <SignedOut>
                        <Button sx={{ color: 'white' }} onClick={() => router.push('/sign-in')}>Login</Button>
                        <Button sx={{ color: 'white' }} onClick={() => router.push('/sign-up')}>Sign Up</Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
