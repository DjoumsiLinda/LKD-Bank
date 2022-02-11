import { useEffect, useState } from "react";
import "../css/Contact.css";

export default function Contact() {
    const [comments, setComments] = useState([]);
    const [messages, setMessages] = useState([]);
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

    return (
        <div className="contact">
            <div id="begin">
                <p>
                    You can contact us <a href="/"> here </a>
                    or you can consult the Chat. There is surely an answer to
                    your question. If not <a href="/login">Log in</a>
                    and enjoy the best service.
                </p>
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
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
