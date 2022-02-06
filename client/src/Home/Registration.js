import "../css/Registration.css";
import { Link } from "react-router-dom";
import useForm from "../useForm.js"; //custom Hooks
import { useState } from "react";

export default function Registration() {
    const [form, handleChange] = useForm({
        first: "",
        last: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(false);

    function handleSubmit(evt) {
        evt.preventDefault();
        console.log("handleSubmit");

        fetch("/registration.json", {
            method: "POST",
            body: JSON.stringify({
                first: form.first,
                last: form.last,
                email: form.email,
                password: form.password,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                location.replace("/");
            } else {
                setError(true);
            }
        });
    }
    return (
        <div id="regis">
            <h2>Join LKD~Bank et benefie de 100 euro</h2>
            {error && (
                <p className="error">
                    There are already an account with these emails adresse!
                </p>
            )}
            <form className="registration" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first"
                    placeholder="First Name"
                    value={form.first}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="last"
                    placeholder="Last Name"
                    value={form.last}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-Mail-Adresse"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
            <Link to="/login">Click here to Log in!</Link>
        </div>
    );
}
