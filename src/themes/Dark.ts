import { createTheme } from "@mui/material";

export const Dark = createTheme({


    components: {
        MuiSelect: {
            styleOverrides: {
              icon: {
                color: '#43a047',
              },
            },
        }
    },
    palette: {
        primary: {
            main: "#676767",
            dark: "#202125",
            light: "#747474",
            contrastText: "#ffffff",
            textColor: "#757575",
            iconColor: "#757575"
        },
        secondary: {
            main: "#43a047"
        },
        background: {
            paper: "#35373f",
            default: "#16171B"
        },
        text: {
            primary: "#ffffff",
            secondary: "#757575"
        },
    },
    shape: {
        borderRadius: 5
    },

});