import "../css/Startseite.css";
import { useEffect } from "react";

export default function Startseite() {
    useEffect(() => {
        handleClickHome();
    }, []);
    return (
        <div className="Startseite">
            <div id="slider">
                <img src="/assets/geld2.png" className="onscreen" />
                <img src="/assets/geld3.png" />
                <img src="/assets/gold.png" />
                <img src="/assets/geld1.png" />
                <img src="/assets/muenze.png" />
                <img src="/assets/ueberweisen.png" />
            </div>
        </div>
    );
    function handleClickHome() {
        console.log("You are Cklick");
        let slider = document.querySelector(".Startseite #slider");
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
}
