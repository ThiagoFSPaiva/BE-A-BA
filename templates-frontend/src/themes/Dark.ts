import { createTheme } from "@mui/material";

export const Dark = createTheme({

    typography: {
        fontFamily: 'Nunito, sans-serif',
      },
    components: {
        MuiSelect: {
            styleOverrides: {
              icon: {
                color: '#43a047',
              },
            },
        },
        MuiButton: {
            styleOverrides: {
              root: {
                color: '#FFFFFF', 
              },
            },
        }
    },

    palette: {
        mode: "dark",
        primary: {
            main: "#39a03d",
            light: "#056f09",
            dark: "#124514",
            contrastText: "#ffffff",
            textColor: "#757575",
            iconColor: "#757575"
        },
        secondary: {
            main: "#00733B",
            light: "#056f09",
            dark: "#898989",
            contrastText: "#ebeef2",
        },
        background: {
            paper: "#1f2129",
            default: "#15171e"
        },
        text: {
            primary: "#efefef",
            secondary: "#929292"
        },
        
    },
    shape: {
        borderRadius: 5
    },

});