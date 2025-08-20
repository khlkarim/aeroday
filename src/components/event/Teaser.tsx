"use client";

import React from 'react';
import { event } from '@/content/event';
import { Card, CardContent, CardMedia, Typography, Divider, Box } from '@mui/material';

export default function Teaser() {
    return (
        <Box sx={{ pt: 10, pb: 10 }}>
            <Card sx={{ maxWidth: 900, margin: "auto", borderRadius: 3, boxShadow: 3}}>
                {event.teaser.video && (
                    <CardMedia
                        component="div"
                        sx={{ position: "relative", paddingTop: "56.25%", maxHeight: 400, borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: "hidden" }}
                    >
                        <iframe
                            src={event.teaser.video}
                            title="Event Teaser Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                border: 0,
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                            }}
                        />
                    </CardMedia>
                )}
                <CardContent>
                    <Typography variant="h6">
                        {event.teaser.description.primary}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                        {event.teaser.description.secondary}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}