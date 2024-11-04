// app/components/ChatBox.js

'use client';

import { useState, useRef } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: input },
    ]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      if (data.reply) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: data.reply },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Lo siento, hubo un error.' },
        ]);
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Lo siento, hubo un error.' },
      ]);
    } finally {
      setLoading(false);
      setInput('');
      // Desplazar al final de los mensajes
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
            <span>Chat con IA</span>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex p-2 border-t">
            <input
              className="flex-grow p-2 border rounded-l-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe un mensaje..."
            />
            <button
              className={`p-2 ${
                loading ? 'bg-gray-500' : 'bg-blue-500'
              } text-white rounded-r-lg`}
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? '...' : 'Enviar'}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          Chat
        </button>
      )}
    </div>
  );
}
