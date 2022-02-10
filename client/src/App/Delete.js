import { useEffect } from "react";

export default function Delete() {
    useEffect(() => {
        fetch("/delete.json").then((res) => {
            if (res.ok) {
                location.replace("/");
            }
        });
    }, []);
    return <div className="logout">Thank you for trusting us</div>;
}
