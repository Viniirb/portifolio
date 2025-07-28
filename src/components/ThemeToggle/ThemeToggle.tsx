'use client';
import { use, useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>('light');

    useEffect(() => {
        const userPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(userPref ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', userPref ? 'dark' : 'light');
    }, []);

    const toggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }

    return (
        <button onClick={toggle} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    )
}