// import dependencies
import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { sampleArtists, client_id, client_secret, apiUrl } from "../sharedVariables";

// sampleartist component
const SampleArtist = () => {
  let xappToken;
  let [artist, setArtist] = useState({
    _links: {
      permalink: {
        href: "",
      },
      thumbnail: {
        href: "",
      },
    },
    biography: "",
  });

  //choose random artist
  useEffect(() => {
    let x = Math.floor(Math.random() * sampleArtists.length);
    search(sampleArtists[x]);
  },[]); // need empty array to prevent infinite searches

  //search for artist
  const search = async (input) => {
    //get auth-token
    const res = await axios.post(apiUrl, {
      client_id,
      client_secret,
    });
    xappToken = res.data.token;
    //search artist
    const res2 = await axios.get(
      `https://api.artsy.net/api/search?q=${input}`,
      {
        headers: {
          "X-XAPP-Token": xappToken,
        },
      }
    );
    console.log("results", res2.data._embedded.results[0]);
    // console.log(res2.data._embedded.results[0].thumbnail);
    // return res2.data._embedded.results[0];
    setArtist(res2.data._embedded.results[0]);
  };

  return (
    <Container className="mt-3" style={{ textAlign: "center" }}>
      <h4>{artist.title}</h4>
      <br />
      <a
        href={artist["_links"].permalink.href}
        target="_blank"
        rel="noreferrer"
      >
        <img alt='thumbnail' src={artist["_links"].thumbnail.href}></img>
      </a>
    </Container>
  );
};

export default SampleArtist;