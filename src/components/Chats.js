import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './ScrollBar.css'; // Import custom scroll bar styles
import './ThreeDotLoader.css'; // Import the loader styles

function Chats() {
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for bot response

  const chatContainerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/sessions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSessions();
  }, []);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (selectedSessionId) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/session/${selectedSessionId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setChatHistory(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchChatHistory();
  }, [selectedSessionId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSessionClick = (sessionId) => {
    setSelectedSessionId(sessionId);
    setMessage('');
  };

  const handleStartNewSession = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/start_session', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newSessionId = response.data.session_id;
      const newSession = {
        session_id: newSessionId,
        created_at: new Date().toISOString(),
      };
      setSessions([...sessions, newSession]);
      setSelectedSessionId(newSessionId);
      setChatHistory([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const userMessage = { message, response: '', userMessage: true };
    setChatHistory((prevHistory) => [...prevHistory, userMessage]);
    setMessage('');
    setLoading(true); // Set loading to true when sending message

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/chat/${selectedSessionId}`, { message }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setChatHistory((prevHistory) =>
        prevHistory.map((msg, index) =>
          index === prevHistory.length - 1
            ? { ...msg, response: response.data.response }
            : msg
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after receiving response
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/delete_session/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSessions(sessions.filter((session) => session.session_id !== sessionId));

      if (sessionId === selectedSessionId) {
        setSelectedSessionId(null);
        setChatHistory([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-800 shadow-lg p-4 flex-shrink-0 flex flex-col justify-between md:h-screen">
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">Previous Chats</h2>

        {/* Scrollable session list */}
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent mb-4 max-h-60 md:max-h-[70%]">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session.session_id}
                className={`border-b border-gray-600 p-3 rounded-md cursor-pointer hover:bg-gray-700 transition duration-150 ${
                  selectedSessionId === session.session_id ? 'bg-gray-600 font-bold' : ''
                }`}
                onClick={() => handleSessionClick(session.session_id)}
              >
                <p className="text-sm text-gray-300">Title: {session.title || 'Untitled'}</p>
                <p className="text-xs text-gray-500">Started: {new Date(session.created_at).toLocaleString()}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSession(session.session_id);
                  }}
                  className="text-red-500 hover:text-red-700 text-xs mt-2"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No chat sessions available.</p>
          )}
        </div>

        {/* Start New Chat Button */}
        <button
          onClick={handleStartNewSession}
          className="bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 w-full"
        >
          Start New Chat
        </button>
        <div></div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-900 p-6 min-h-0">
        <div className="bg-gray-800 shadow-lg p-6 rounded-lg flex-grow flex flex-col min-h-0">
          <h2 className="text-3xl font-semibold text-white mb-6">Chat Session</h2>

          {!selectedSessionId ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500 mb-4">No chat session open</p>
              <button
                onClick={handleStartNewSession}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Start New Chat
              </button>
            </div>
          ) : (
            <>
              {/* Scrollable chat history */}
              <div
                className="flex-grow overflow-y-auto bg-gray-700 p-4 rounded-lg shadow-inner scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                ref={chatContainerRef}
              >
                {chatHistory.length > 0 ? (
                  chatHistory.map((chat, index) => (
                    <div key={index} className="mb-6">
                      <div className="text-sm text-white mb-2">You: {chat.message}</div>
                      <div className="text-sm text-gray-300 flex items-center">
                        Bot:&nbsp;
                        {chat.response || (loading && index === chatHistory.length - 1 && (
                          <span className="dot-typing ml-2">
                            <div></div><div></div><div></div>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No messages yet. Start chatting!</p>
                )}
              </div>

              {selectedSessionId && (
                <form onSubmit={handleSendMessage} className="flex mt-4 flex-shrink-0">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="flex-grow p-3 border border-gray-600 rounded-l-lg shadow-sm focus:outline-none focus:ring focus:border-white bg-gray-600 text-white"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-r-lg hover:bg-gray-700 transition duration-200"
                  >
                    Send
                  </button>
                </form>
                 
              )}
              <div className='py-6'></div>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chats;
