"use client"

import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { links } from "../../../constants/navlinks";
import { axes } from "../../../content/axes";
import { challenges } from "../../../content/challenges";
import Link from 'next/link';

interface NavLinkProps {
    index: number;
}

interface NavDropdownProps {
    label: string;
    items: { name: string; href: string }[];
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, items }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Button
                onClick={handleOpen}
                endIcon={
                    <ExpandMoreIcon
                        sx={{
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                        }}
                    />
                }
                sx={{ whiteSpace: "nowrap" }}
            >
                {label}
            </Button>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{
                    "& .MuiPaper-root": {
                        background: "transparent",
                        backdropFilter: "blur(8px)",
                    },
                }}
            >
                {items.map((item) => (
                    <MenuItem
                        key={item.name}
                        component={Link}
                        href={item.href}
                        onClick={handleClose}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

const NavLink: React.FC<NavLinkProps> = ({ index }) => {
    const link = links[index];

    if (link.label === "Axes") {
        return <NavDropdown label={link.label} items={axes} />;
    }

    if (link.label === "Challenges") {
        return <NavDropdown label={link.label} items={challenges} />;
    }

    return (
        <Button 
            href={link.href}
            component={Link}
            sx={{ whiteSpace: "nowrap" }}
        >
            {link.label}
        </Button>
    );
};

export default NavLink;
