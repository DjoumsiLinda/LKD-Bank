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
            <p>
                {props.first} {props.last}
            </p>
            <p>{props.iban}</p>
            <p>Your account Balance: {props.balance} €</p>
            {listTransfer.length === 0 ? (
                <p>not found</p>
            ) : (
                <div>
                    <p>List of your accomplished transfers:</p>
                    {listTransfer.map((transation) => {
                        return (
                            <div key={transation.id}>
                                {transation.sender_name}:{transation.amount} €{" "}
                                {transation.transfer_time}
                            </div>
                        );
                    })}
                </div>
            )}
            {listReceived.length === 0 ? (
                <p>not found</p>
            ) : (
                <div>
                    <p>List of your received transfers:</p>
                    {listReceived.map((received) => {
                        return (
                            <div key={received.id}>
                                {received.sender_name}:{received.amount} €{" "}
                                {received.transfer_time}
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
