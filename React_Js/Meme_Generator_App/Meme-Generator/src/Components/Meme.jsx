import React, { useEffect, useState } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1bij.jpg"
  });

  const [allmemes, setAllmemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllmemes(data.data.memes)) 
      .catch(error => console.error('Error fetching memes:', error));
  }, []);

  function handler(event) {
    const { name, value } = event.target;
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }));
  }

  function getMeme() {
    const rand = Math.floor(Math.random() * allmemes.length);
    const url = allmemes[rand].url;
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          className="form-input"
          type="text"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handler}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handler}
        />
        <button className="form-btn" onClick={getMeme}>
          Get a new meme image 🌇
        </button>
      </div>

      <div className="meme">
        <img src={meme.randomImage} className="meme--image" alt="Meme" />
        <h2 className="meme-text-top">{meme.topText}</h2>
        <h2 className="meme-text-bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
