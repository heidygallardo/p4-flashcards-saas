// components/NavBar.js
'use client';

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const router = useRouter();

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => router.push('/')}>
                    Flashcard SaaS
                </Typography>
                <Button color="inherit" onClick={() => router.push('/generate')}>
                    Generate Flashcards
                </Button>
                <Button color="inherit" onClick={() => router.push('/flashcards')}>
                    My Flashcards
                </Button>
                <SignedOut>
                    <Button color="inherit" onClick={() => router.push('/sign-in')}>Login</Button>
                    <Button color="inherit" onClick={() => router.push('/sign-up')}>Sign Up</Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </Toolbar>
        </AppBar>
    );
}
