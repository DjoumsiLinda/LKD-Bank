import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/Contact.css";

export default function Contact() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [comments, setComments] = useState([]);
    const [moreComment, setMoreComment] = useState(true);
    useEffect(() => {
        fetch("/getMessages.json")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((messages) => {
                setMessages(messages);
            });
        fetch("/getComments.json")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((comments) => {
                setComments(comments);
            });
    }, []);
    function handleClick(e) {
        e.preventDefault();
        if (message !== "") {
            fetch("/addMessages.json", {
                method: "POST",
                body: JSON.stringify({
                    message: message,
                }),
                headers: {
                    "content-type": "application/json",
                },
            }).then((res) => {
                if (res.ok) {
                    setMessage("");
                }
            });
        }
    }
    function handleChange(evt) {
        setMessage(evt.target.value);
    }
    function HandleAddComment(evt) {
        evt.preventDefault();
        setMoreComment(true);
    }

    return (
        <div className="contact">
            <div id="begin">
                <p>You can contact us </p>
                <a href="/"> here </a>
                <p>or you can leave us a message in the chat</p>
            </div>
            <div className="chat">
                <h2 id="nam">Chat with us and other user</h2>
                <div id="lastMessages">
                    <div>
                        {messages.map((message) => {
                            return (
                                <div key={message.id} className="message">
                                    <a href={`/user/${message.users_id}`}>
                                        <img
                                            src={
                                                message.url ||
                                                "/assets/default.jpeg"
                                            }
                                            onError={(evt) => {
                                                evt.target.src =
                                                    "/assets/default.jpeg";
                                            }}
                                        />
                                    </a>
                                    <div>
                                        <div className="first">
                                            <h2>
                                                {message.first} {message.last}
                                            </h2>

                                            <p>
                                                {new Intl.DateTimeFormat(
                                                    "en-US",
                                                    {
                                                        dateStyle: "full",
                                                        timeStyle: "short",
                                                    }
                                                ).format(
                                                    new Date(message.created_at)
                                                )}
                                            </p>
                                        </div>
                                        <div className="second">
                                            <p className="msg">
                                                {message.message}
                                            </p>
                                        </div>
                                        {moreComment && (
                                            <div id="moreComment">
                                                {comments.map((comment) => {
                                                    return (
                                                        <div key={comment.id}>
                                                            {comment.messages_id ==
                                                                message.id && (
                                                                <div id="comment">
                                                                    <h2>
                                                                        {
                                                                            comment.first
                                                                        }
                                                                    </h2>
                                                                    <h2>
                                                                        {
                                                                            comment.last
                                                                        }
                                                                    </h2>
                                                                    <p id="coment">
                                                                        {
                                                                            comment.messages
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        {new Intl.DateTimeFormat(
                                                                            "en-US",
                                                                            {
                                                                                dateStyle:
                                                                                    "full",
                                                                                timeStyle:
                                                                                    "short",
                                                                            }
                                                                        ).format(
                                                                            new Date(
                                                                                comment.created_at
                                                                            )
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        <div
                                            id="addcomment"
                                            onClick={HandleAddComment}
                                        >
                                            <a href="">add your comment</a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id="writeMessage">
                    <form onSubmit={handleClick} id="formId">
                        <textarea
                            type="text"
                            name="message"
                            value={message}
                            onChange={handleChange}
                            rows="4"
                            cols="80"
                            placeholder="you can answer questions here or ask your questions here"
                        ></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
