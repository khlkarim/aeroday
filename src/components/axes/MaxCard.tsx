"use client"

import React from 'react';
import Image from 'next/image';
import type { Axe } from '@/content/axes';
import { GetScene } from '../scenes/GetScene';
import { SceneContainer } from '../scenes/SceneContainer';
import { Card, CardContent, Typography, Button, Box, Divider, Chip, Stack } from '@mui/material';

interface MaxCardProps {
    item: Axe;
}

const MaxCard: React.FC<MaxCardProps> = ({ item }) => {
    const isNovices = item.id == 2;
    const linkCdcNovices = "https://drive.google.com/file/d/1bu5buw_OQ6dMldk6sR8NLHPedL0fn4AJ/view";
    const Canvas = GetScene(item.name);

    return (
        <Card>
            <Box sx={{ 
                aspectRatio: '16/7', 
                position: 'relative', 
            }}>
                <SceneContainer 
                    image={
                        <Image
                            fill
                            priority
                            alt={item.name}
                            src={item.image}
                            style={{ objectFit: 'cover' }}
                        />
                    }
                    canvas={    
                        Canvas && <Canvas />
                    }
                />
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
                        {item.date && <Chip
                            color="primary"
                            label={formatDate(item.date)}
                        />}
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
                    onClick={(e) => {
                        if (item.formulaire === '#') {
                            e.preventDefault();
                            e.stopPropagation();
                            alert("Le formulaire n'est pas encore disponible.");
                        }
                    }}
                >
                    Remplir le formulaire
                </Button>
                {isNovices && <Button
                    target="_blank"
                    variant="outlined"
                    href={linkCdcNovices}
                    rel="noopener noreferrer"
                >
                    Cahier des charges
                </Button>}
            </Stack>
        </Card>
    );
};

export default MaxCard;

function formatDate(date: Axe['date']): string
{
    if(!date) return "";
    return `${String(date.day).padStart(2, '0')}/${String(date.month).padStart(2, '0')}`;
}