import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { admin } from "../../helper/axios";

const Container = styled.div`
  padding: 0 20px;
`;
const Content = styled.div`
  background-color: #d5d9e1;
  padding: 24px;
  margin-bottom: 18px;
  height: auto;
`;
const EditMovie = () => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [studio, setStudio] = useState("");
  const [duration, setDuration] = useState("");
  const [release, setRelease] = useState("");
  const [rate, setRate] = useState("");
  const [trailer, setTrailer] = useState("");
  const [views, setViews] = useState("");
  const [price, setPrice] = useState(0);
  const [overview, setOverview] = useState("");
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState();
  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    admin.get(`/movies/${id}`).then((res) => {
      const data = res.data.result;
      setTitle(data.title);
      setDirector(data.director);
      setStudio(data.studio);
      setDuration(data.duration);
      setRelease(data.release);
      setRate(data.rate);
      setTrailer(data.trailer);
      setViews(data.views);
      setPrice(data.price);
      setOverview(data.overview);
      setStatus(data.status);
    });
  }, [id]);
  function handlerChange(e, fieldName) {
    switch (fieldName) {
      case "title":
        setTitle(e.target.value);
        break;
      case "director":
        setDirector(e.target.value);
        break;
      case "studio":
        setStudio(e.target.value);
        break;
      case "duration":
        setDuration(e.target.value);
        break;
      case "release":
        setRelease(e.target.value);
        break;
      case "rate":
        setRate(e.target.value);
        break;
      case "trailer":
        setTrailer(e.target.value);
        break;
      case "views":
        setViews(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "overview":
        setOverview(e.target.value);
        break;
      case "status":
        setStatus(e.target.value);
        break;
      case "image":
        setFiles(e.target.files);
        break;
      default:
    }
  }
  function submitHandler(e) {
    e.preventDefault();
    const data = new FormData();
    for (let file of files) {
      data.append("image", file);
    }
    data.append("title", title);
    data.append("director", director);
    data.append("studio", studio);
    data.append("duration", duration);
    data.append("rate", rate);
    data.append("trailer", trailer);
    data.append("release", release);
    data.append("views", views);
    data.append("price", price);
    data.append("overview", overview);
    data.append("status", status);
    genres.forEach((genre) => {
      if (genre.checked && genre.checked === true) {
        data.append("genresId", genre.id);
      }
    });
    console.log(data.getAll("genresId"));
    // console.log(data.get("name"));
    admin
      .post("/movies/add", data)
      .then((res) => {
        console.log(res.data);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return (
    <Container>
      <Content>
        <form className="flex">
          <div className="mr-4">
            <label htmlFor="name" className="block my-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="py-2 px-2 rounded w-80"
              value={title}
              onChange={(e) => handlerChange(e, "title")}
            />
            <label htmlFor="" className="block my-2">
              overview
            </label>
            <textarea
              type="text"
              name="overview"
              className="p-2 mb-2 block w-96 h-32"
              value={overview}
              onChange={(e) => handlerChange(e, "overview")}
            />
            <label htmlFor="" className="block my-2">
              director
            </label>
            <input
              type="text"
              name="director"
              className="py-2 px-2 rounded w-80"
              value={director}
              onChange={(e) => handlerChange(e, "director")}
            />
            <label htmlFor="" className="block my-2">
              studio
            </label>
            <input
              type="text"
              name="studio"
              className="py-2 px-2 rounded w-80"
              value={studio}
              onChange={(e) => handlerChange(e, "studio")}
            />
            <label htmlFor="" className="block my-2">
              release
            </label>
            <input
              type="text"
              name="release"
              className="py-2 px-2 rounded w-80"
              value={release}
              onChange={(e) => handlerChange(e, "release")}
            />
            <label htmlFor="" className="block my-2">
              rate
            </label>
            <input
              type="text"
              name="rate"
              className="py-2 px-2 rounded w-80"
              value={rate}
              onChange={(e) => handlerChange(e, "rate")}
            />
            <label htmlFor="" className="block my-2">
              trailer
            </label>
            <input
              type="text"
              name="trailer"
              className="py-2 px-2 rounded w-80"
              value={trailer}
              onChange={(e) => handlerChange(e, "trailer")}
            />
            <label htmlFor="" className="block my-2">
              views
            </label>
            <input
              type="text"
              name="views"
              className="py-2 px-2 rounded w-80"
              value={views}
              onChange={(e) => handlerChange(e, "views")}
            />
            <label htmlFor="" className="block my-2">
              price
            </label>
            <input
              type="text"
              name="price"
              className="py-2 px-2 rounded w-80"
              value={price}
              onChange={(e) => handlerChange(e, "price")}
            />
            <label htmlFor="" className="block my-2">
              duration
            </label>
            <input
              type="text"
              name="duration"
              className="py-2 px-2 rounded w-80"
              value={duration}
              onChange={(e) => handlerChange(e, "duration")}
            />
            <label htmlFor="" className="block my-2">
              status
            </label>
            <input
              type="text"
              name="status"
              className="py-2 px-2 rounded w-80"
              value={status}
              onChange={(e) => handlerChange(e, "status")}
            />
            {/* <div>
              {genres.map((genre, i) => {
                return (
                  <label htmlFor={genre.name} className="block" key={i}>
                    <input
                      type="checkbox"
                      className="mr-1"
                      id={genre.name}
                      name={genre.name}
                      value={genre.id}
                      onChange={(e) => handlerChecked(e, i)}
                    />
                    {genre.name}
                  </label>
                );
              })}
            </div> */}

            <input
              type="file"
              multiple
              className="block my-2"
              name="image"
              onChange={(e) => handlerChange(e, "image")}
            />
            <input
              type="submit"
              className="p-2 bg-blue-400 cursor-pointer rounded"
              onClick={submitHandler}
            />
          </div>
        </form>
      </Content>
    </Container>
  );
};

export default EditMovie;
