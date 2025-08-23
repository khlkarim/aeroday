import { createTheme, responsiveFontSizes } from '@mui/material';
import { amber, common, green, grey, lightBlue, red } from '@mui/material/colors';

const starWarsRed = "#E53935";
const starWarsBlue = "#2b4f98";

const background = common['black'];
const bodyBackground = {
    light: 'linear-gradient(90deg, white 0%, #d9e7ff 100%)',
    dark: 'linear-gradient(to right, #020111 10%,#151426 100%)'
};

export const shadTheme = (mode: 'light' | 'dark') => {
    const isDarkMode = mode === 'dark';

    return responsiveFontSizes(createTheme({
        palette: {
            mode,
            primary: {
                dark: isDarkMode ? grey['200'] : common['black'],
                main: isDarkMode ? common['white'] : grey['900'],
                light: isDarkMode ? grey['800'] : grey['100'],
            },
            secondary: {
                main: isDarkMode ? starWarsRed : starWarsBlue,
            },
            success: {
                main: green['900'],
            },
            error: {
                main: red['900'],
            },
            info: {
                main: lightBlue['900'],
            },
            warning: {
                main: amber['900'],
            },
            divider: isDarkMode ? grey[800] : grey[300],
            background: {
                default: isDarkMode ? background : grey[50],
                paper: isDarkMode ? background : grey[50],
            },
        },
        shape: {
            borderRadius: 4,
        },
        spacing: 8,
        typography: {
            fontSize: 14,
            htmlFontSize: 18,
            fontFamily: [
                'Geist Sans',
                'Noto Sans',
                '"Source Sans Pro"',
                '-apple-system',
                'BlinkMacSystemFont',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            fontWeightMedium: 600,
            fontWeightBold: 700,
            h1: {
                fontSize: '3.75rem',
                fontWeight: 600,
            },
            h2: {
                fontSize: '3rem',
                fontWeight: 600,
            },
            h3: {
                fontSize: '2.125rem',
                fontWeight: 600,
            },
            h4: {
                fontSize: '1.5rem',
                fontWeight: 600,
            },
            h5: {
                fontSize: '1.25rem',
                fontWeight: 600,
            },
            h6: {
                fontSize: '1rem',
                fontWeight: 600,
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    ':root': {
                        colorScheme: isDarkMode ? 'dark' : 'light',
                    },
                    html: {
                        minHeight: '100%',
                    },
                    body: {
                        minHeight: '100%',
                        background: isDarkMode ? bodyBackground.dark : bodyBackground.light,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top right',
                        backgroundSize: '100%',
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDarkMode ? common['black'] : common['white'],
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontWeight: 500,
                        boxShadow: 'none',
                        fontSize: '0.95rem', 
                        textTransform: 'none',
                    },
                    sizeSmall: {
                        padding: '2px 12px',
                    },
                    sizeMedium: {
                        padding: '6px 18px',
                    },
                    sizeLarge: {
                        padding: '10px 24px',
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        boxShadow: 'none',
                        border: 0,
                        borderBottom: `1px solid ${isDarkMode ? grey[800] : grey[300]}`,
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: isDarkMode ? background : common['white'],
                        border: `1px solid ${isDarkMode ? grey[800] : grey[300]}`,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        border: `1px solid ${isDarkMode ? grey[800] : grey[300]}`,
                        backgroundColor: isDarkMode ? common['black'] : common['white'],
                    },
                },
            },
        },
    }));
};