"use client"

import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    Button,
    Box,
    Divider,
    Chip,
} from '@mui/material';
import type { Axe } from '../../content/axes';

interface MaxCardProps {
    item: Axe;
}

const MaxCard: React.FC<MaxCardProps> = ({ item }) => {
    return (
        <Card
            className="w-full max-w-3xl rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                className="h-64 object-cover"
            />

            <CardContent className='flex flex-col gap-4'>
                <Box className="flex flex-row items-center" sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight={600} className="truncate">
                        {item.name}
                    </Typography>
                    <Chip
                        color="primary"
                        label={`${String(item.date.day).padStart(2, '0')}/${String(item.date.month).padStart(2, '0')}`}
                        className="ml-4"
                    />
                </Box>

                <Divider />

                <Typography variant="body1" color="text.secondary">
                    {item.description}
                </Typography>
            </CardContent>

            <CardActions className="flex justify-end">
                <Button
                    variant="contained"
                    size="small"
                    href={item.formulaire}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Remplir le formulaire
                </Button>
            </CardActions>
        </Card>
    );
};

export default MaxCard;
