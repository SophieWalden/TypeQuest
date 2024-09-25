import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const texts = [
    "The sun rises in the east, bringing light to a new day. Birds sing in the trees, welcoming the morning with their songs. The world awakens, ready for whatever comes next.",
    "Technology is advancing faster than ever. Every day brings new innovations, from smarter phones to more powerful computers. The future seems limitless, full of possibilities waiting to be explored.",
    "In the heart of the forest, a stream flows gently over the rocks. The air is crisp and cool, filled with the scent of pine and earth. Nature's beauty is on full display, serene and timeless.",
    "History is a tapestry woven from the lives of countless people. Each event, no matter how small, leaves a mark on the fabric of time. The stories of the past help guide the choices of the future.",
    "Space exploration has always fascinated humanity. The idea of traveling beyond our planet, venturing into the unknown, captures our imagination. The universe is vast, and we have only just begun to explore it.",
    "Music has the power to move people, to inspire and to heal. A single melody can evoke memories, stir emotions, and connect people across cultures and borders. It is a universal language that speaks to the soul.",
    "The ocean stretches out before us, vast and mysterious. Beneath its surface lies a world teeming with life, from the smallest plankton to the largest whales. It is a reminder of the beauty and power of nature.",
    "Cities are bustling with activity, full of life and energy. People from all walks of life come together in these vibrant spaces, each contributing to the rhythm of the city. It is a place of endless possibilities and challenges.",
    "Learning is a lifelong journey. With every new piece of knowledge, our understanding of the world deepens. The pursuit of wisdom and understanding drives progress and personal growth.",
    "Art is a reflection of the human experience. Through paintings, sculptures, and performances, artists express their emotions, thoughts, and perspectives. It is a way of communicating beyond words, capturing the essence of life itself."
  ];

  const [text] = useState(texts[Math.floor(Math.random() * texts.length)]);
  const [index, setIndex] = useState(0);
  const [charTyped, setCharTyped] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [endScreen, setEndScreen] = useState(0);
  const containerRef = useRef(null); // Ref to auto-focus the container

  const lineWidth = 70;

  useEffect(() => {
    containerRef.current.focus(); // Auto-focus the container
  }, []);

  const handleKeyDown = (e) => {
    const { key, metaKey, ctrlKey } = e;

    if (metaKey || ctrlKey) {
      return;
    }

    e.preventDefault();

    if (key === text.charAt(index)) {
      if (index === 0) {
        setStartTime(Date.now());
      }

      if (index < text.length) {
        setIndex(index + 1);
        setCharTyped((typed) => typed + 1);
      }
    }
  };

  function getTextForLine(offset) {
    const start = Math.floor((index + offset) / lineWidth) * lineWidth;
    const end = start + lineWidth;
    return text.slice(start, end);
  }

  function getWPM() {
    if (startTime === 0) return 0;
    const minutesElapsed = ((Date.now() - startTime) / 1000) / 60;
    return Math.round((charTyped / 5) / minutesElapsed);
  }

  useEffect(() => {
    if (index === text.length) {
      setEndTime(Date.now());
      setEndScreen(1);
    }
  }, [index, text]);

  return (
    <div
      id="site-container"
      ref={containerRef} // Attach the ref to focus automatically
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <h3 id="wpm-display">WPM: {startTime === 0 ? "" : getWPM()}</h3>
      {
        endScreen === 1 ? <div></div> :
        <div>
          <h3 id="displayed-text">
            <span id="finished-text">{getTextForLine(0).slice(0, index % lineWidth)}</span>
            {getTextForLine(0).slice(index % lineWidth)}
          </h3>
          <h3 id="displayed-text">{getTextForLine(lineWidth)}</h3>
          <h3 id="displayed-text">{getTextForLine(lineWidth * 2)}</h3>
        </div>
      }
    </div>
  );
}

export default App;