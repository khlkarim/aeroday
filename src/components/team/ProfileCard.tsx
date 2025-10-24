"use client"

import React from "react";
import Image from "next/image";
import type { TeamMember } from "@/content/team";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Box, Typography, Button, Card, CardActionArea, CardContent } from "@mui/material";

interface ProfileCardProps {
    item: TeamMember;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ item }) => {
    return (
        <Card
            className="w-xs rounded-4xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <CardActionArea>
                <Box
                    sx={{
                        height: 220,
                        width: '100%',
                        aspectRatio: '4/3',
                        position: 'relative',
                        backgroundColor: 'action.hover',
                    }}
                >
                    <Image
                        fill
                        alt={item.name}
                        src={item.image}
                        style={{ objectFit: 'cover' }}
                    />
                </Box>

                <CardContent className="p-4 space-y-4">
                    <Box className="text-center">
                        <Typography variant="h5">{item.name}</Typography>
                        <Typography variant="body1" color="text.secondary">
                            {item.role}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <Box className="flex flex-col gap-2 p-2 justify-center">
                <Button
                    variant="outlined"
                    startIcon={<PhoneIcon />}
                    component="a"
                    href={`tel:${item.contact.phone}`}
                >
                    {item.contact.phone}
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    component="a"
                    href={`mailto:${item.contact.aerodayEmail}`}
                >
                    {item.contact.aerodayEmail}
                </Button>
            </Box>
        </Card>
    );
};

export default ProfileCard;
