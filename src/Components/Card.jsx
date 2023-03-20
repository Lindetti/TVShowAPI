//https://api.tvmaze.com/singlesearch/shows?q=girls
import "./Card.css";
import { useState, useEffect } from "react";

const Card = () => {
  const [tvShow, setTvShow] = useState({
    name: "",
    image: "",
    language: "",
    runtime: "",
    premiered: "",
    ended: "",
    status: "",
    rating: "",
    genres: "",
    webchannel: "",
    summary: "",
    url: "",
  });
  const [url, setUrl] = useState(
    "https://api.tvmaze.com/singlesearch/shows?q=locke"
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTvShow({
          ...tvShow,
          name: data.name,
          image: data.image.medium,
          language: data.language,
          runtime: data.runtime,
          premiered: data.premiered,
          ended: data.ended,
          status: data.status,
          rating: data.rating.average,
          genres: [...data.genres].join(", "),
          summary: data.summary,
          webchannel: data.webChannel,
          url: data.url,
        });
      });

    document.title = "Tv-Series App";
  }, [url]);

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };

  const searchClick = (event) => {
    event.preventDefault();
    setUrl(`https://api.tvmaze.com/singlesearch/shows?q=${search}`);
    setSearch("");
  };

  return (
    <div className="card-wrapper">
      <form onSubmit={searchClick}>
        <input
          className="input-field"
          type="text"
          placeholder="search series..."
          value={search}
          onChange={handleOnChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="card">
        <h1 className="name"> {tvShow.name}</h1>
        <div className="imgAndText">
          <div className="imgDiv">
            <img src={tvShow.image} alt="image" />
          </div>
          <div className="genres1">
            {tvShow.genres}
            <figcaption>
              {tvShow.webchannel === null ? "" : `${tvShow.webchannel.name}`}
            </figcaption>
          </div>
          <div className="list">
            <ul>
              <li>
                Rating:{" "}
                <span className="list-color">
                  {tvShow.rating === null ? "Not found" : `${tvShow.rating}/10`}
                </span>
              </li>
              <li>
                {" "}
                Language: <span className="list-color">{tvShow.language}</span>
              </li>
              <li>
                Runtime:{" "}
                <span className="list-color">
                  {" "}
                  {tvShow.runtime === null
                    ? "Not found"
                    : `${tvShow.runtime} min`}{" "}
                </span>
              </li>
              <li>
                WebChannel:{" "}
                <span className="list-color">
                  {" "}
                  {tvShow.webchannel === null
                    ? "Not found"
                    : `${tvShow.webchannel.name}`}
                </span>{" "}
              </li>

              <li>
                Premiered:{" "}
                <span className="list-color">{tvShow.premiered}</span>
              </li>
              <li>
                Ended:{" "}
                <span className="list-color">
                  {" "}
                  {tvShow.ended === null ? "Not found" : `${tvShow.ended}`}
                </span>
              </li>
              <li>
                {" "}
                Status: <span className="list-color">{tvShow.status}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="genres2">
          {tvShow.genres}
          <figcaption>
            {tvShow.webchannel === null ? "" : `${tvShow.webchannel.name}`}
          </figcaption>
        </div>
        <div className="summary">
          <h2>
            {" "}
            <span className="list-color">Summary</span>
          </h2>
          <p>{tvShow.summary}</p>
        </div>
        <div className="readMoreDiv">
          <a href={tvShow.url} target="_blank">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
