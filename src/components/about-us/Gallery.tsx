"use client"

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { event } from "@/content/event";
import { Box, Typography, useTheme } from "@mui/material";

interface GalleryProps {
    index: number;
}

export const Gallery: React.FC<GalleryProps> = ({ index }) => {
    const theme = useTheme();

    const imagesRef = useRef<HTMLDivElement>(null);
    const gallery = event.editionsPrecedentes.galleries[index];

    useGSAP(() => {
        if (!imagesRef.current) return;

        const images = Array.from(imagesRef.current.children);
        images.forEach((image) => {
            image.addEventListener("mouseenter", () => {
                gsap.to(image, { scale: 1.02, duration: 0.3, ease: "power2.out" });
            });
            image.addEventListener("mouseleave", () => {
                gsap.to(image, { scale: 1, duration: 0.3, ease: "power2.out" });
            });
        });

        return () => {
            images.forEach((image) => {
                image.removeEventListener("mouseenter", () => {});
                image.removeEventListener("mouseleave", () => {});
            });
        };
    }, { scope: imagesRef });

    return (
        <Box>
            <Typography variant="h3" gutterBottom>
                {(() => {
                    const [firstWord, ...rest] = gallery.label.split(" ");
                    return (
                        <>
                            <span style={{ color: theme.palette.primary.main }}>{firstWord}</span>{" "}
                            {rest.join(" ")}
                        </>
                    );
                })()}
            </Typography>

            <Box ref={imagesRef} sx={{ columns: { xs: '150px', sm: '200px', md: '300px', } }}>
                {gallery.images.map((image, idx) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={idx}
                        src={image}
                        alt={`Gallery image ${idx}`}
                        style={{ marginBottom: '1em', objectFit: "cover" }}
                    />
                ))}
            </Box>
        </Box>
    );
};
