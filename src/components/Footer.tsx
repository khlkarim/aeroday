"use client"

import React from 'react';
import Link from 'next/link';
import TikTokIcon from '@mui/icons-material/MusicNote';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box, Container, Typography, Stack, IconButton, useTheme } from '@mui/material';

const Footer: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                borderTop: `1px solid ${theme.palette.divider}`,
                zIndex: 400,
                position: 'relative',
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                    direction={{ xs: 'column', sm: 'row' }}
                >
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} Aerobotix INSAT
                    </Typography>

                    <Stack direction="row" spacing={1}>
                            <IconButton
                                component="a"
                                href="https://www.facebook.com/TunAeroday"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                href="https://www.instagram.com/tunisian_aeroday"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                            >
                                <InstagramIcon />
                            </IconButton>
                            <IconButton
                                component="a"
                                href="https://www.tiktok.com/@tunisian.aeroday"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                            >
                                <TikTokIcon />
                            </IconButton>
                        </Stack>

                    <Stack direction="row" spacing={3} alignItems="center">
                        <Stack direction="row" spacing={3}>
                            <Link href={"/about-us"}>About</Link>
                            <Link href={"/contact-us"}>Contact</Link>
                            <Link href={"https://privacy.aeroday.tn/"}>Privacy Policy</Link>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
