import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5555/messages')
      .then(response => response.json())
      .then(data => setMessages(data));
  }, []);

  const handleNewMessage = () => {
    fetch('http://127.0.0.1:5555/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: newMessage,
        username: 'example_user'
      })
    })
    .then(response => response.json())
    .then(data => {
      setMessages([...messages, data]);
      setNewMessage('');
    });
  };

  return (
    <div className="App">
      <h1>Chatterbox App</h1>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Enter your message..."
        />
        <button onClick={handleNewMessage}>Send</button>
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map(message => (
            <li key={message.id}>{message.body}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
