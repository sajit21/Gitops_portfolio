import { useState, useEffect } from "react";

export default function Typewriter({ text, speed = 120, pause = 1500 }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        // typing
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          setI(i + 1);
        } else {
          // finished typing → pause → start deleting
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // deleting
        if (i > 0) {
          setDisplayText(text.slice(0, i - 1));
          setI(i - 1);
        } else {
          // finished deleting → start typing again
          setIsDeleting(false);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [i, isDeleting, text, speed, pause]);

  return <span>{displayText}</span>;
}
