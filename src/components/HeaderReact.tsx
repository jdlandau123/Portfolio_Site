import { useState, useEffect } from 'react';

interface IProps {
    title: string;
}

export const Header = (props: IProps) => {
    const { title } = props;

    const [showMenu, setShowMenu] = useState(false);
    const [desktopScreen, setDesktopScreen] = useState(window.matchMedia("(min-width: 600px)").matches);

    useEffect(() => { // listen for screen size
        window.matchMedia("(min-width: 600px)").addEventListener('change', (e) => setDesktopScreen(e.matches));
    }, [])
    
    const styles = {
        header: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            color: 'white',
            borderRadius: '10px'
        },
        h1: {
            fontWeight: 'lighter',
            color: 'white'
        },
        hamburger: {
            background: 'transparent',
            border: 'transparent',
            zIndex: '100',
            padding: '4px',
            cursor: 'pointer'
        },
        icon: {
            width: '30px',
		    height: '30px',
        },
        menuItem: {
            color: 'white',
            fontSize: desktopScreen ? '18pt' : '14pt',
            textDecoration: 'none'
        },
        mobileMenuContainer: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            justifyContent: 'flex-end',
        },
        mobileMenu: {
            display: showMenu ? 'flex' : 'none',
            justifyContent: 'space-around',
            listStyle: 'none',
            padding: '20px',
            outline: '1pt solid black',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            width: '100%',
            borderRadius: '8px',
        },
        desktopMenu: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            gap: '30px',
            listStyle: 'none'
        }
    }

    return (
        <>
        <div style={styles.header}>
            <a style={{textDecoration: 'none'}} href="/">
                <h1 style={styles.h1}>{title}</h1> 
            </a>
            {!desktopScreen && <button style={styles.hamburger} onClick={() => setShowMenu(!showMenu)}>
                {!showMenu && <img style={styles.icon} src="/icons/menu-icon-white.png" alt="Menu" />}
                {showMenu && <img  style={styles.icon} src="/icons/close-icon-white.png" alt="Close" />}
            </button>}
            {desktopScreen && <ul style={styles.desktopMenu}>
                <li><a style={styles.menuItem} href="/">Home</a></li>
                <li><a style={styles.menuItem} href="projects">Projects</a></li>
                <li><a style={styles.menuItem} href="experience">Experience</a></li>
                <li><a style={styles.menuItem} href="contact">Contact</a></li>
            </ul>}
        </div>
        <div style={styles.mobileMenuContainer}>
            {showMenu && <ul style={styles.mobileMenu}>
                <li><a style={styles.menuItem} href="/">Home</a></li>
                <li><a style={styles.menuItem} href="projects">Projects</a></li>
                <li><a style={styles.menuItem} href="experience">Experience</a></li>
                <li><a style={styles.menuItem} href="contact">Contact</a></li>
            </ul>}
        </div>
        </>
    )
}