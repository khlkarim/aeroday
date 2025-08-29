"use client"

import { Star } from "@mui/icons-material";
import { History } from "@mui/icons-material";
import { EmojiEvents } from "@mui/icons-material";
import { CardGiftcard } from "@mui/icons-material";
import { SupportAgent } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export function Icon(label: string) {
    switch (label) {
        case "trophy":
            return <EmojiEvents />
        case "history":
            return <History />
        case "gift":
            return <CardGiftcard />
        case "support":
            return <SupportAgent />
        case "location":
            return <LocationOnIcon />
        case "email": 
            return <EmailIcon />
        case "phone":
            return <PhoneIcon />
        default:
            return <Star />
    }
}