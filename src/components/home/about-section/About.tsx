"use client"

import React from "react";
import { Container } from "@mui/material";
import Badges from "@/components/home/about-section/Badges";
import Sponsors from "@/components/home/about-section/Sponsors";
import { APropos } from "@/components/home/about-section/APropos";

const About: React.FC = () => {
    return (
        <Container 
            sx={{ 
                gap: 6,
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-around',
                minHeight: '100vh'
            }}
        >
            <APropos />
            <Badges />
            <Sponsors />
        </Container>
    );
};

export default About;