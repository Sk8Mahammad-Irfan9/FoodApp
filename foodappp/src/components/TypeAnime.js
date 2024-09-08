import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

function TypeAnime() {
  const [text] = useTypewriter({
    words: ["Event Catering", "Wine & Cocktails", "Restaurant"],
    loop: {},
    typeSpeed: 30,
    deleteSpeed: 30,
  });

  return (
    <>
      <span style={{ color: "#a07037" }}>{text}</span>
      <span>
        <Cursor />
      </span>
    </>
  );
}

export default TypeAnime;
