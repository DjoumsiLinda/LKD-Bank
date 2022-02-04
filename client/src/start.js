import ReactDOM from "react-dom";

import Home from "./Home/Home.js";
import App from "./App/App.js";

fetch("/user/id.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        // user is logged in
        if (data.userId) {
            ReactDOM.render(<App />, document.querySelector("body"));
        } else {
            ReactDOM.render(<Home />, document.querySelector("body"));
        }
    });
