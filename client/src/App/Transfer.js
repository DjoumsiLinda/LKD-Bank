import "../css/Transfer.css";
import useForm from "../useForm.js"; //custom Hooks
import { useState, useEffect } from "react";

export default function Transfer(props) {
    const [form, handleChange, setForm] = useForm({
        sender_name: "",
        iban: "",
        amount: 0.0,
        purpose: "",
        date: new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
        time: new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "numeric",
            minute: "numeric",
        }),
    });

    const [msg, setMsg] = useState(false);

    function handleSubmit(evt) {
        evt.preventDefault();
        if (props.pause) {
            setForm({
                ...form,
                sender_name: "",
                iban: "",
                purpose: "",
                amount: 0,
            });
            return;
        }
        //verifie si le iban et augmenter les cout de 0.10cent
        fetch("/transfer.json", {
            method: "POST",
            body: JSON.stringify({
                sender_name: form.sender_name,
                iban: form.iban,
                amount: form.amount,
                purpose: form.purpose,
                date: form.date,
                time: form.time,
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
            .then((erg) => {
                props.setbalance(erg.balance);
                setMsg(true);
                setForm({
                    ...form,
                    sender_name: "",
                    iban: "",
                    purpose: "",
                    amount: 0,
                });
            });
    }
    function handleClickPfeile() {
        if (document.documentElement.scrollTop > 0) {
            document.documentElement.scrollTop = 0;
        }
    }
    return (
        <div className="transfer">
            <div id="user_info">
                <p>
                    {props.first} {props.last}
                </p>
                <p>{props.iban}</p>
                <p>Your account balance: {props.balance} €</p>
                {props.pause && (
                    <p id="pauseAccount">
                        Your account is paused. You can't make a transfer!{" "}
                        <a href="/profile">here</a> to change it.
                    </p>
                )}
            </div>
            <div id="transfer_bereich">
                <form onSubmit={handleSubmit}>
                    <div id="beneficiary">
                        <label>Payment beneficiary*</label>
                        <input
                            type="text"
                            name="sender_name"
                            placeholder="payment beneficiary"
                            value={form.sender_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div id="iban">
                        <label>IBAN*</label>
                        <input
                            type="text"
                            name="iban"
                            placeholder="IBAN"
                            value={form.iban}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div id="amount">
                        <p>Amount*</p>
                        <input
                            type="number"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            min="0"
                            max={props.balance}
                            required
                        ></input>
                    </div>
                    <div id="purpose">
                        <label>Purpose of the transfer*</label>
                        <input
                            type="text"
                            name="purpose"
                            placeholder="Purpose of the transfer"
                            value={form.purpose}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div id="date">
                        <p>Tranfer Date</p>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                        ></input>
                        <span className="validity"></span>
                    </div>
                    <div id="time">
                        <p>Tranfer Time</p>
                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <button type="submit">Transfer</button>
                </form>
            </div>
            <div id="fixe-img">
                <img
                    onClick={handleClickPfeile}
                    src="/assets/pfeile_oben.png"
                ></img>
            </div>
            {msg && <h2 id="successful">Transfer successful!😊</h2>}
        </div>
    );
}
