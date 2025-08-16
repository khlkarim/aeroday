export const tokens = {
    mode: 'light' as const,
    // Brand Colors
    primary: { 
        main: '#000000',
        light: '#E0E0E0',    // Light gray
        dark: '#757575'      // Dark gray
    },
    secondary: { 
        main: '#90CAF9',     // Blue for dark theme primary
        light: '#BBDEFB',    // Lighter blue
        dark: '#42A5F5'      // Darker blue
    },
    // Semantic Colors
    success: { 
        main: '#66BB6A',     // Lighter green for dark theme
        light: '#81C784', 
        dark: '#388E3C' 
    },
    warning: { 
        main: '#FFB74D',     // Your original
        light: '#FFCC02',    // Brighter yellow-orange
        dark: '#F57C00' 
    },
    error: { 
        main: '#F44336',     // Standard Material error red
        light: '#E57373', 
        dark: '#C62828' 
    },
    info: { 
        main: '#29B6F6',     // Your original
        light: '#4FC3F7', 
        dark: '#0288D1' 
    },
    // Backgrounds & Surfaces
    background: {
        default: '#FFFFFF',  // Material Design dark surface
        paper: '#1E1E1E',    // Elevated surface
    },
    // Text Colors
    text: {
        primary: 'rgba(0, 0, 0, 1)',    // High emphasis text
        secondary: 'rgba(0, 0, 0, 0.60)',  // Medium emphasis text
        disabled: 'rgba(0, 0, 0, 0.38)',   // Disabled text
    },
    // Divider
    divider: 'rgba(0, 0, 0, 0.2)',

    // Action States
    action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)',
    },
};