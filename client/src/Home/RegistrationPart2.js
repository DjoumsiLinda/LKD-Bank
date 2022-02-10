import { useEffect, useState } from "react";
import "../css/RegistrationPart2.css";
import useForm from "../useForm.js"; //custom Hooks

export default function RegistrationPart2(props) {
    const [form, handleChange] = useForm({
        age: 0,
        city: "",
    });

    const [status, setStatus] = useState("");
    const [pass, setPass] = useState("");
    const [errorPass, setErrorPass] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorPic, setErrorPic] = useState(false);
    const [yesButton, setYesButton] = useState(false);
    const [pic, setPic] = useState("");
    function yesClick() {
        setYesButton(true);
    }
    function handleChangeBild(evt) {
        setPic(evt.target.files[0]);
    }
    function handleChangePass(evt) {
        setPass(evt.target.files[0]);
    }

    function handleChangeStatus(evt) {
        setStatus(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (pass === "") {
            setErrorPass(true);
        } else if (status === "") {
            setErrorStatus(true);
        }
        if (pic === "" && yesButton === true) {
            setErrorPic(true);
        }
        if (pass === "" && status === "") {
            setErrorPass(true);
            setErrorStatus(true);
        } else {
            const formData = new FormData();
            formData.append("status", status);
            formData.append("pass", pass);
            formData.append("age", form.age);
            formData.append("city", form.city);
            formData.append("userId", props.userId);
            fetch("/regis_part2.json", {
                method: "POST",
                body: formData,
            }).then((res) => {
                if (res.ok) {
                    if (pic) {
                        const formData2 = new FormData();
                        formData2.append("pic", pic);
                        formData2.append("userId", props.userId);
                        fetch("/regis_part2Pic.json", {
                            method: "POST",
                            body: formData2,
                        }).then((res) => {
                            if (res.ok) {
                                location.replace("/transfer");
                            }
                        });
                    }
                    location.replace("/transfer");
                }
            });
        }
    }
    return (
        <div className="RegistrationPart2">
            <form onSubmit={handleSubmit}>
                <div id="age">
                    <label>Age*</label>
                    <input
                        type="number"
                        name="age"
                        min={1}
                        value={form.age}
                        placeholder="Age"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div id="city">
                    <label>City*</label>
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        placeholder="City"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div id="addBild">
                    <p>Do you want to add a profile picture?</p>
                    <input
                        type="checkbox"
                        id="yesno"
                        name="yesno"
                        value="yes"
                        onChange={yesClick}
                    />{" "}
                    yes{" "}
                    <input type="checkbox" id="yesno" name="yesno" value="no" />{" "}
                    nein{" "}
                </div>
                {errorPic && <p id="error">obligation fields!</p>}
                {yesButton && (
                    <input
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={handleChangeBild}
                    />
                )}
                {errorPass && <p id="error">obligation fields!</p>}
                {/*<p id="error">obligation fields!</p> */}
                <div id="addPass">
                    <p>Please add your passport*</p>
                    <input
                        type="file"
                        accept="pdf/*"
                        name="file"
                        onChange={handleChangePass}
                    />
                </div>
                {errorStatus && <p id="error">obligation fields!</p>}
                <div id="addStatus">
                    <legend>Choose your status*</legend>
                    <div>
                        <input
                            type="radio"
                            name="status"
                            value="Student"
                            onChange={handleChangeStatus}
                        />
                        <label>Student</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="status"
                            value="Worker"
                            onChange={handleChangeStatus}
                        />
                        <label>Worker</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="status"
                            value="Firm"
                            onChange={handleChangeStatus}
                        />
                        <label>Firm</label>
                    </div>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
