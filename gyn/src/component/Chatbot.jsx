import { useState } from 'react';
import '../App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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"; // Replace with your OpenAI API key

const systemMessage = {
  role: "system",
  content: "Explain things like you're talking to a software professional with 2 years of experience."
};

// Retry delay in milliseconds
const RETRY_DELAY = 5000; // 5 seconds

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages
      ]
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Retrying after delay...");
        }
        throw new Error(`API returned status code ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.choices && data.choices.length > 0) {
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
      } else {
        console.error("No response from ChatGPT or choices array is empty.");
        setMessages([...chatMessages, {
          message: "Something went wrong! Please try again.",
          sender: "ChatGPT"
        }]);
      }
    } catch (error) {
      console.error("Error while communicating with ChatGPT:", error);

      // If rate limit is exceeded, wait for a delay and then retry
      if (error.message.includes("Rate limit exceeded")) {
        setTimeout(() => {
          console.log("Retrying...");
          processMessageToChatGPT(chatMessages);
        }, RETRY_DELAY);
      } else {
        setMessages([...chatMessages, {
          message: "Failed to communicate with ChatGPT. Please check your API key and internet connection.",
          sender: "ChatGPT"
        }]);
      }
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatbot;
