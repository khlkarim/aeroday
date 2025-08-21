"use client";

import React from 'react';
import Title from '../text/Title';
import { event } from '@/content/event';
import { Typography, Divider, Box, Container } from '@mui/material';

export default function Teaser() {
    return (
        <Container 
            sx={{ 
                gap: 6,
                display: 'flex', 
                alignItems: 'center',
                flexDirection: 'column', 
                minHeight: '100vh'
            }}
        >
            <Title label="Teaser" />

            <Box 
                sx={{ 
                    gap: 6, 
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: "space-around", 
                }}>
                <Box>
                    <iframe
                        src={event.teaser.video}
                        title="Event Teaser Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            border: 0,
                            borderRadius: 12,
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="h6">
                        {event.teaser.description.primary}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                        {event.teaser.description.secondary}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}