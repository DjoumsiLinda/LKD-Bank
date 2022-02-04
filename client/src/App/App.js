import "../css/App.css";
import { useState, useEffect } from "react";

export default function App() {
    return (
        <div className="app">
            <header>
                <div id="overlayHome">
                    <div className="arrow-up"></div>
                    <nav id="menuHome">
                        <a href="/">Über uns</a>
                        <a href="/">Services</a>
                        <a href="/">Kontakt</a>
                        <a href="/">Beratung</a>
                    </nav>
                </div>
                <a href="/" id="home" onClick={handleHome}>
                    <img src="/assets/home.png"></img>
                </a>
                <div id="overlayBank">
                    <div className="arrow-up"></div>
                    <nav id="menuBank">
                        <a href="/">Überweisung</a>
                        <a href="/">Kontostand</a>
                        <a href="/">...</a>
                    </nav>
                </div>
                <a href="/" id="bankBild" onClick={handleBank}>
                    <img src="/assets/bank.png"></img>
                </a>
                <div id="overlayProfile">
                    <div className="arrow-up"></div>
                    <nav id="menuProfile">
                        <a href="/">Profile bearbeiten</a>
                        <a href="/">...</a>
                        <a href="/">...</a>
                    </nav>
                </div>
                <a href="/" id="profileBild" onClick={handleProfile}>
                    <img src="/assets/profile.png"></img>
                </a>
                <a href="/" id="signOut">
                    <img src="/assets/sign-out.png"></img>
                </a>
            </header>
            <main>
                <h1>LKD~Bank</h1>
                <p>LKD~Bank is the best Bank. Stay connected!</p>
                <div id="fixe-img">
                    <a href="/">
                        <img href="/" src="/assets/home.png"></img>
                    </a>
                    <a href="/">
                        <img href="/" src="/assets/bank.png"></img>
                    </a>
                    <a href="/">
                        <img src="/assets/profile.png"></img>
                    </a>
                </div>
            </main>
            <footer>
                <p>
                    &copy; 2022 |{" "}
                    <a href="https://www.linkedin.com/in/linda-motieh-djoumsi-76597b219/">
                        ldjoumsi@yahoo.com
                    </a>{" "}
                </p>
            </footer>
        </div>
    );
    function handleHome(e) {
        e.preventDefault();
        let overlayHome = document.querySelector("#overlayHome");
        open_close(overlayHome);
    }
    function handleBank(e) {
        e.preventDefault();
        let overlayBank = document.querySelector("#overlayBank");
        open_close(overlayBank);
    }
    function handleProfile(e) {
        e.preventDefault();
        let overlayProfile = document.querySelector("#overlayProfile");
        open_close(overlayProfile);
    }
    function open_close(overlay) {
        if (overlay.classList.contains("on") === true) {
            overlay.classList.remove("on");
        } else {
            let classOnHome = document.querySelector("#overlayHome");
            let classOnBank = document.querySelector("#overlayBank");
            let classOnProfile = document.querySelector("#overlayProfile");
            if (
                classOnHome.classList.contains("on") ||
                classOnBank.classList.contains("on") ||
                classOnProfile.classList.contains("on")
            ) {
                classOnHome.classList.remove("on");
                classOnBank.classList.remove("on");
                classOnProfile.classList.remove("on");
            }
            overlay.classList.add("on");
        }
    }
}
