"use client"

import React from "react";
import Badges from "./Badges";
import { APropos } from "./APropos";
import { Container } from "@mui/material";
import Sponsors from "./Sponsors";

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