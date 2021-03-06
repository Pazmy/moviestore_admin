import React, { useEffect, useState } from "react";
import { admin } from "../../helper/axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  padding: 20px 26px;
`;
const Content = styled.div`
  background-color: #d5d9e1;
  padding: 24px;
  margin-bottom: 18px;
  height: auto;
`;
const AddMovie = () => {
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
  const navigate = useNavigate();
  useEffect(() => {
    admin.get("/genres/").then((res) => {
      const data = res.data.results;
      // setCheckedBox(new Array(data.length).fill(false))
      setGenres(data);
    });
  }, []);
  function handlerChecked(e, position) {
    console.log(e.target.checked);

    const updated = genres.map((item, index) => {
      if (position === index) {
        item.checked = e.target.checked;
        return item;
      } else {
        return item;
      }
    });
    setGenres(updated);
    console.log(genres);
  }
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
      <Content className="rounded px-4 py-8">
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
              Overview
            </label>
            <textarea
              type="text"
              name="overview"
              className=" mb-2 block w-96 h-32"
              value={overview}
              onChange={(e) => handlerChange(e, "overview")}
            />
            <label htmlFor="" className="block my-2">
              Director
            </label>
            <input
              type="text"
              name="director"
              className="py-2 px-2 rounded w-80"
              value={director}
              onChange={(e) => handlerChange(e, "director")}
            />
            <label htmlFor="" className="block my-2">
              Studio
            </label>
            <input
              type="text"
              name="studio"
              className="py-2 px-2 rounded w-80"
              value={studio}
              onChange={(e) => handlerChange(e, "studio")}
            />
            <label htmlFor="" className="block my-2">
              Release
            </label>
            <input
              type="text"
              name="release"
              className="py-2 px-2 rounded w-80"
              value={release}
              onChange={(e) => handlerChange(e, "release")}
            />
            <label htmlFor="" className="block my-2">
              Rate
            </label>
            <input
              type="text"
              name="rate"
              className="py-2 px-2 rounded w-80"
              value={rate}
              onChange={(e) => handlerChange(e, "rate")}
            />
            <label htmlFor="" className="block my-2">
              Trailer
            </label>
            <input
              type="text"
              name="trailer"
              className="py-2 px-2 rounded w-80"
              value={trailer}
              onChange={(e) => handlerChange(e, "trailer")}
            />
            <label htmlFor="" className="block my-2">
              Views
            </label>
            <input
              type="text"
              name="views"
              className="py-2 px-2 rounded w-80"
              value={views}
              onChange={(e) => handlerChange(e, "views")}
            />
            <label htmlFor="" className="block my-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              className="py-2 px-2 rounded w-80"
              value={price}
              onChange={(e) => handlerChange(e, "price")}
            />
            <label htmlFor="" className="block my-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              className="py-2 px-2 rounded w-80"
              value={duration}
              onChange={(e) => handlerChange(e, "duration")}
            />
            <label htmlFor="" className="block my-2">
              Status
            </label>
            <input
              type="text"
              name="status"
              className="py-2 px-2 rounded w-80"
              value={status}
              onChange={(e) => handlerChange(e, "status")}
            />
            <div>
              <p className="my-2">Genres</p>
              <div className="flex flex-wrap gap-2">
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
              </div>
            </div>
            <div>
              <p className="my-2">Upload image</p>
              <input
                type="file"
                multiple
                className="block my-2"
                name="image"
                onChange={(e) => handlerChange(e, "image")}
              />
            </div>
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

export default AddMovie;
