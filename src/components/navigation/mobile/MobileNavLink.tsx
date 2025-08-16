import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { axes } from "../../../content/axes";
import { challenges } from "../../../content/challenges";
import { links } from "../../../content/navlinks";
import Link from 'next/link';

interface MobileNavLinkProps {
    index: number;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ index }) => {
    const link = links[index];
    const dropdownItems = link.label === "Axes" ? axes : challenges;
    const isDropdown = link.label === "Axes" || link.label === "Challenges";

    if (isDropdown) {
        return (
            <ListItem>
                <Accordion sx={{ width: "100%", background: "none" }} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <ListItemText primary={link.label} />
                    </AccordionSummary>
                    <AccordionDetails>
                        {dropdownItems.map((item) => (
                            <ListItemButton
                                key={item.href}
                                component={Link}
                                href={item.href}
                            >
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        ))}
                    </AccordionDetails>
                </Accordion>
            </ListItem>
        );
    }

    return (
        <ListItem>
            <ListItemButton component={Link} href={link.href}>
                <ListItemText primary={link.label} />
            </ListItemButton>
        </ListItem>
    );
};

export default MobileNavLink;
