import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faComment, faPaperPlane, faRobot } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat visibility

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post('http://localhost:8081/chat', { userMessage: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error getting response.' }]);
    }

    setInput('');
  };

  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <div className={`chat-container ${isChatOpen ? 'show-chat-container' : ''}`}>
        <div className="chat-header">
          <h4>Chatbot</h4>
        </div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'user' : 'bot'}>
              {msg.sender !== 'user' && <FontAwesomeIcon className="robot" icon={faRobot} />}
              <div className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Listen for "Enter" key
            placeholder="Type your message..."
          />
          <button className="chat_button" onClick={handleSend}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>

      {/* Chatbot Toggler */}
      <button className="chatbot-toggler" onClick={() => setIsChatOpen(!isChatOpen)}>
        {!isChatOpen ? (
          <span className="chat-icon">
            <FontAwesomeIcon icon={faComment} />
          </span>
        ) : (
          <span className="close-icon">
            <FontAwesomeIcon icon={faXmark} />
          </span>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
