import "../css/Profile.css";
import { useState } from "react";

import useForm from "../useForm.js"; //custom Hooks
import BioEditor from "./BioEditor.js";
import ProfilePicture from "./ProfilePicture.js";

export default function Profile(props) {
    const [edit, setEdit] = useState(false);
    const [form, handleChange] = useForm({
        first: props.first,
        last: props.last,
        email: props.email,
        password: "",
        age: props.age,
        city: props.city,
    });
    const [status, setStatus] = useState(props.status);
    function handleProfileEdit(evt) {
        evt.preventDefault();
        setEdit(!edit);
    }
    function handleSubmitProfileEdit(evt) {
        evt.preventDefault();
        fetch("/profileEdit.json", {
            method: "POST",
            body: JSON.stringify({
                first: form.first,
                last: form.last,
                email: form.email,
                password: form.password,
                age: form.age,
                city: form.city,
                status: status,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                const obj = {
                    first: form.first,
                    last: form.last,
                    email: form.email,
                    password: form.password,
                    age: form.age,
                    city: form.city,
                    status: status,
                };
                props.setUser(obj);
            }
        });
    }
    function handleChangeStatus(evt) {
        setStatus(evt.target.value);
    }
    function handlePauseAccount() {
        // evt.preventDefault();
        props.setPause(!props.pause);
    }
    return (
        <section className="profile">
            <div id="aktProfile">
                <div id="left">
                    <ProfilePicture
                        picture={props.picture || "/assets/default.jpeg"}
                        first={props.first}
                        last={props.last}
                        email={props.email}
                        componentVisible={props.componentVisible}
                    />
                </div>
                <div id="right">
                    <h2>
                        {props.first} {props.last} lives in {props.city}{" "}
                        <img
                            onClick={handleProfileEdit}
                            src="/assets/edit.svg"
                        />
                    </h2>
                    <h2>
                        Status: {props.status}{" "}
                        <img
                            onClick={handleProfileEdit}
                            src="/assets/edit.svg"
                        />
                    </h2>
                    <h2>
                        Age: {props.age}{" "}
                        <img
                            onClick={handleProfileEdit}
                            src="/assets/edit.svg"
                        />
                    </h2>
                    <div id="pause">
                        <h2>Put the account on pause</h2>
                        {props.pause ? (
                            <label
                                className="switch"
                                onClick={handlePauseAccount}
                            >
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        ) : (
                            <label
                                className="switch"
                                onClick={handlePauseAccount}
                            >
                                <input type="checkbox" defaultChecked />
                                <span className="slider round"></span>
                            </label>
                        )}
                    </div>

                    <p>IBAN: {props.iban}</p>
                    <p>Credit:{props.credit}€</p>
                    <div>
                        <BioEditor bio={props.bio} setbio={props.setbio} />{" "}
                    </div>
                </div>
            </div>

            <div id="editProfile2">
                {edit && (
                    <form onSubmit={handleSubmitProfileEdit}>
                        <p id="edit">Edit your profile</p>
                        <input
                            type="text"
                            name="first"
                            value={form.first}
                            pattern=".{3,}"
                            required="required"
                            title="3 characters minimum"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="last"
                            value={form.last}
                            pattern=".{3,}"
                            required="required"
                            title="3 characters minimum"
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            pattern=".{7,}"
                            required="required"
                            title="7 characters minimum"
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            value=""
                            placeholder="Enter a new password"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="age"
                            value={form.age}
                            placeholder="Age"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            placeholder="City"
                            onChange={handleChange}
                        />
                        <div id="changeStatus">
                            <legend>Change your status</legend>
                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Student"
                                    onChange={handleChangeStatus}
                                />
                                <p>Student</p>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Worker"
                                    onChange={handleChangeStatus}
                                />
                                <p>Worker</p>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Firm"
                                    onChange={handleChangeStatus}
                                />
                                <p>Firm</p>
                            </div>
                        </div>
                        <div>
                            <button type="submit" name="update">
                                Update
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
