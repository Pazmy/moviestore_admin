import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { admin, SERVER_URL } from "../../helper/axios";
import { formatter } from "../../helper/formatter";
import Loader from "../Loader/Loader";

const Container = styled.div`
  padding: 20px 35px;
`;
const Table = styled.table`
  &,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th {
    text-align: left;
    padding: 8px 8px;
  }
  td {
    padding: 8px 8px;
  }
`;

const DetailMovie = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    admin
      .get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  }, [id]);
  function handlerDelete(actorId) {
    admin
      .delete(`/actors/movieactor/delete/${actorId}?MovieId=${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Loader style={{ width: "100px", height: "100px" }} />
      </div>
    );
  } else {
    return (
      <Container>
        <h1 className="bold text-4xl mb-2">{movie.title}</h1>
        <div className="flex w-full">
          <div className="w-80 mb-2">
            <div>
              <span className="mr-2">Director:</span>
              <span>{movie.director}</span>
            </div>

            <div>
              <span className="mr-2">Studio:</span>
              <span>{movie.studio}</span>
            </div>
            <div>
              <span className="mr-2">Duration:</span>
              <span>{movie.duration}</span>
            </div>
            <div>
              <span className="mr-2">Release:</span>
              <span>{movie.release}</span>
            </div>
            <div>
              <span className="mr-2">Rate:</span>
              <span>{movie.rate}</span>
            </div>
            <div>
              <span className="mr-2">Views:</span>
              <span>{movie.views}</span>
            </div>
            <div>
              <span className="mr-2">Status:</span>
              <span>{movie.status}</span>
            </div>
            <div>
              <span className="mr-2">Genres:</span>
              <span>{movie.genres?.join(", ")}</span>
            </div>
            <div>
              <span className="mr-2">Price:</span>
              <span>{formatter.format(movie.price)}</span>
            </div>
            <div>
              <span className="mr-2">Overview:</span>
              <span>{movie.overview}</span>
            </div>
          </div>
          <div className="ml-8">
            <img
              className="inline-block"
              src={
                movie?.poster?.includes("http")
                  ? movie.poster
                  : `${SERVER_URL}/${movie.poster}`
              }
              alt={movie.title}
              width="200px"
            />
          </div>
        </div>

        <h2 className="bold text-2xl mb-2">Actors</h2>
        <Link
          to="actors/add"
          className="bg-blue-500 px-2 py-1 inline-block my-2 text-white rounded"
        >
          Add Actor
        </Link>
        <Table className="table-auto">
          <thead>
            <tr>
              <th className="">No</th>
              <th className="w-1/4">Name</th>
              <th className="w-1/4">Image</th>
              <th className="">Character</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movie.actors?.map((actor, i) => {
              const image = actor?.image.includes("http")
                ? actor.image
                : `${SERVER_URL}/${actor.image}`;

              return (
                <tr key={i}>
                  <td>{(i += 1)}</td>
                  <td>{actor.name}</td>
                  <td>
                    <img
                      className="inline-block"
                      src={image}
                      alt={actor.name}
                      width="80px"
                    />
                  </td>
                  <td>{actor.character}</td>
                  <td>
                    <div className="flex justify-center items-center">
                      <button
                        className="bg-red-700 text-white mx-2 px-4 py-2 rounded"
                        onClick={() => handlerDelete(actor.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
};

export default DetailMovie;
