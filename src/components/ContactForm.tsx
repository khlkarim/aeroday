"use client"

import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Paper,
    Container,
    Stack,
} from "@mui/material";
import Badge from "./Badge";


export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        formData.append("access_key", "64b5354c-becd-4534-a058-40e70a2f8e90");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            form.reset();
        } else {
            console.log("Error", data);
        }
    };

    return (
        <Container 
            sx={{ 
                gap: 6,
                display: 'flex', 
                alignItems: 'center',
                flexDirection: 'column', 
                
            }}
        >
            <Paper
                elevation={3}
                sx={{ p: 4, mx: "auto", borderRadius: 3 }}
            >
                <Typography variant="h5" mb={2} fontWeight="bold">
                    Contact Us
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="name"
                                label="Your Name"
                                fullWidth
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                name="phone"
                                label="Phone Number"
                                type="tel"
                                fullWidth
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                name="message"
                                label="Message"
                                fullWidth
                                multiline
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ borderRadius: 2 }}
                                fullWidth
                            >
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
