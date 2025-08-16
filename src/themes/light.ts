import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { tokens as lightPalette } from './palettes/light';
import { tokens as typography } from './typographies/default';
import { components } from './components/default';

export let lightTheme = createTheme({
    palette: lightPalette,
    typography,
    components
});

lightTheme = responsiveFontSizes(lightTheme);
