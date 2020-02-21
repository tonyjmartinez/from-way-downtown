import { useEffect, useState } from "react";

const Home = props => {
  const [message, setMessage] = useState(null);
  const [socket, setSocket] = useState(null);
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

    // message received - show the message in div#messages
    if (socket) {
      socket.onmessage = function(event) {
        let message = event.data;
        console.log(message);
      };
    }
  }, [socket]);

  useEffect(() => {
    socket && message && socket.send(message);
  }, [message, socket]);

  return <input onChange={e => setMessage(e.target.value)} />;
};

export default Home;
