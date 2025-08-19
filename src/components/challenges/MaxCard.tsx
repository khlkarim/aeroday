import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Chip,
    Divider,
} from '@mui/material';
import type { Challenge } from '../../content/challenges';

interface MaxCardProps {
    item: Challenge;
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

            <CardContent className="flex flex-col gap-4">
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

            <Box className="flex flex-col sm:flex-row sm:justify-end gap-2 p-2">
                <Button
                    variant="outlined"
                    size="small"
                    href={item.cahierDesCharges}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                >
                    Cahier des charges
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    href={item.formulaire}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                >
                    Remplir le formulaire
                </Button>
            </Box>
        </Card>
    );
};

export default MaxCard;