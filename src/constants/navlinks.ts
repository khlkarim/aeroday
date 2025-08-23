import { axes } from "@/content/axes";
import { challenges } from "@/content/challenges";

export const links = [
    { label: "Home", type: 'link', href: "/" },
    { label: "About Us", type: 'link', href: "/about-us" },
    { label: "Schedule", type: 'link', href: "/schedule" },
    { label: "Axes", type: 'dropdown', items: axes, href: "/axes" },
    { label: "Challenges", type: 'dropdown', items: challenges, href: "/challenges" },
    { label: "Contact Us", type: 'list', href: "/contact-us" },
];