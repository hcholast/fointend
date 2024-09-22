import React, { useEffect, useState } from 'react';
import './Terminal.css';


const Terminal = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Welcome to SmartChat AI! \nExploring the future of AI-powered conversations."; // Your terminal text
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prevText) => prevText + fullText[index]);
        setIndex(index + 1);
      }, 100); // Speed of typing animation
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <div className="terminal-window relative bg-black text-green-400 p-6 h-full font-mono">
      <div className="terminal-bar bg-gray-700 p-2 rounded-t-lg text-gray-300 flex justify-start space-x-2">
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      </div>
      <pre className="mt-2 whitespace-pre-wrap">{displayedText}</pre>
    </div>
  );
}

export default Terminal;

