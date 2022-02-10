import "../css/App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Component } from "react";

import { connect } from "react-redux";
import { receivedUsers } from "../redux/users/slice";
import { setUserHook } from "../redux/users/slice";
import { setUserInPause } from "../redux/users/slice";
import { setbioHook } from "../redux/bio/slice";
import { seturlHook } from "../redux/url/slice";
import { setbalanceHook } from "../redux/balance/slice";
import { setCreditHook } from "../redux/users/slice";

import Startseite from "./Startseite.js";
import Profile from "./Profile.js";
import Logout from "./Logout.js";
import Uploader from "./Uploader.js";
import Transfer from "./Transfer.js";
import Balance from "./Balance.js";
import Credit from "./Credit.js";
import Welcome from "../Home/Welcome";
import Contact from "./Contact.js";
import Delete from "./Delete.js";

let user = null;
const mapStateToProps = (state) => {
    if (state.users && state.users.id !== 0) {
        user = state.users;
    }
    if (state.bio && state.bio !== "") {
        user = { ...user, bio: state.bio };
    }
    if (state.url && state.url !== "") {
        user = { ...user, url: state.url };
    }
    if (state.balance && state.balance !== 0) {
        user = { ...user, balance: state.balance };
    }
    return { user };
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
            error: false,
        };

        this.componentVisible = this.componentVisible.bind(this);
        this.handleBank = this.handleBank.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
        this.open_close = this.open_close.bind(this);
        this.handleClickMain = this.handleClickMain.bind(this);
        this.setbalance = this.setbalance.bind(this);
        this.setCredit = this.setCredit.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setPause = this.setPause.bind(this);
        this.setbio = this.setbio.bind(this);
    }
    componentDidMount() {
        fetch("/app.json")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    this.setState({ error: true });
                }
            })
            .then((user) => {
                this.props.receivedUsers(user);
            });
    }

    componentVisible(url) {
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
        if (url) {
            this.props.seturlHook(url);
        }
    }
    setbio(bio) {
        this.props.setbioHook(bio);
    }
    setbalance(balance) {
        this.props.setbalanceHook(balance);
    }
    setCredit(credit) {
        this.props.setCreditHook(credit);
    }
    setUser(user) {
        this.props.setUserHook(user);
    }
    setPause(pause) {
        fetch("/InPause.json", {
            method: "POST",
            body: JSON.stringify({
                pause: pause,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                this.props.setUserInPause(pause);
            }
        });
    }
    handleClickMain() {
        const classOnHome = document.querySelector("#overlayHome");
        const classOnBank = document.querySelector("#overlayBank");
        const classOnProfile = document.querySelector("#overlayProfile");
        if (
            classOnHome.classList.contains("on") ||
            classOnBank.classList.contains("on") ||
            classOnProfile.classList.contains("on")
        ) {
            classOnHome.classList.remove("on");
            classOnBank.classList.remove("on");
            classOnProfile.classList.remove("on");
        }
    }
    render() {
        if (!user) {
            return <p>Loading...</p>;
        }
        return (
            <div className="app">
                <header>
                    <div id="overlayHome">
                        <div className="arrow-up"></div>
                        <nav id="menuHome">
                            <a href="/welcome">Home</a>
                            <a href="/contact">Contact</a>
                            <a href="/home">Services</a>
                        </nav>
                    </div>
                    <a href="/" id="home" onClick={this.handleHome}>
                        <img src="/assets/home.png"></img>
                    </a>
                    <div id="overlayBank">
                        <div className="arrow-up"></div>
                        <nav id="menuBank">
                            <a href="/transfer">Transfer money</a>
                            <a href="/balance">Balance</a>
                            <a href="/credit">Credit request</a>
                        </nav>
                    </div>
                    <a href="/" id="bankBild" onClick={this.handleBank}>
                        <img src="/assets/bank.png"></img>
                    </a>
                    <div id="overlayProfile">
                        <div className="arrow-up"></div>
                        <nav id="menuProfile">
                            <a href="/profile">Profile edit</a>
                            <a href="/delete">Delete your account</a>
                        </nav>
                    </div>
                    <a
                        href="/profile"
                        id="profileBild"
                        onClick={this.handleProfile}
                    >
                        <img src="/assets/profile.png"></img>
                    </a>
                    <a href="/logout" id="signOut">
                        <img src="/assets/sign-out.png"></img>
                    </a>
                </header>
                <main onClick={this.handleClickMain}>
                    <BrowserRouter>
                        <Route exact path="/">
                            <Transfer
                                iban={user.iban}
                                first={user.first}
                                pause={user.pause}
                                last={user.last}
                                balance={user.balance}
                                setbalance={this.setbalance}
                            />
                        </Route>
                        <Route path="/profile">
                            <Profile
                                picture={user.url}
                                first={user.first}
                                last={user.last}
                                email={user.email}
                                age={user.age}
                                city={user.city}
                                credit={user.credit || 0}
                                status={user.status}
                                bio={user.bio}
                                iban={user.iban}
                                setbio={this.setbio}
                                componentVisible={this.componentVisible}
                                setUser={this.setUser}
                                pause={user.pause}
                                setPause={this.setPause}
                            />
                        </Route>
                        <Route path="/logout">
                            <Logout />
                        </Route>
                        <Route path="/home">
                            <Startseite />
                        </Route>
                        <Route path="/welcome">
                            <Welcome />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/delete">
                            <Delete />
                        </Route>
                        <Route path="/transfer">
                            <Transfer
                                iban={user.iban}
                                first={user.first}
                                last={user.last}
                                balance={user.balance}
                                setbalance={this.setbalance}
                                pause={user.pause}
                            />
                        </Route>
                        <Route path="/balance">
                            <Balance
                                iban={user.iban}
                                first={user.first}
                                last={user.last}
                                balance={user.balance}
                            />
                        </Route>
                        <Route path="/credit">
                            <Credit
                                status={user.status}
                                credit={user.credit}
                                setCredit={this.setCredit}
                            />
                        </Route>
                    </BrowserRouter>
                    {this.state.uploaderVisible && (
                        <Uploader componentVisible={this.componentVisible} />
                    )}
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
    }
    handleHome(e) {
        e.preventDefault();
        let overlayHome = document.querySelector("#overlayHome");
        this.open_close(overlayHome);
    }
    handleBank(e) {
        e.preventDefault();
        let overlayBank = document.querySelector("#overlayBank");
        this.open_close(overlayBank);
    }
    handleProfile(e) {
        e.preventDefault();
        let overlayProfile = document.querySelector("#overlayProfile");
        this.open_close(overlayProfile);
    }
    open_close(overlay) {
        if (overlay.classList.contains("on") === true) {
            overlay.classList.remove("on");
        } else {
            const classOnHome = document.querySelector("#overlayHome");
            const classOnBank = document.querySelector("#overlayBank");
            const classOnProfile = document.querySelector("#overlayProfile");
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
export default connect(mapStateToProps, {
    receivedUsers,
    setbioHook,
    seturlHook,
    setbalanceHook,
    setUserHook,
    setUserInPause,
    setCreditHook,
})(App);
