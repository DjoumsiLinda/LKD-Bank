import { useEffect } from "react";
import "../css/Consulting.css";

export default function Consulting() {
    useEffect(() => {
        handleClickHome();
    }, []);
    return (
        <div className="consulting">
            <div id="slider">
                <img src="/assets/geld3.png" className="onscreen" />
                <img src="/assets/gold.png" />
                <img src="/assets/geld3.png" />
                <img src="/assets/muenze.png" />
                <img src="/assets/ueberweisen.png" />
                <img src="/assets/sparrkonto.png" />
            </div>
        </div>
    );
    function handleClickHome() {
        let slider = document.querySelector(".consulting #slider");

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

            timeoutId = setTimeout(moveSlides, 1000);
        }

        setTimeout(moveSlides, 100);

        slider.addEventListener("transitionend", function (event) {
            if (event.target.classList.contains("exit")) {
                event.target.classList.remove("onscreen");
                event.target.classList.remove("exit");
            }
        });
    }
}
