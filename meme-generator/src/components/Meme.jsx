import React, { useState, useEffect } from "react";

const Meme = () => {
  const [inputVal, setInputVal] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [meme, setMeme] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMeme(data.data.memes));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputVal((i) => ({
      ...i,
      [name]: value,
    }));
  }
  function handleClick() {
    const randomNumber = Math.floor(Math.random() * meme.length);
    setInputVal((i) => ({
      ...i,
      randomImage: meme[randomNumber].url,
    }));
  }

  return (
    <div className="meme">
      <div className="inputs">
        <div className="input1">
          <label htmlFor="topText">Top Text</label>
          <input
            id="topText"
            type="text"
            name="topText"
            value={inputVal.topText}
            onChange={handleChange}
          />
        </div>

        <div className="input1">
          <label htmlFor="bottomText">Bottom Text</label>
          <input
            id="bottomText"
            type="text"
            name="bottomText"
            value={inputVal.bottomText}
            onChange={handleChange}
          />
        </div>
      </div>

      <button onClick={handleClick}>Get a new Meme Image</button>

      <div className="img-para">
        <img src={inputVal.randomImage} alt="meme-image" />
        <p className="meme-text top">{(inputVal.topText).toUpperCase()}</p>
        <p className="meme-text bottom">{(inputVal.bottomText).toUpperCase()}</p>
      </div>
    </div>
  );
};

export default Meme;
