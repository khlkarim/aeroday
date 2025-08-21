"use client"

import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Box
} from '@mui/material';
import type { Axe } from '../../content/axes';

interface MinCardProps {
    item: Axe;
}

const MinCard: React.FC<MinCardProps> = ({ item }) => {
    return (
        <Card
            className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <CardActionArea href={item.href}>
                <Box
                    className="w-full overflow-hidden"
                    sx={{
                        aspectRatio: '16/9',
                        backgroundColor: 'action.hover',
                    }}
                >
                    <Box
                        component={"img"}
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
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
