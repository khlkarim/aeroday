import React from "react";
import Link from 'next/link';
import { links } from "@/constants/navlinks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, AccordionDetails, ListItem, ListItemButton, ListItemText } from "@mui/material";

interface NavLinkProps {
    index: number;
    toggleDrawer: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ index, toggleDrawer }) => {
    const link = links[index];

    if (link.type === 'dropdown' && link.items) {
        return (
            <ListItem>
                <Accordion sx={{ width: "100%", background: "none" }} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <ListItemText sx={theme => ({color: theme.palette.primary.main})} primary={link.label} />
                    </AccordionSummary>
                    <AccordionDetails>
                        {link.items.map((item) => (
                            <ListItemButton
                                key={item.href}
                                component={Link}
                                href={item.href}
                                onClick={toggleDrawer}
                                sx={theme => ({color: theme.palette.primary.main})}
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
            <ListItemButton
                component={Link}
                href={link.href}
                onClick={toggleDrawer}
                sx={theme => ({color: theme.palette.primary.main})}
            >
                <ListItemText  primary={link.label} />
            </ListItemButton>
        </ListItem>
    );
};

export default NavLink;
