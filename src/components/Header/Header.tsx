'use client';
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header(){
    const [location, setLocation] = useState<string>('Localizando....');
    const [temperature, setTemperature] = useState<string>('0°C');

    useEffect(() => {
        if(!navigator.geolocation) {
            setLocation('Geolocalização não suportada');
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const result = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                const data = await result.json();
                const temp = data.current_weather.temperature;

                setTemperature(`${temp.toFixed(0)}°C`);
                setLocation('🌤️');
            } catch (error) {
                setLocation('Erro ao obter localização');
            }
            
        });
    }, []);


    function Typewriter({text} : {text: string}){
        const [index, setIndex] = useState(0);

        useEffect(() => {
            if(index < text.length){
                const timeout = setTimeout(() => setIndex(index + 1), 100);
                return () => clearTimeout(timeout);
            }
        }, [index, text]);
    
        return <span>{text.slice(0, index)}<span className={styles.cursor}>|</span></span>
    }

    return(
        <header className={styles.header}>
            <div className={styles.navbar}>
                <div className={styles.logoArea}>
                    <h1 className={styles.logo}><Typewriter text="Vinicius Rolim Barbosa" /></h1>
                    <span className={styles.clima}>{location} {temperature}</span>
                </div>
                <nav className={styles.navLinks}>
                    <Link href="/">Home</Link>
                    <Link href="#projetos">Projetos</Link>
                    <Link href="/sobre">Sobre</Link>
                    <Link href="/contato">Contato</Link>
                </nav>
            </div>
        </header>
    );
}