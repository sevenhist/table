import React, { createContext, FC, useContext, useState, useEffect } from 'react';
import s from "./Theme.module.scss";

type ThemeType = {
    theme: string;
    toggleTheme: () => void;
};

// Create a context for managing the theme
const ThemeContext = createContext<ThemeType | undefined>(undefined);

// Custom hook to consume the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProps {
    children: React.ReactNode;
}

// Theme provider component
export const ThemeProvider: FC<ThemeProps> = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Apply the theme class to the <html> element when the theme changes
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
