import "../css/Home.css";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./Login.js";
import Registration from "./Registration.js";
import ResetPassword from "./ResetPassword.js";

/* https://www.w3schools.com/howto/howto_js_shrink_header_scroll.asp */
export default function Home() {
    return (
        <div className="home">
            <header>
                <a href="/" onClick={handleClickHome}>
                    <img src="/assets/home.png"></img>
                </a>
                <a href="/">Services</a>
                <a href="/">Beratung</a>
                <a href="/">Kontakt</a>
                <a href="/register">Register</a>
                <a href="/login">Sign in</a>
            </header>
            <div id="recht">
                <main>
                    <div id="welcome">
                        <BrowserRouter>
                            <Route exact path="/">
                                <p>Wilkommen in LKD~Bank!</p>
                                <p>
                                    Stay connected! 😉{" "}
                                    <a href="/login">sign in</a>
                                </p>
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Registration />
                            </Route>
                            <Route path="/password">
                                <ResetPassword />
                            </Route>
                        </BrowserRouter>
                    </div>
                    <div id="slider">
                        <img src="/assets/geld2.png" className="onscreen" />
                        <img src="/assets/geld3.png" />
                        <img src="/assets/gold.png" />
                        <img src="/assets/geld1.png" />
                        <img src="/assets/muenze.png" />
                        <img src="/assets/ueberweisen.png" />
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
        </div>
    );

    function handleClickHome(e) {
        e.preventDefault();
        console.log("You are Cklick");
        let slider = document.querySelector("main #slider");
        open_close(slider);
        let images = slider.getElementsByTagName("img");
        let transitioning = false;

        let timeoutId = null;

        let activeIdx = 0;

        function moveSlides(idx) {
            if (length == images.length) {
                idx = 0;
            }
            transitioning = true;

            images[activeIdx].classList.add("exit");

            if (typeof idx === "number") {
                activeIdx = idx;
            } else if (activeIdx < images.length - 1) {
                activeIdx++;
            } else {
                activeIdx = 0;
            }

            images[activeIdx].classList.add("onscreen");

            timeoutId = setTimeout(moveSlides, 5000);
        }

        setTimeout(moveSlides, 5000);

        slider.addEventListener("transitionend", function (event) {
            if (event.target.classList.contains("exit")) {
                event.target.classList.remove("onscreen");
                event.target.classList.remove("exit");
            }
        });
    }
    function open_close(overlay) {
        const welcomeOn = document.querySelector("#welcome");
        if (overlay.classList.contains("on") === true) {
            welcomeOn.style.visibility = "visible";
            overlay.classList.remove("on");
        } else {
            welcomeOn.style.visibility = "hidden";
            overlay.classList.add("on");
        }
    }
}
