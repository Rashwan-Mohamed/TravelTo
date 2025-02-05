import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      fetchData();
    }
  };
  const fetchData = async () => {
    let auth = btoa(`${process.env.REACT_APP_ACCESS_KEY}`);
    try {
      let url = `https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${search}`;
      const response = await fetch(url, {
        method: "GET",
        hostname: "api.roadgoat.com",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error, "errorrrrrrrrrrrr");
      setError(true);
    }
  };

  return (
    <>
      <header>
        <img loading="lazy" src="images/alex-vIFNMyT6iFg-unsplash.jpg" alt="" />{" "}
        <img
          loading="lazy"
          src="images/roberto-nickson-_em5tYXuOQc-unsplash.jpg"
          alt=""
        />{" "}
        <img
          loading="lazy"
          src="images/fadi-al-shami-FgktBlof13s-unsplash.jpg"
          alt=""
        />
        <img
          loading="lazy"
          src="images/sasha-pleshco-ESEaSiPrB9A-unsplash.jpg"
          alt=""
        />
        <h1 className="header-title">
          We Live In a World That Worth Your Discovery
        </h1>
      </header>
      <main>
        <h1>There is a tons of good places that are waiting for you!</h1>
        <form onSubmit={handleSubmit} action="">
          <label htmlFor="destination">Enter your destination</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g London..."
            type="text"
            name="destination"
            id="destination"
          />
          <button type="submit">Search</button>
          {data && !error && (
            <ul className="primary-results">
              {data.data.map((item) => {
                const {
                  attributes: { name },
                  id,
                } = item;
                return (
                  <li onClick={() => navigate(`../${id}`)} key={id}>
                    {name}
                  </li>
                );
              })}
            </ul>
          )}
        </form>
        {error === true && (
          <p className="errorLater">
            an error has occured, please try again later
          </p>
        )}
        <footer>
          <p>made with &#129293; by Rashwan Mohamed.</p>
        </footer>
      </main>
    </>
  );
};

export default Home;
