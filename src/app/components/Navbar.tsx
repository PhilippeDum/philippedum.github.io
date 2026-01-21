'use client';

export default function Navbar() {
    const closeMenu = () => {
        const toggle = document.getElementById('check') as HTMLInputElement;
        if (toggle) toggle.checked = false;
    };

    return (
        <nav id="navbar">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <h2>Devfolio</h2>
            <ul className="navbar_buttons">
                <li><a href="" onClick={closeMenu}>Accueil</a></li>
                <li><a href="#demoreels" onClick={closeMenu}>Demo-Reels</a></li>
                <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
            </ul>
        </nav>
    );
}