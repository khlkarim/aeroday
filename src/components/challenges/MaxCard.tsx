import React from 'react';
import Image from 'next/image';
import { SceneContainer } from '../scenes/SceneContainer';
import { GetScene } from '../scenes/GetScene';
import type { Challenge } from '@/content/challenges';
import { Card, CardContent, Typography, Button, Box, Divider, Chip, Stack } from '@mui/material';

interface MaxCardProps {
    item: Challenge;
}

const MaxCard: React.FC<MaxCardProps> = ({ item }) => {
    const Canvas = GetScene(item.name);
    
    return (
        <Card>
            <Box sx={{ 
                aspectRatio: '16/7', 
                position: 'relative', 
            }}>
                <SceneContainer
                    image={
                        item.video? 
                            <video 
                                loop 
                                muted 
                                autoPlay 
                                playsInline 
                                src={item.video} 
                                style={{ width: '115%', height: '115%', objectFit: 'cover' }}
                            />
                            :
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
                <Button
                    target="_blank"
                    variant="outlined"
                    href={item.cahierDesCharges}
                    rel="noopener noreferrer"
                >
                    Cahier des charges
                </Button>
            </Stack>
        </Card>
    );
};

export default MaxCard;

function formatDate(date: Challenge['date']): string
{
    return `${String(date.day).padStart(2, '0')}/${String(date.month).padStart(2, '0')}`;
}