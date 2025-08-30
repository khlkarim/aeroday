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
            divider: isDarkMode ? grey[800] : common['black'],
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
                        border: 0,
                        boxShadow: 'none',
                        borderBottom: `1px solid ${isDarkMode ? grey[800] : common['black']}`,
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: isDarkMode ? background : common['white'],
                        border: `1px solid ${isDarkMode ? grey[800] : common['black']}`,
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

// import { createTheme, responsiveFontSizes } from '@mui/material';
// import { amber, common, green, grey, lightBlue, red, pink } from '@mui/material/colors';

// const attractionRed = "#000000";
// const attractionYellow = "#2b4f98";
// const attractionBlue = "#E53935";
// const attractionPink = "#FFFFFF";

// const background = common['black'];
// const bodyBackground = {
//     light: 'linear-gradient(90deg, #FFFFFF 0%, #D9F1FF 100%)',
//     dark: 'linear-gradient(to right, #020111 10%, #151426 100%)',
// };

// export const shadTheme = (mode: 'light' | 'dark') => {
//     const isDarkMode = mode === 'dark';

//     return responsiveFontSizes(createTheme({
//         palette: {
//             mode,
//             primary: {
//                 main: isDarkMode ? attractionPink : attractionRed,
//                 light: isDarkMode ? pink[300] : amber[100],
//                 dark: isDarkMode ? pink[700] : red[900],
//             },
//             secondary: {
//                 main: isDarkMode ? attractionBlue : attractionYellow,
//             },
//             success: {
//                 main: green['700'],
//             },
//             error: {
//                 main: red['800'],
//             },
//             info: {
//                 main: lightBlue['600'],
//             },
//             warning: {
//                 main: amber['700'],
//             },
//             divider: isDarkMode ? grey[800] : grey[300],
//             background: {
//                 default: isDarkMode ? background : grey[50],
//                 paper: isDarkMode ? background : grey[50],
//             },
//         },
//         shape: {
//             borderRadius: 4,
//         },
//         spacing: 8,
//         typography: {
//             fontSize: 14,
//             htmlFontSize: 18,
//             fontFamily: ['Geist Sans', '-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
//             fontWeightMedium: 500,
//             fontWeightBold: 700,
//             h1: { fontFamily: 'Righteous', fontSize: '4rem', fontWeight: 700 },
//             h2: { fontFamily: 'Righteous', fontSize: '3rem', fontWeight: 700 },
//             h3: { fontFamily: 'Righteous', fontSize: '2.5rem', fontWeight: 600 },
//             h4: { fontFamily: 'Righteous', fontSize: '2rem', fontWeight: 600 },
//             h5: { fontFamily: 'Righteous', fontSize: '1.5rem', fontWeight: 600 },
//             h6: { fontFamily: 'Righteous', fontSize: '1.25rem', fontWeight: 600 },
//             button: { fontFamily: 'Roboto', fontWeight: 500 },
//             body1: { fontFamily: 'Roboto' },
//             body2: { fontFamily: 'Roboto' },
//             caption: { fontFamily: 'Roboto' },
//             overline: { fontFamily: 'Roboto' },
//         },
//         components: {
//             MuiCssBaseline: {
//                 styleOverrides: {
//                     ':root': { colorScheme: isDarkMode ? 'dark' : 'light' },
//                     html: { minHeight: '100%' },
//                     body: {
//                         minHeight: '100%',
//                         background: isDarkMode ? bodyBackground.dark : bodyBackground.light,
//                         backgroundRepeat: 'no-repeat',
//                         backgroundPosition: 'top right',
//                         backgroundSize: '100%',
//                     },
//                 },
//             },
//             MuiButton: {
//                 styleOverrides: {
//                     root: {
//                         fontWeight: 500,
//                         fontSize: '0.95rem',
//                         textTransform: 'none',
//                         borderRadius: 8,
//                         boxShadow: 'none',
//                         fontFamily: 'Roboto',
//                     },
//                 },
//             },
//             MuiAppBar: {
//                 styleOverrides: {
//                     root: {
//                         border: 0,
//                         boxShadow: 'none',
//                         borderBottom: `1px solid ${isDarkMode ? grey[800] : common['black']}`,
//                     },
//                 },
//             },
//             MuiPaper: {
//                 styleOverrides: {
//                     root: {
//                         backgroundImage: 'none',
//                         border: `1px solid ${isDarkMode ? grey[800] : grey[300]}`,
//                         backgroundColor: isDarkMode ? common['black'] : common['white'],
//                     },
//                 },
//             },
//         },
//     }));
// };
