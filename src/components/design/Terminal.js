import React, { useEffect, useState } from 'react'; 

const Terminal = () => {
  const texts = [
    "Welcome to SmartChat AI! Exploring the future of AI-powered conversations.",
    "Seamless AI-powered conversations in real-time.",
    "Your personal AI assistant is here to help, 24/7."
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0); 
  const [index, setIndex] = useState(0); 
  const [isDeleting, setIsDeleting] = useState(false); 
  const [pause, setPause] = useState(false);

  useEffect(() => {
    let timeout;

    if (!pause) {
      if (!isDeleting && index < texts[textIndex].length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + texts[textIndex][index]);
          setIndex((prevIndex) => prevIndex + 1);
        }, 100);
      } else if (isDeleting && index > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex((prevIndex) => prevIndex - 1);
        }, 100);
      } else if (!isDeleting && index === texts[textIndex].length) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 5000); 
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
        setPause(true); 
        setTimeout(() => {
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          setPause(false);
        }, 500); 
      }
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, pause, textIndex]);

  return (
    <div className="terminal-window relative bg-transparent text-green-400 h-full w-full font-mono">
      <div className="terminal-bar bg-gray-700 p-2 rounded-t-[1.25rem]  text-gray-300 flex justify-start space-x-2">
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      </div>
      <div className="bg-black p-6 h-[80%] w-full rounded-b-[1.25rem]">
        <pre className="whitespace-pre-wrap">{displayedText}</pre>
      </div>
      <>
      {/* Lowering the z-index to push the gradient into the background */}
      <div className="relative z-0 h-6 mx-2.5 bg-n-11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
      <div className="relative z-0 h-6 mx-6 bg-n-11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
    </>
    </div>
  );
};

export default Terminal;
