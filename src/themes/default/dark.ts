import { components } from '@/themes/default/components/default';
import { tokens as darkPalette } from '@/themes/default/palettes/dark';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { tokens as typography } from '@/themes/default/typographies/default';

export let darkTheme = createTheme({
    palette: darkPalette,
    typography,
    components
});

darkTheme = responsiveFontSizes(darkTheme);