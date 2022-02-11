import "../css/Credit.css";
import useForm from "../useForm.js"; //custom Hooks
import { useState, useEffect } from "react";

export default function Balance(props) {
    const [form, handleChange, setForm] = useForm({
        credit: 0.0,
    });
    let max = 0;
    if (props.status === "Student" || props.status === "student") {
        max = 100;
    } else if (props.status === "Worker" || props.status === "worker") {
        max = 1000;
    } else {
        max = 2000;
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        fetch("/credit.json", {
            method: "POST",
            body: JSON.stringify({
                amount: form.credit,
            }),
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((credit) => {
                props.setCredit(credit.credit);
                setForm({
                    ...form,
                    credit: 0,
                });
            });
    }
    return (
        <div className="credit">
            <div id="einBlock">
                <p>You are </p>
                <h2> {props.status} </h2>
                <p> and you can borrow maximale</p>
                <h2>{max}</h2>
                <p> euro!</p>
            </div>
            <p>Current credit: {props.credit || 0}€</p>

            <form onSubmit={handleSubmit}>
                <p>How much do you want to lend to the bank?</p>
                <div>
                    <input
                        type="number"
                        name="credit"
                        value={form.credit}
                        onChange={handleChange}
                        min={0}
                        max={max - props.credit}
                        required
                    ></input>
                    <button id="submit" type="submit">
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
}
