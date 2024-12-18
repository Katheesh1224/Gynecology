import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faComment, faPaperPlane, faRobot } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat visibility

  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Welcome to the Gynecology Department. You can ask any questions; we are here to assist you.' }])


  // Function to format bot messages
  const formatBotMessage = (botMessage) => {
    if (typeof botMessage !== 'string') return botMessage; // Ensure the message is a string

    // Replace bold (**)
    let boldToggle = true; // Toggle between <b> and </b>
    botMessage = botMessage.replace(/\*\*/g, () => {
      const replacement = boldToggle ? '<B>' : '</B>';
      boldToggle = !boldToggle;
      return replacement;
    });

    // Replace italic (*)
    let italicToggle = true; // Toggle between <i> and </i>
    botMessage = botMessage.replace(/\*/g, () => {
      const replacement = italicToggle ? '' : '';
      italicToggle = !italicToggle;
      return replacement;
    });

    return botMessage;
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post('http://localhost:5000/chat', { userMessage: input });
      const botMessage = { sender: 'bot', text: formatBotMessage(response.data.reply) }; // Format bot message
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
              <div
                className={msg.sender === 'user' ? 'user-message' : 'bot-message'}
                dangerouslySetInnerHTML={msg.sender === 'bot' ? { __html: msg.text } : undefined}
              >
                {msg.sender === 'user' ? msg.text : null}
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
