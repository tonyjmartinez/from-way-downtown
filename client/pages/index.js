import { useEffect, useState } from "react";

const Home = props => {
  const [message, setMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    !socket &&
      setSocket(
        new WebSocket(
          "wss://ukc9gkyfpl.execute-api.us-east-1.amazonaws.com/dev"
        )
      );

    // send message from the form
    // let outgoingMessage = "test";

    // socket.send(outgoingMessage);

    console.log("here");
    // message received - show the message in div#messages
    if (socket) {
      socket.onmessage = function(event) {
        let msg = event.data;
        console.log("messages", messages);
        console.log("message", msg);
        const newMessages = messages.concat(msg);
        console.log("newmessages", newMessages);
        handleMessage(newMessages);
      };
    }
  }, [socket, messages]);

  const handleMessage = newMessages => setMessages(newMessages);

  useEffect(() => {
    socket && message && socket.send(message);
  }, [message, socket]);

  return (
    <>
      <input onChange={e => setMessage(e.target.value)} />
      <div>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ width: "100%" }}>
            {msg}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
