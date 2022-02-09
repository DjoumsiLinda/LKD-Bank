import "../css/Home.css";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./Login.js";
import Registration from "./Registration.js";
import ResetPassword from "./ResetPassword.js";
import RegistrationPart2 from "./RegistrationPart2";
import Consulting from "./Consulting";
import Welcome from "./Welcome";
import Contact from "./Contact";

/* https://www.w3schools.com/howto/howto_js_shrink_header_scroll.asp */
export default function Home() {
    return (
        <div className="home">
            <header>
                <div id="headerElement">
                    <a href="/">
                        <img src="/assets/home.png"></img>
                    </a>
                    <a href="/contact">Contact</a>
                    <a href="/consulting">Consulting</a>
                    <a href="/register">Register</a>
                    <a href="/login">Sign in</a>
                </div>
            </header>
            <div id="recht">
                <main>
                    <div id="welcome">
                        <BrowserRouter>
                            <Route exact path="/">
                                <Welcome />
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
                            <Route path="/register2">
                                <RegistrationPart2 />
                            </Route>
                            <Route path="/consulting">
                                <Consulting />
                            </Route>
                            <Route path="/contact">
                                <Contact />
                            </Route>
                        </BrowserRouter>
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
}
