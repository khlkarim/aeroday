"use client"

import React from 'react';
import { Box, Container, Typography, Stack, useTheme } from '@mui/material';
import Link from 'next/link';


const Footer: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                borderTop: `1px solid ${theme.palette.divider}`,
                zIndex: 400
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

                    <Stack direction="row" spacing={3}>
                        <Link href={"/about-us"}>
                            About
                        </Link>
                        <Link href={"/contact-us"}>
                            Contact
                        </Link>
                        <Link href={"https://privacy.aeroday.tn/"}>
                            Privacy Policy
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;