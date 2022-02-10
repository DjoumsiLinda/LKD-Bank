import { useEffect } from "react";

export default function Logout() {
    useEffect(() => {
        fetch("/logout.json").then((res) => {
            if (res.ok) {
                location.replace("/login");
            }
        });
    }, []);
    return <div className="logout">See you soon</div>;
}
