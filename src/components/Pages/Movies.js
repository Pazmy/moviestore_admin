import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { admin } from "../../helper/axios";
import { formatter } from "../../helper/formatter";

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

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    admin.get("/movies/").then((res) => {
      setMovies(res.data.results);
    });
  }, []);
  function handlerDelete(id) {
    admin
      .delete(`/movies/delete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <h1 className="bold text-4xl">List Movies</h1>
      <Link
        to="/movies/add"
        className="bg-blue-500 px-2 py-1 inline-block my-2 text-white rounded"
      >
        Add Movies
      </Link>
      <Table className="table-auto">
        <thead>
          <tr>
            <th>No</th>
            <th className="w-1/2">Title</th>
            <th className="w-1/4">Director</th>
            <th className="w-1/2">Studio</th>
            <th className="w-1/2">Duration</th>
            <th className="w-1/2">Release</th>
            <th className="w-1/2">Rate</th>
            <th className="w-1/2">Price</th>
            <th className="w-1/2">Status</th>
            <th className="w-1/2">Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, i) => {
            return (
              <tr key={i}>
                <td>{(i += 1)}</td>
                <td>
                  <Link
                    className="hover:underline"
                    to={`/movie/detail/${movie.id}`}
                  >
                    {movie.title}
                  </Link>
                </td>
                <td>{movie.director}</td>
                <td>{movie.studio}</td>
                <td>{movie.duration}</td>

                <td>{movie.release}</td>
                <td>{movie.rate}</td>
                <td>{formatter.format(movie.price)}</td>
                <td>{movie.status}</td>

                <td>
                  <div className="flex justify-center items-center">
                    <Link
                      to={`/movies/edit/${movie.id}`}
                      className="bg-blue-700 text-white mx-2 px-4 py-2 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-700 text-white mx-2 px-4 py-2 rounded"
                      onClick={() => handlerDelete(movie.id)}
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
};

export default Movies;
