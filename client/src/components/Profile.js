import { useState, useEffect } from "react";
import { backendURL } from "../sharedVariables";
import axios from "axios";
import { Container } from "react-bootstrap";

// profile function
const Profile = ({ updated,setprofileArtistName }) => {
  //get artists
  const GetArtists = () => {
    let [artists, setArtists] = useState([]);

    //if new artist added, get new favorites from db 
    useEffect(() => {
      getFav();
    }, [updated]);

    //send from profile to app to searchartist
    const dosomething = (x) => {
      setprofileArtistName(x)
    }

    const mapArtists = () => {
      return artists.map((x) => {
        return (
          <div>
            <button onClick={()=>dosomething(x.name)} class='btn btn-link' style={{ display: "inline-block" }}>{x.name}</button>
            <button class='btn btn-outline-dark'>x</button> 
          </div>
        );
      });
    };
    
    const getFav = () => {
      //set headers
      const headers = {
        "Content-Type": "application/json",
        token: localStorage.token,
      };
      // console.log("test");
      //make axios call
      axios
        .get(`${backendURL}api/getartists`, {
          headers: headers,
        })
        .then((res) => {
          setArtists(res.data.rows);
        });
    };
    return (
      <div style={{minHeight:'200px'}}>
        My favorite artists:
        {mapArtists()}
      </div>
    );
  };

  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch(`${backendURL}dashboard/`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();

      console.log(parseRes);
      //set name
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  });
  return (
    <Container>
      Welcome, {name}!
      <br />
      <br />
      <GetArtists />
      <div style={{ display: "none" }}>{updated}</div>
    </Container>
  );
};

export default Profile;
