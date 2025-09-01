"use client"

import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

export interface StringProps {
    variant?: 'default' | 'inverted';
}

const String: React.FC<StringProps> = ({ variant  = 'default' }) => {
    const pathname = usePathname();
    
    if(!pathname.startsWith('/axes') && !pathname.startsWith('/challenges'))
    {
        return <></>;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                width: { xs: 140, sm: 160, md: 200 },
                height: { xs: 140, sm: 160, md: 200 },
                right: 0,
                backgroundImage: variant === 'default'
                    ? "url('/assets/images/deco/string.png')"
                    : "url('/assets/images/deco/inverted-string.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                zIndex: (theme) => theme.zIndex.appBar + 1,
                pointerEvents: 'none',
            }}
        />
    );
}
export default String;