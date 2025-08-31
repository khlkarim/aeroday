import { Box } from "@mui/material";

export interface StringProps {
    variant?: 'default' | 'inverted';
}

const String: React.FC<StringProps> = ({ variant  = 'default' }) => {
    return (
        <Box
            sx={{
                width: 240,
                height: 240,
                backgroundImage: variant === 'default'? 
                                    "url('/assets/images/deco/string.png')" 
                                    : "url('/assets/images/deco/inverted-string.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%', 
            }}
        />
    );
}
export default String;