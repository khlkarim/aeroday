"use client"

import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import type { Axe } from '@/content/axes';
import { Card, CardContent, Typography, Button, Box, Divider, Chip, Stack } from '@mui/material';
import ExpAerospatiales from '../scenes/axes/ExpAerospatiales';
import VidParDrone from '../scenes/challenges/VidParDrone';

interface MaxCardProps {
    item: Axe;
}

const MaxCard: React.FC<MaxCardProps> = ({ item }) => {
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        animate({ imageRef });
    });

    return (
        <Card>
            <Box sx={{ 
                aspectRatio: '16/7', 
                position: 'relative', 
            }}>
                <VidParDrone />
            </Box>

            <CardContent>
                <Stack gap={2}>
                    <Stack 
                        flexDirection={'row'} 
                        justifyContent={'space-between'}
                    >
                        <Typography variant="h5">
                            {item.name}
                        </Typography>
                        <Chip
                            color="primary"
                            label={formatDate(item.date)}
                        />
                    </Stack>

                    <Divider />

                    <Typography 
                        variant="body1" 
                        color="text.secondary"
                    >
                        {item.description}
                    </Typography>
                </Stack>
            </CardContent>

            <Stack 
                p={2} 
                gap={2}
                justifyContent={'end'} 
                flexDirection={{ xs: 'column', sm: 'row' }} 
            >
                <Button
                    target="_blank"
                    variant="contained"
                    href={item.formulaire}
                    rel="noopener noreferrer"
                >
                    Remplir le formulaire
                </Button>
            </Stack>
        </Card>
    );
};

export default MaxCard;

function formatDate(date: Axe['date']): string
{
    return `${String(date.day).padStart(2, '0')}/${String(date.month).padStart(2, '0')}`;
}

function animate({ imageRef }: { imageRef: React.RefObject<HTMLImageElement | null> })
{
    if(!imageRef.current) return; 
}