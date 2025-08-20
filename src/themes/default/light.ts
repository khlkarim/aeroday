import { components } from '@/themes/default/components/default';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { tokens as lightPalette } from '@/themes/default/palettes/light';
import { tokens as typography } from '@/themes/default/typographies/default';

export let lightTheme = createTheme({
    palette: lightPalette,
    typography,
    components
});

lightTheme = responsiveFontSizes(lightTheme);
