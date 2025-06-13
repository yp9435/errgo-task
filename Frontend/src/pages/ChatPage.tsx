import React, { useEffect, useRef, useState } from "react";

// BONUS TASK: Implemented a simple chat page with WebSocket connection

const WS_URL = "ws://localhost:3000/"; 

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, ...data]);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(input);
      setInput("");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-purple-100 p-4">
      <div className="w-full max-w-2xl flex flex-col bg-white rounded-2xl shadow-xl h-[90vh]">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-center text-purple-800">Chat Space!!</h1>
        </div>
        <div className="flex-1 p-6 space-y-4 bg-purple-300 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="p-3 bg-purple-200 rounded-lg text-gray-800">
              {msg}
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            className="flex-1 bg-transparent px-2 py-1 focus:border-purple-500 "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button
            className="ml-2 px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
      <img
        src="/jelly.gif" 
        alt="star"
        className="fixed bottom-4 right-4 w-40 h-21 z-50"
      />
    </div>
  );
};

export default ChatPage;

