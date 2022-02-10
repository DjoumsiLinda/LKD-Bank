import "../css/Balance.css";
import { useEffect, useState } from "react";

export default function Balance(props) {
    const [listTransfer, setListTransfer] = useState("");
    const [listReceived, setListReceived] = useState("");
    useEffect(() => {
        fetch(`/getTransfer.json`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((list) => {
                setListTransfer(list);
            });
        fetch(`/getReceivedTransfer/${props.iban}.json`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((list) => {
                setListReceived(list);
            });
    }, []);
    function handleClickPfeile() {
        if (document.documentElement.scrollTop > 0) {
            document.documentElement.scrollTop = 0;
        }
    }
    return (
        <div className="balance">
            <h2>
                {props.first} {props.last}
            </h2>
            <p id="iban">{props.iban}</p>
            <p>Your account balance: {props.balance} €</p>
            {listTransfer.length === 0 ? (
                <p>List of your accomplished transfers: no transaction</p>
            ) : (
                <div id="listTransfer">
                    <p>List of your accomplished transfers:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>IBAN</th>
                                <th>Amount</th>
                                <th>Purpose</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                    </table>
                    {listTransfer.map((transation) => {
                        return (
                            <div key={transation.id}>
                                <table>
                                    <tr>
                                        <td>{transation.sender_name}</td>
                                        <td>{transation.iban}</td>
                                        <td>-{transation.amount}€</td>
                                        <td>{transation.purpose} </td>
                                        <td>
                                            {new Intl.DateTimeFormat([
                                                "ban",
                                                "id",
                                            ]).format(
                                                new Date(
                                                    transation.transfer_date
                                                )
                                            )}
                                        </td>
                                        <td>
                                            {transation.transfer_time ||
                                                new Intl.DateTimeFormat(
                                                    "en-GB",
                                                    {
                                                        timeStyle: "short",
                                                    }
                                                ).format(
                                                    new Date(
                                                        transation.transfer_date
                                                    )
                                                )}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        );
                    })}
                </div>
            )}
            {listReceived.length === 0 ? (
                <p>List of your received transfers: no transaction</p>
            ) : (
                <div id="receivedTransfer">
                    <p>List of your received transfers:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>IBAN</th>
                                <th>Amount</th>
                                <th>Purpose</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                    </table>
                    {listReceived.map((received) => {
                        return (
                            <div key={received.id}>
                                <table>
                                    <tr>
                                        <td>{received.sender_name}</td>
                                        <td>{received.iban}</td>
                                        <td>+{received.amount}€</td>
                                        <td>{received.purpose}</td>
                                        <td>
                                            {new Intl.DateTimeFormat([
                                                "ban",
                                                "id",
                                            ]).format(
                                                new Date(received.transfer_date)
                                            )}
                                        </td>
                                        <td>
                                            {received.transfer_time ||
                                                new Intl.DateTimeFormat(
                                                    "en-GB",
                                                    {
                                                        timeStyle: "short",
                                                    }
                                                ).format(
                                                    new Date(
                                                        received.transfer_date
                                                    )
                                                )}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        );
                    })}
                </div>
            )}
            <div id="fixe-img">
                <img
                    onClick={handleClickPfeile}
                    src="/assets/pfeile_oben.png"
                ></img>
            </div>
        </div>
    );
}
