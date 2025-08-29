"use client";

import React from 'react';
import { event } from '@/content/event';
import { Box, Stack } from '@mui/material';
import Title from '@/components/text/Title';
import { Paragraph } from '@/components/text/Paragraph';

export default function Teaser() {
    return (
        <Stack gap={6} alignItems={'center'}>
            <Box sx={{
                gap: 4,
                width: "100%",
                display: 'flex', 
                alignItems: 'center',
                flexDirection: 'column', 
            }}>
                <Title label="Teaser" />
                <Paragraph>
                    {event.teaser.description}
                </Paragraph>
            </Box>
            <Box width={'80%'}>
                <iframe
                    style={{
                        width: '100%',
                        borderRadius: 12,
                        aspectRatio: '16/9',
                    }}
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/1027667756?h=8cdfcae031"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                />
            </Box>
        </Stack>
    );
}