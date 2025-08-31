import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Link, Menu, MenuItem, Typography } from "@mui/material";

interface NavDropdownProps {
    label: string;
    items: { name: string; href: string }[];
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, items }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => setAnchorEl(null);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    return (
        <>
            <Button
                onClick={handleOpen}
                endIcon={
                    <ExpandMoreIcon
                        sx={{
                            transition: "transform 0.3s ease",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                    />
                }
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
                        background: "#FAF7F0",
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
                        <Typography color="primary">{item.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default NavDropdown;