import React from "react";
import Image from "next/image";
import { event } from "../../content/event";
import { Paragraph } from "../text/Paragraph";
import { Typography, Box } from "@mui/material";
import eventLogo from "../../../public/assets/images/logos/event.png";

const About: React.FC = () => {
    return (
        <Box>
            <Box className="flex flex-wrap items-center justify-around gap-6 mb-10">
            <Box>
                <Image 
                    src={eventLogo} 
                    alt={`${event.name} logo`} 
                    width={240}
                    height={240}
                    className='w-60 h-auto object-contain rounded-full'
                    priority
                />
            </Box>
            <Box>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    A propos de {event.name}
                </Typography>
                <Paragraph>{event.description.secondary}</Paragraph>
            </Box>
            </Box>
            <Box>
                <Box className="flex flex-wrap justify-center gap-6">
                {event.badges.map((badge, index) => (
                    <Box 
                    key={index}
                    className="shadow-md rounded-lg p-4 flex flex-col items-center"
                    sx={{ 
                        maxWidth: '220px',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3
                        }
                    }}
                    >
                    <Typography variant="h6">
                        {badge.title}
                    </Typography>
                    <Typography variant="body2" className="text-center">
                        {badge.subtitle}
                    </Typography>
                    </Box>
                ))}
                </Box>
            </Box>
        </Box>
    );
};

export default About;
