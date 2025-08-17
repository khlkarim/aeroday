"use client"

import React from "react";
import { Box, Typography, Button, Card, CardActionArea, CardContent, CardActions } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import type { TeamMember } from "../../content/team";

interface ProfileCardProps {
    item: TeamMember;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ item }) => {
    return (
        <Card
            className="w-full max-w-xs rounded-4xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <CardActionArea>
                <Box
                    className="w-full overflow-hidden"
                    sx={{
                        aspectRatio: '4/3',
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

                <CardContent className="p-4 space-y-4">
                    <Box className="text-center">
                        <Typography variant="h5">{item.name}</Typography>
                        <Typography variant="body1" color="text.secondary">
                            {item.role}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <CardActions className="flex flex-col gap-2 justify-center">
                <Button
                    variant="outlined"
                    startIcon={<PhoneIcon />}
                    className="w-full"
                >
                    {item.contact.phone}
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    className="w-full"
                >
                    {item.contact.email}
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProfileCard;
