import React from 'react';
import Image from 'next/image';
import type { Challenge } from '../../content/challenges';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';

interface MinCardProps {
    item: Challenge;
}

const MinCard: React.FC<MinCardProps> = ({ item }) => {
    return (
        <Card
            className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <CardActionArea href={item.href}>   
                <Box
                    sx={{
                        aspectRatio: '16/9',
                        position: 'relative',
                        backgroundColor: 'action.hover'
                    }}
                >
                    <Image
                        fill
                        alt={item.name}
                        src={item.image}
                        style={{ objectFit: 'cover' }}
                    />
                </Box>

                <CardContent className="p-4 space-y-2">
                    <Typography
                        variant="h6"
                        component="h2"
                        fontWeight={600}
                        className="truncate"
                    >
                        {item.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className="line-clamp-3"
                    >
                        {item.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MinCard;
