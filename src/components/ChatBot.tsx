import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import { chatbotKnowledge} from '../data/chatbotKnowledge';

interface Message {
  text: string;
  isUser: boolean;
}

function getBestResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  let bestMatch: { entryIndex: number; keywordCount: number } = { entryIndex: -1, keywordCount: 0 };

  chatbotKnowledge.forEach((entry, idx) => {
    let count = 0;
    entry.keywords.forEach(keyword => {
      if (lowerMessage.includes(keyword)) count++;
    });
    if (count > bestMatch.keywordCount) {
      bestMatch = { entryIndex: idx, keywordCount: count };
    }
  });

  if (bestMatch.entryIndex !== -1 && bestMatch.keywordCount > 0) {
    const responses = chatbotKnowledge[bestMatch.entryIndex].responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return "Oops! I can only help with Shirtify-related questions like products, pricing, sizes, shipping, returns, customization, and care. 😊";
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: `Hi there! 🎉 I’m Shirtify Genie — your personal shopping assistant 🧞‍♂️.\n\nI can help you explore our shirts, caps, jackets, and more! 🧢👕🧥\n\nFrom prices, sizes, and shipping to customization options — I’ve got you covered!\n\nIf you have questions outside Shirtify, I’m afraid I can only assist with our awesome products. 😊\n\nLet’s get started — ask me anything!`,
      isUser: false,
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { text: inputMessage, isUser: true };
    setMessages([...messages, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = getBestResponse(inputMessage);
      const botMessage: Message = { text: botResponse, isUser: false };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <FaComments size={24} />
        </button>
      ) : (
        <div className="bg-gray-900 rounded-lg shadow-xl w-80 h-96 flex flex-col border border-gray-700">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Shirtify Genie</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-700 bg-gray-900">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about our products..."
                className="flex-1 border rounded-lg px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
