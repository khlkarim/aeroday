"use client"

import React from "react";
import Link from 'next/link';
import { Button } from "@mui/material";
import NavDropdown from "./NavDropdown";
import { links } from "../../../constants/navlinks";

interface NavLinkProps {
    index: number;
}

const NavLink: React.FC<NavLinkProps> = ({ index }) => {
    const link = links[index];

    if (link.type === "dropdown" && link.items) {
        return <NavDropdown label={link.label} items={link.items} />;
    }

    return (
        <Button 
            component={Link}
            href={link.href}
        >
            {link.label}
        </Button>
    );
};

export default NavLink;
