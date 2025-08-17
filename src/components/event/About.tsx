import React from "react";
import { event } from "../../content/event";
import { Paragraph } from "../text/Paragraph";
import { Typography, Box } from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import { History } from "@mui/icons-material";
import { CardGiftcard } from "@mui/icons-material";
import { SupportAgent } from "@mui/icons-material";
import { Star } from "@mui/icons-material";

const About: React.FC = () => {
    return (
        <Box>
            <Box className="flex flex-wrap items-center justify-around gap-6 mb-10">
                <Box
                    component="img"
                    src={event.logo} 
                    alt={`${event.name} logo`} 
                    className='w-60 h-auto object-contain rounded-full'
                />

                <Box>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                        A propos de {event.name}
                    </Typography>
                    <Paragraph>{event.description.secondary}</Paragraph>
                </Box>
            </Box>
            
            <Box className="flex flex-wrap justify-center gap-6">
                {event.badges.map((badge, index) => {
                    let IconComponent;
                    switch (badge.icon) {
                        case "trophy":
                            IconComponent = EmojiEvents;
                            break;
                        case "history":
                            IconComponent = History;
                            break;
                        case "gift":
                            IconComponent = CardGiftcard;
                            break;
                        case "support":
                            IconComponent = SupportAgent;
                            break;
                        default:
                            IconComponent = Star;
                    }
                    return (
                        <Box 
                            key={index}
                            className="shadow-md rounded-lg flex flex-col items-center justify-center"
                            sx={{ 
                                width: 220,
                                height: 160,
                                p: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 3
                                }
                            }}
                        >
                            <IconComponent sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6" align="center">
                                {badge.title}
                            </Typography>
                            <Typography variant="body2" align="center">
                                {badge.subtitle}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default About;
