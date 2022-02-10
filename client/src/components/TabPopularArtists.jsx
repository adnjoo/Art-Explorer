import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { backendURL } from '../sharedVariables';

export default function TabPopularArtists() {
  const [popular, setPopular] = useState([]);

  const getPopularArtists = () => {
    const headers = {
      // set headers
      'Content-Type': 'application/json',
      token: localStorage.token,
    };
    axios
      .get(`${backendURL}api/getpopularartists`, {
        headers,
      })
      .then((res) => {
        console.log(res.data.rows);
        setPopular(res.data.rows);
      });
  };

  useEffect(() => {
    getPopularArtists();
  }, []);

  const mapPopular = () => popular.map((x) => (
    <div>
      {x.name}
      :&nbsp;
      {x.count}
      {' '}
      Followers
    </div>
  ));

  return (
    <Container className="text-center my-5">
      <Card>
        <Card.Title>Popular Artists</Card.Title>
        <Card.Body>
          <Card.Text>{mapPopular()}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

// popular artists
// select name,count(*) from artists group by name order by count(*) desc;
