import "../css/App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Component } from "react";
import { connect } from "react-redux";
import { receivedUsers } from "../redux/users/slice";
import { setbioHook } from "../redux/bio/slice";
import { seturlHook } from "../redux/url/slice";
import Profile from "./Profile.js";
import Uploader from "./Uploader.js";
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
                            <a href="/">Über uns</a>
                            <a href="/">Services</a>
                            <a href="/">Kontakt</a>
                            <a href="/">Beratung</a>
                        </nav>
                    </div>
                    <a href="/" id="home" onClick={this.handleHome}>
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
                    <a href="/" id="bankBild" onClick={this.handleBank}>
                        <img src="/assets/bank.png"></img>
                    </a>
                    <div id="overlayProfile">
                        <div className="arrow-up"></div>
                        <nav id="menuProfile">
                            <a href="/profile">Profile bearbeiten</a>
                            <a href="/">Change your profile</a>
                            <a href="/">...</a>
                        </nav>
                    </div>
                    <a
                        href="/profile"
                        id="profileBild"
                        onClick={this.handleProfile}
                    >
                        <img src="/assets/profile.png"></img>
                    </a>
                    <a href="/" id="signOut">
                        <img src="/assets/sign-out.png"></img>
                    </a>
                </header>
                <main>
                    <BrowserRouter>
                        <Route exact path="/">
                            <h1>LKD~Bank</h1>
                            <p>LKD~Bank is the best Bank. Stay connected!</p>
                        </Route>
                        <Route exact path="/profile">
                            <Profile
                                picture={user.url}
                                first={user.first}
                                last={user.last}
                                email={user.email}
                                bio={user.bio}
                                setbio={this.setbio}
                                componentVisible={this.componentVisible}
                            />
                        </Route>
                    </BrowserRouter>
                    {this.state.uploaderVisible && (
                        <Uploader componentVisible={this.componentVisible} />
                    )}
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
})(App);
