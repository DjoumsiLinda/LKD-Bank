import "../css/Credit.css";
import useForm from "../useForm.js"; //custom Hooks

export default function Balance(props) {
    const [form, handleChange] = useForm({
        credit: 0,
    });
    let max = 0;
    if (props.status === "student") {
        max = 100;
    } else if (props.status === "beruf") {
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
            <p>
                You are {props.status} and you can borrow maximale {max} euro!
            </p>
            <form onSubmit={handleSubmit}>
                <p>How much do you want to lend to the bank?</p>
                <div>
                    {" "}
                    <input
                        type="number"
                        name="credit"
                        value={form.credit}
                        onChange={handleChange}
                        max={max}
                        required
                    ></input>
                    <button type="submit">Apply</button>
                </div>
            </form>
        </div>
    );
}
