import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Dark, Light } from "../../themes";
import { ThemeProvider } from "@mui/material";

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

interface ThemeProps {
    children: ReactNode;
}


const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

export const AppThemeProvider = (props: ThemeProps) => {
    const [themeName,setThemeName] = useState<'light' | 'dark'>('light');
    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light' )
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            setThemeName(savedTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', themeName);
    }, [themeName]);

    const theme = useMemo(() => {
        if (themeName === 'light') return Light;
        return Dark;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>

                    {props.children}
         
            </ThemeProvider>
        </ThemeContext.Provider>

    )



}