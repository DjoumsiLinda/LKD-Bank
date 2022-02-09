import "../css/Welcome.css";
import { useEffect } from "react";

export default function Welcome() {
    useEffect(() => {});
    return (
        <div id="bienvenue">
            <div className="container">
                <div className="rain-maker">Make It Rain</div>
            </div>
            <p>Welcome in LKD~Bank!</p>
            <p>
                Stay connected! 😉 <a href="/login">sign in</a>
            </p>
        </div>
    );
}
