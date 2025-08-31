"use client"

import React from "react";
import { Stack } from "@mui/material";
import Badges from "@/components/home/about-section/Badges";
import Sponsors from "@/components/home/about-section/Sponsors";
import { APropos } from "@/components/home/about-section/APropos";

const About: React.FC = () => {
    return (
        <Stack
            gap={4}
            zIndex={1}
            minHeight="100vh"
            position="relative"
            justifyContent="space-around"
        >   
            <APropos />
            <Badges />
            <Sponsors />
        </Stack>
    );
};

export default About;