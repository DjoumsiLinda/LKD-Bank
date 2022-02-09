import "../css/Credit.css";
import useForm from "../useForm.js"; //custom Hooks

export default function Balance(props) {
    const [form, handleChange] = useForm({
        credit: 0.0,
    });
    let max = 0;
    if (props.status === "Student") {
        max = 100;
    } else if (props.status === "Worker") {
        max = 1000;
    } else {
        max = 2000;
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        console.log("Credit request", form.credit);
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
            .then(() => {
                props.setbalance(form.credit);
                form.credit = 0;
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
            <p>Aktuel credit: {props.credit || 0}€</p>

            <form onSubmit={handleSubmit}>
                <p>How much do you want to lend to the bank?</p>
                <div>
                    <input
                        type="number"
                        name="credit"
                        value={form.credit}
                        onChange={handleChange}
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
