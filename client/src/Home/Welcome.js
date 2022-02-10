import "../css/Welcome.css";
import { useEffect } from "react";

export default function Welcome() {
    useEffect(() => {
        const width = 1000;
        const height = 1000;
        const canvas = document.createElement("canvas");
        canvas.classList.add("rain");
        canvas.style.width = width;
        canvas.style.height = height;
        document.querySelector("main #bienvenue").appendChild(canvas);
        initAnimation(width, height, canvas);
    });
    return (
        <div id="bienvenue">
            <div className="container"></div>
            {/*<p>Welcome in LKD~Bank!</p>
            <p>
                Stay connected! 😉 <a href="/login">sign in</a>
            </p>*/}
        </div>
    );

    function initAnimation(width, height, canvas) {
        const numMoney = 30;
        const speedOffset = 1;
        const speedRange = 5;
        const numImages = 6;
        const fallingMoney = [];
        const frameRate = 1000 / 30; // 30 frames per second
        const animationLength = 10000; // 10 seconds

        const canvasContext = canvas.getContext("2d");
        for (let index = 1; index <= numMoney; index++) {
            const isOdd = index % 2 == 1;
            let direction = 0;
            if (isOdd) direction = 1;
            else direction = -1;

            const money = {
                image: new Image(),
                x: Math.random(width),
                y: Math.random(height),
                angle: 5,
                speed: speedOffset + Math.random(speedRange),
                currentFrame: 0,
                direction: direction,
            };

            const imageIndex = Math.random(numImages);
            // money.image.src = "https://dl.dropboxusercontent.com/u/58679421/make_it_rain_images/money_" +
            //   imageIndex + ".png"
            //money.image.src =
            //"https://images.vexels.com/media/users/3/144032/isolated/preview/1f5414b9d04b71a4972208c035a7d278-stroke-dollar-bill-by-vexels.png";
            money.image.src = "/assets/100Euro.png";
            fallingMoney.push(money);
        }

        let interval = setInterval(function () {
            draw(fallingMoney, canvasContext, width, height);
        }, frameRate);

        setTimeout(function () {
            endAnimation(fallingMoney, canvas, interval);
        }, animationLength);
    }
    function draw(fallingMoney, canvasContext, width, height) {
        clearWindow(canvasContext, width, height);

        fallingMoney.forEach(function (money, index) {
            drawRotatedImage(money, canvasContext);

            money.currentFrame += 1;
            money.y += money.speed;
            money.angle += money.direction * 0.1;
            let radius = money.direction * (10 + (index % 6));
            money.x +=
                Math.sin((money.currentFrame + index) / (2 * Math.PI)) * radius;
        });
    }

    function clearWindow(canvasContext, width, height) {
        canvasContext.clearRect(0, 0, width, height);
    }

    function drawRotatedImage(money, canvasContext) {
        canvasContext.save();
        canvasContext.translate(50 + money.x, money.y);
        canvasContext.rotate(money.angle);
        canvasContext.drawImage(
            money.image,
            0,
            0,
            150,
            (150 * money.image.height) / money.image.width
        );
        canvasContext.restore();
    }
    function endAnimation(fallingMoney, canvas, interval) {
        clearInterval(interval);
        fallingMoney = [];
        initAnimation(1000, 1000, canvas);
        canvas.detach();
    }
}
