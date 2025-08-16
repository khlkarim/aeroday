import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { tokens as darkPalette } from './palettes/dark';
import { tokens as typography } from './typographies/default';
import { components } from './components/default';

export let darkTheme = createTheme({
    palette: darkPalette,
    typography,
    components
});

darkTheme = responsiveFontSizes(darkTheme);